/*
  Uiverse.io scraper: fetches N component pages, extracts HTML & CSS, writes to public/uiverse_components.json
  Requires: cheerio (and node-fetch for Node <18 or if global fetch unavailable)
  Usage:
    - npm run scrape:uiverse         # defaults to 5 components
    - node scripts/scrape-uiverse.js 3  # scrape 3 components
*/

const fs = require('fs');
const path = require('path');
const LIMIT = Math.max(1, Math.min(10, parseInt(process.argv[2] || '5', 10)));
const SEEDS_ONLY = process.argv.includes('--seeds-only') || process.env.UIVERSE_SEEDS_ONLY === '1';

async function ensureCheerio() {
  try {
    return require('cheerio');
  } catch (e) {
    console.error('\nMissing dependency: cheerio.\nInstall with: npm i cheerio\n');
    process.exit(1);
  }
}

async function getFetch() {
  if (typeof fetch !== 'undefined') return fetch;
  try {
    const mod = await import('node-fetch');
    return mod.default;
  } catch (e) {
    console.error('No global fetch and node-fetch not installed.');
    process.exit(1);
  }
}

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

function absUrl(href) {
  if (!href) return null;
  if (href.startsWith('http')) return href;
  if (href.startsWith('/')) return 'https://uiverse.io' + href;
  return 'https://uiverse.io/' + href;
}

function extractIdFromUrl(url) {
  try {
    const u = new URL(url);
    const [author, slug] = u.pathname.replace(/^\/+|\/+$/g, '').split('/');
    return { author: author || 'unknown', slug: slug || 'component', id: `${author}-${slug}` };
  } catch {
    return { author: 'unknown', slug: 'component', id: 'unknown-component' };
  }
}

// Heuristic detection helpers
const looksLikeHTML = (s = '') => /<[^>]+>/.test(s);
const looksLikeCSS = (s = '') => /[{][^}]*[}]/.test(s) && /;/.test(s);
const looksLikeHTMLStrict = (s = '') => looksLikeHTML(s) && !looksLikeCSS(s);

function deepFindStrings(obj, results = []) {
  if (!obj) return results;
  if (typeof obj === 'string') results.push(obj);
  else if (Array.isArray(obj)) obj.forEach(v => deepFindStrings(v, results));
  else if (typeof obj === 'object') Object.values(obj).forEach(v => deepFindStrings(v, results));
  return results;
}

// Find objects that look like code containers, e.g. { html: "...", css: "..." }
function deepFindCodePairs(obj, results = []) {
  if (!obj) return results;
  if (Array.isArray(obj)) {
    obj.forEach(v => deepFindCodePairs(v, results));
  } else if (typeof obj === 'object') {
    const html = typeof obj.html === 'string' ? obj.html : null;
    const css = typeof obj.css === 'string' ? obj.css : null;
    if ((html && html.length > 0) || (css && css.length > 0)) {
      results.push({ html, css });
    }
    Object.values(obj).forEach(v => deepFindCodePairs(v, results));
  }
  return results;
}

function bestMatch(strings, predicate) {
  const candidates = strings.filter(s => predicate(s));
  // Prefer longer strings assuming they contain the full code
  candidates.sort((a, b) => (b?.length || 0) - (a?.length || 0));
  return candidates[0] || '';
}

// Minimal HTML derivation from CSS when explicit HTML sample isn't present
function deriveHtmlFromCss(css = '') {
  if (!css) return '';
  // Find first class selector
  const classMatch = css.match(/\.([A-Za-z0-9_-]+)/);
  const className = classMatch ? classMatch[1] : '';
  // Heuristics for element type
  const isButton = /\bbutton\b|:hover|cursor\s*:\s*pointer/i.test(css);
  const tag = isButton ? 'button' : 'div';
  const label = isButton ? 'Button' : '';
  const cls = className ? ` class="${className}"` : '';
  return `<${tag}${cls}>${label}</${tag}>`;
}

async function discoverComponentUrls(fetchFn, $, limit = 5) {
  const anchors = Array.from($('a[href]'))
    .map(a => a.attribs.href)
    .filter(Boolean)
    // pick URLs like /author/slug (two path segments) and exclude non-component sections
    .filter(href => {
      try {
        const full = absUrl(href);
        const u = new URL(full);
        const segs = u.pathname.replace(/^\/+|\/+$/g, '').split('/');
        if (segs.length !== 2) return false;
        const first = segs[0].toLowerCase();
        if (['profile', 'collection', 'collections', 'tag', 'tags', 'search'].includes(first)) return false;
        const slug = segs[1];
        // prefer component slugs that end with -digits (common on Uiverse)
        return /-[0-9]+$/i.test(slug);
      } catch {
        return false;
      }
    })
    .map(absUrl);

  const unique = Array.from(new Set(anchors));
  return unique.slice(0, limit);
}

async function scrapeComponentPage(fetchFn, cheerio, url) {
  const res = await fetchFn(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FlowStacksScraper/1.0)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const { author, id } = extractIdFromUrl(url);

  // Try grab __NEXT_DATA__ for rich props
  let nextData = null;
  const nextScript = $('#__NEXT_DATA__').html();
  if (nextScript) {
    try { nextData = JSON.parse(nextScript); } catch {}
  }

  // Collect candidate strings to choose HTML/CSS from
  const bucket = [];
  if (nextData) deepFindStrings(nextData, bucket);
  // Prefer explicit html/css pairs if present in __NEXT_DATA__
  let pairHtml = '';
  let pairCss = '';
  if (nextData) {
    const pairs = deepFindCodePairs(nextData, []);
    if (pairs.length) {
      // Choose pair with the longest combined length
      pairs.sort((a, b) => ((b.html?.length||0)+(b.css?.length||0)) - ((a.html?.length||0)+(a.css?.length||0)));
      pairHtml = pairs[0].html || '';
      pairCss = pairs[0].css || '';
      if (pairHtml) bucket.push(pairHtml);
      if (pairCss) bucket.push(pairCss);
    }
  }
  // Also include visible code blocks on page
  $('code, pre').each((_, el) => {
    const t = $(el).text();
    if (t && t.length > 0) bucket.push(t);
  });
  // Include any inline <style> contents as CSS candidates
  $('style').each((_, el) => {
    const t = $(el).html() || $(el).text();
    if (t && t.length > 0) bucket.push(t);
  });

  let htmlCode = pairHtml || bestMatch(bucket, looksLikeHTMLStrict);
  let cssCode = pairCss || bestMatch(bucket, looksLikeCSS);

  // If HTML ended up being CSS by mistake, swap appropriately
  if (!cssCode && looksLikeCSS(htmlCode)) {
    cssCode = htmlCode;
    htmlCode = '';
  }

  // If still missing HTML but we have CSS, derive a minimal HTML snippet
  if (!htmlCode && cssCode) {
    htmlCode = deriveHtmlFromCss(cssCode);
  }

  return {
    url,
    id,
    title: title || undefined,
    author: author || undefined,
    category: null,
    tags: [],
    html: htmlCode || '',
    css: cssCode || '',
  };
}

async function main() {
  const cheerio = await ensureCheerio();
  const fetchFn = await getFetch();

  // Use the elements listing for fresher, component-specific links
  const indexUrl = 'https://uiverse.io/elements?orderBy=recent';
  console.log('Fetching index:', indexUrl);
  let urls = [];
  try {
    const res = await fetchFn(indexUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FlowStacksScraper/1.0)' } });
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      urls = await discoverComponentUrls(fetchFn, $, 20);
    } else {
      console.warn('Index fetch HTTP', res.status);
    }
  } catch (e) {
    console.warn('Index fetch failed:', e.message);
  }

  // Reliable fallback seeds (add plenty; we'll slice to LIMIT)
  const fallbackSeeds = [
    // Fresh links from homepage "Get code" section
    'https://uiverse.io/alexruix/tame-fly-42',
    'https://uiverse.io/catraco/fluffy-quail-74',
    'https://uiverse.io/gharsh11032000/loud-chicken-53',
    'https://uiverse.io/Codecite/angry-bullfrog-58',
    'https://uiverse.io/satyamchaudharydev/rude-wolverine-24',
    'https://uiverse.io/levxyca/tidy-mayfly-7',
    'https://uiverse.io/cssbuttons-io/wonderful-baboon-62',
    'https://uiverse.io/elijahgummer/bright-chicken-11',
    'https://uiverse.io/Galahhad/breezy-wolverine-23',
    'https://uiverse.io/milegelu/tough-cobra-42',
    'https://uiverse.io/neerajbaniwal/hungry-mule-59',
    'https://uiverse.io/vinodjangid07/chilly-newt-81',
    'https://uiverse.io/kennyotsu/fresh-lizard-20',
    'https://uiverse.io/njesenberger/rude-stingray-22',
    'https://uiverse.io/adamgiebl/wise-moth-35',
    'https://uiverse.io/vinodjangid07/good-donkey-28',
    'https://uiverse.io/seyed-mohsen-mousavi/chatty-frog-63',
    'https://uiverse.io/cbolson/calm-wasp-75',
    'https://uiverse.io/Na3ar-17/evil-dragon-24',
    'https://uiverse.io/Nawsome/heavy-cheetah-95',
    'https://uiverse.io/Spacious74/helpless-tiger-55',
    'https://uiverse.io/TaniaDou/witty-rabbit-59',
    'https://uiverse.io/Darlley/jolly-yak-41',
    'https://uiverse.io/vinodjangid07/moody-rabbit-65',
    'https://uiverse.io/jeremyssocial/ugly-bullfrog-62',
    'https://uiverse.io/iZOXVL/wise-goat-75',
    'https://uiverse.io/Shoh2008/bad-emu-73',
    'https://uiverse.io/elijahgummer/light-jellyfish-4',
    'https://uiverse.io/Yaya12085/bright-dolphin-91',
    'https://uiverse.io/Cksunandh/purple-moose-3',
    // Keep the known working earlier seed
    'https://uiverse.io/hakemdamer222/funny-ape-73',
  ];

  let selected;
  if (SEEDS_ONLY) {
    selected = fallbackSeeds;
  } else {
    const combined = Array.from(new Set([...fallbackSeeds, ...urls]));
    selected = combined;
  }
  // Final filter to ensure component-like URLs and exclude profiles/collections/etc.
  urls = selected.filter(u => {
    try {
      const pu = new URL(u);
      const segs = pu.pathname.replace(/^\/+|\/+$/g, '').split('/');
      if (segs.length !== 2) return false;
      const first = segs[0].toLowerCase();
      if (['profile', 'collection', 'collections', 'tag', 'tags', 'search'].includes(first)) return false;
      return /-[0-9]+$/i.test(segs[1]);
    } catch { return false; }
  }).slice(0, LIMIT);
  console.log(`Selected ${urls.length} candidate component URLs (limit=${LIMIT}):`, urls);

  const items = [];
  for (const url of urls) {
    try {
      console.log('Scraping', url);
      const item = await scrapeComponentPage(fetchFn, cheerio, url);
      items.push(item);
      await sleep(400); // be polite
    } catch (e) {
      console.warn('Failed to scrape', url, e.message);
    }
  }

  const out = {
    scrapedAt: new Date().toISOString(),
    count: items.length,
    requested: LIMIT,
    attempted: urls.length,
    items,
  };

  const outPath = path.join(__dirname, '..', 'public', 'uiverse_components.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`Wrote ${items.length} components to`, outPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
