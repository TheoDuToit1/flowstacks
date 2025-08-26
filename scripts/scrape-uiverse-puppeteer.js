/*
  Uiverse.io Puppeteer scraper: opens component pages, clicks HTML/CSS tabs, extracts code
  Usage:
    - node scripts/scrape-uiverse-puppeteer.js 3         # scrape 3 items
    - node scripts/scrape-uiverse-puppeteer.js 5 --seeds-only  # use fallback seeds only
*/

const fs = require('fs');
const path = require('path');

const LIMIT = Math.max(1, Math.min(10, parseInt(process.argv[2] || '5', 10)));
const SEEDS_ONLY = process.argv.includes('--seeds-only') || process.env.UIVERSE_SEEDS_ONLY === '1';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function absUrl(href) {
  if (!href) return null;
  if (href.startsWith('http')) return href;
  if (href.startsWith('/')) return 'https://uiverse.io' + href;
  return 'https://uiverse.io/' + href;
}

// Save debugging artifacts for failures
async function saveFailureArtifacts(page, id) {
  try {
    const debugDir = path.join(__dirname, '..', 'public', 'debug');
    fs.mkdirSync(debugDir, { recursive: true });
    const htmlPath = path.join(debugDir, `${id}.html`);
    const pngPath = path.join(debugDir, `${id}.png`);
    const content = await page.content();
    fs.writeFileSync(htmlPath, content, 'utf-8');
    await page.screenshot({ path: pngPath, fullPage: true }).catch(() => {});
    console.warn('Saved failure artifacts to', htmlPath, 'and', pngPath);
  } catch (e) {
    console.warn('Failed to save failure artifacts:', e.message);
  }
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

const looksLikeHTML = (s = '') => /<[^>]+>/.test(s) || /&lt;[^&]*&gt;/.test(s);
const looksLikeCSS = (s = '') => /[{][^}]*[}]/.test(s) && /;/.test(s);

function deriveHtmlFromCss(css = '') {
  if (!css) return '';
  // Try to find a valid class selector that's not a decimal (e.g., ".5rem")
  // Capture class names that start with a letter or underscore.
  const classRegex = /(^|[^0-9A-Za-z_-])\.([A-Za-z_-][A-Za-z0-9_-]*)\s*\{/g;
  let className = '';
  const match = classRegex.exec(css);
  if (match && match[2]) className = match[2];

  // Heuristically decide element type
  const isButton = /(^|\W)button(\W|$)|:hover|cursor\s*:\s*pointer/i.test(css);
  const tag = isButton ? 'button' : 'div';

  // Minimal but more accurate inner structure
  const needsInnerSpan = /(^|\W)(button\s+span|\.\w[\w-]*\s+span|\bspan\b)/i.test(css);
  const inner = isButton
    ? (needsInnerSpan ? '<span>Button</span>' : 'Button')
    : '';

  const cls = className ? ` class="${className}"` : '';
  return `<${tag}${cls}>${inner}</${tag}>`;
}

// Utility to bound long-running steps
function withTimeout(promise, ms, label = 'operation') {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    timeout,
  ]);
}

async function getPuppeteer() {
  // Prefer puppeteer-extra with stealth if available
  try {
    const pextra = require('puppeteer-extra');
    try {
      const stealth = require('puppeteer-extra-plugin-stealth');
      pextra.use(stealth());
    } catch {}
    return pextra;
  } catch {}
  try {
    return require('puppeteer');
  } catch (e) {
    console.error('\nMissing dependency: puppeteer. Install with: npm i puppeteer\n');
    process.exit(1);
  }
}

async function discoverUrls(page, limit = 5) {
  await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });
  await page.goto('https://uiverse.io/elements?orderBy=recent', { waitUntil: 'domcontentloaded', timeout: 45000 });
  // Scroll a bit to ensure elements load
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 600));
  });
  const urls = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.getAttribute('href'))
      .filter(Boolean)
      .map(href => {
        if (href.startsWith('http')) return href;
        if (href.startsWith('/')) return 'https://uiverse.io' + href;
        return 'https://uiverse.io/' + href;
      })
      .filter(href => {
        try {
          const u = new URL(href);
          const segs = u.pathname.replace(/^\/+|\/+$/g, '').split('/');
          if (segs.length !== 2) return false;
          const first = segs[0].toLowerCase();
          if (['profile', 'collection', 'collections', 'tag', 'tags', 'search'].includes(first)) return false;
          const slug = segs[1];
          return /-[0-9]+$/i.test(slug);
        } catch {
          return false;
        }
      });
    return Array.from(new Set(anchors));
  });
  return urls.slice(0, limit);
}

// Fresh fallback seeds (from homepage Get code section)
const fallbackSeeds = [
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
  'https://uiverse.io/hakemdamer222/funny-ape-73',
];

async function clickTabByLabel(page, label) {
  const lower = label.toLowerCase();
  const selectors = ['button', '[role="tab"]', '[role="button"]'];
  const clicked = await page.evaluate((labelLower, selectors) => {
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    };
    const getAllDeep = (root = document) => {
      const out = [];
      const push = (el) => { out.push(el); if (el.shadowRoot) traverse(el.shadowRoot); };
      const traverse = (r) => {
        out.push(r);
        const kids = r.querySelectorAll('*');
        for (const k of kids) push(k);
      };
      traverse(root);
      return out;
    };
    const isSafeAnchor = (el) => {
      if (el.tagName !== 'A') return true;
      try {
        const href = el.getAttribute('href') || '';
        const url = new URL(href, location.href);
        if (url.hostname !== location.hostname) return false;
        const bad = ['termly', 'policy', 'privacy', 'terms'];
        return !bad.some(w => href.toLowerCase().includes(w) || (el.innerText || '').toLowerCase().includes(w));
      } catch { return false; }
    };
    // 1) Try direct text match (exact or startsWith), case-insensitive
    const all = getAllDeep(document);
    for (const sel of selectors) {
      const els = all.filter(el => el.matches && el.matches(sel));
      for (const el of els) {
        const t = (el.innerText || el.textContent || '').trim().toLowerCase();
        if (t.includes('code of conduct')) continue;
        if (!isVisible(el) || !isSafeAnchor(el)) continue;
        if (t === labelLower || t.startsWith(labelLower)) {
          el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
          return true;
        }
      }
    }
    // 2) Try attributes (guard for non-Element nodes like Document/ShadowRoot)
    for (const el of all) {
      if (!el || typeof el.getAttribute !== 'function') continue;
      if (!isVisible(el)) continue;
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      const title = (el.getAttribute('title') || '').toLowerCase();
      if (aria.includes(labelLower) || title.includes(labelLower)) {
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
        return true;
      }
    }
    return false;
  }, lower, selectors);
  if (clicked) await sleep(600);
  return clicked;
}

async function extractCode(page) {
  // Network sniffer to capture html/css embedded in JSON responses
  const collectedPairs = [];
  const onResp = async (resp) => {
    try {
      const urlStr = resp.url();
      // Only consider same-site JSON
      if (!/https?:\/\/[^/]*uiverse\.io\//i.test(urlStr)) return;
      const ct = ((resp.headers()['content-type'] || resp.headers()['Content-Type'] || '') + '').toLowerCase();
      if (!ct.includes('application/json')) return;
      const data = await resp.json().catch(() => null);
      if (!data) return;
      // Search for html/css pairs in the JSON (Node-side, no DOM APIs)
      const decode = (str = '') =>
        String(str)
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
      const looksLikeHTML = (s = '') => /<[^>]+>/.test(s) || /&lt;[^&]*&gt;/.test(s);
      const looksLikeCSS = (s = '') => /[{][^}]*[}]/.test(s) && /;/.test(s);
      const scrapePairs = (obj, acc = []) => {
        if (!obj) return acc;
        if (Array.isArray(obj)) { for (const it of obj) scrapePairs(it, acc); return acc; }
        if (typeof obj === 'object') {
          const keys = Object.keys(obj);
          const htmlKey = keys.find(k => /(html|htmlCode|codeHtml|markup|template)/i.test(k));
          const cssKey = keys.find(k => /(css|cssCode|codeCss|style|styles|styleCode)/i.test(k));
          if (htmlKey || cssKey) {
            const h = obj[htmlKey]; const c = obj[cssKey];
            const dh = typeof h === 'string' ? decode(h) : '';
            const dc = typeof c === 'string' ? decode(c) : '';
            if ((dh && looksLikeHTML(dh)) || (dc && looksLikeCSS(dc))) acc.push({ html: dh || '', css: dc || '' });
          }
          for (const k of keys) scrapePairs(obj[k], acc);
          return acc;
        }
        return acc;
      };
      const pairs = scrapePairs(data, []);
      if (pairs.length) {
        pairs.sort((a,b)=>((b.html?.length||0)+(b.css?.length||0))-((a.html?.length||0)+(a.css?.length||0)));
        const best = pairs[0];
        if (best && (best.html || best.css)) collectedPairs.push(best);
      }
    } catch {}
  };
  page.on('response', onResp);
  try {
    // Open the code area if it's behind a button
    const opened = await clickTabByLabel(page, 'Get code')
      || await clickTabByLabel(page, 'Get Code')
      || await clickTabByLabel(page, 'Show code')
      || await clickTabByLabel(page, 'View code')
      || await clickTabByLabel(page, 'Code');
    if (opened) {
      await sleep(600);
      // If a modal/dialog opens, give it a moment
      await page.waitForFunction(() => !!document.querySelector('[role="dialog"], [aria-modal="true"], [data-state="open"]'), { timeout: 5000 }).catch(() => {});
      await page.waitForSelector('pre code, code, pre, textarea', { timeout: 8000 }).catch(() => {});
    }

    // Click HTML tab and read code
    console.log('Attempting to click HTML/Markup tab...');
    const htmlClicked = await clickTabByLabel(page, 'HTML')
      || await clickTabByLabel(page, 'Markup')
      || await clickTabByLabel(page, 'Markup (HTML)');
    if (htmlClicked) {
      console.log('HTML-like tab clicked.');
      await sleep(400);
    } else {
      console.log('HTML-like tab not found, continuing with generic selectors.');
    }
    await page.waitForSelector('pre code, code, pre, textarea, .cm-content, [contenteditable="true"], [class*="code"]', { timeout: 8000 }).catch(() => {});
    let html = await page.evaluate(() => {
      const decode = (str) => { try { const ta = document.createElement('textarea'); ta.innerHTML = str; return ta.value; } catch { return str; } };
      const getAllDeep = (root = document) => {
        const out = [];
        const push = (el) => { out.push(el); if (el.shadowRoot) traverse(el.shadowRoot); };
        const traverse = (r) => { out.push(r); const kids = r.querySelectorAll ? r.querySelectorAll('*') : []; for (const k of kids) push(k); };
        traverse(root); return out;
      };
      const gather = (root) => {
        const out = []; const nodes = getAllDeep(root);
        const sels = ['pre code','code.language-html','code[class*="language-"]','code','pre[class*="language-"]','pre','textarea','.cm-content','[contenteditable="true"]','div[class*="code"]','section[class*="code"]','[data-language*="html"]','[data-lang*="html"]','[aria-label*="html"]'];
        for (const n of nodes) {
          const matches = sels.some(sel => n.matches && n.matches(sel));
          if (!matches) continue;
          if (n.classList && n.classList.contains('cm-content')) {
            out.push(Array.from(n.querySelectorAll('.cm-line')).map(x => x.textContent || '').join('\n'));
          } else {
            const txt = (n.value ?? n.textContent ?? '').trim(); if (txt) out.push(txt);
          }
        } return out;
      };
      let texts = gather(document).filter(Boolean);
      for (const frame of Array.from(document.querySelectorAll('iframe'))) {
        try { const doc = frame.contentDocument || frame.contentWindow?.document; if (doc) texts = texts.concat(gather(doc).filter(Boolean)); } catch {}
      }
      // Post-process: decode, strip line numbers, and filter to likely HTML
      // Only strip a leading line number if it's followed by whitespace (e.g., "12  ", "12. ")
      const stripLineNums = (s) => s.split('\n').map(l => l.replace(/^\s*(?:\d+\.\s+|\d+\s+)/, '')).join('\n');
      const looksLikeHTML = (s = '') => /<[^>]+>/.test(s) || /&lt;[^&]*&gt;/.test(s);
      const isLicense = (s = '') => /permission is hereby granted|the software is provided|copyright|mit license/i.test(s);
      texts = texts.map(decode).map(stripLineNums).map(t => t.trim()).filter(Boolean);
      const htmlish = texts.filter(t => looksLikeHTML(t) && !isLicense(t));
      if (htmlish.length) {
        htmlish.sort((a,b)=>(b.length||0)-(a.length||0));
        return htmlish[0];
      }
      // Fallback: return the longest non-license text only if it contains angle brackets
      texts = texts.filter(t => !isLicense(t) && /[<>]/.test(t));
      texts.sort((a,b)=>(b.length||0)-(a.length||0));
      return texts[0] || '';
    });

    // Click CSS tab and read code
    console.log('Attempting to click CSS/Tailwind tab...');
    const cssClicked = await clickTabByLabel(page, 'CSS')
      || await clickTabByLabel(page, 'Tailwind CSS')
      || await clickTabByLabel(page, 'Tailwind')
      || await clickTabByLabel(page, 'Styles')
      || await clickTabByLabel(page, 'Style');
    if (cssClicked) {
      console.log('CSS-like tab clicked.');
      await sleep(400);
    } else {
      console.log('CSS-like tab not found, continuing with generic selectors.');
    }
    await page.waitForSelector('pre code, code, pre, textarea, .cm-content, [contenteditable="true"], [class*="code"]', { timeout: 8000 }).catch(() => {});
    let css = await page.evaluate(() => {
      const decode = (str) => { try { const ta = document.createElement('textarea'); ta.innerHTML = str; return ta.value; } catch { return str; } };
      const getAllDeep = (root = document) => {
        const out = []; const push = (el) => { out.push(el); if (el.shadowRoot) traverse(el.shadowRoot); };
        const traverse = (r) => { out.push(r); const kids = r.querySelectorAll ? r.querySelectorAll('*') : []; for (const k of kids) push(k); };
        traverse(root); return out;
      };
      const gather = (root) => {
        const out = []; const nodes = getAllDeep(root);
        const sels = ['pre code','code.language-css','code[class*="language-"]','code','pre[class*="language-"]','pre','textarea','.cm-content','[contenteditable="true"]','div[class*="code"]','section[class*="code"]','[data-language*="css"]','[data-lang*="css"]','[aria-label*="css"]'];
        for (const n of nodes) {
          const matches = sels.some(sel => n.matches && n.matches(sel));
          if (!matches) continue;
          if (n.classList && n.classList.contains('cm-content')) {
            out.push(Array.from(n.querySelectorAll('.cm-line')).map(x => x.textContent || '').join('\n'));
          } else {
            const txt = (n.value ?? n.textContent ?? '').trim(); if (txt) out.push(txt);
          }
        } return out;
      };
      let texts = gather(document).filter(Boolean);
      for (const frame of Array.from(document.querySelectorAll('iframe'))) {
        try { const doc = frame.contentDocument || frame.contentWindow?.document; if (doc) texts = texts.concat(gather(doc).filter(Boolean)); } catch {}
      }
      // Post-process: decode, strip line numbers, and filter to likely CSS
      // Only strip a leading line number if it's followed by whitespace (e.g., "12  ", "12. ")
      const stripLineNums = (s) => s.split('\n').map(l => l.replace(/^\s*(?:\d+\.\s+|\d+\s+)/, '')).join('\n');
      const looksLikeCSS = (s = '') => /[{][^}]*[}]/.test(s) && /;/.test(s);
      const cssIndicators = (s = '') => /:\s*[^;]+;/.test(s) || /@keyframes|\.(?!\d)[A-Za-z0-9_-]+\s*\{|#(?!\d)[A-Za-z0-9_-]+\s*\{|\*[^{]*\{/.test(s);
      const isLicense = (s = '') => /permission is hereby granted|the software is provided|copyright|mit license/i.test(s);
      texts = texts.map(decode).map(stripLineNums).map(t => t.trim()).filter(Boolean);
      const cssish = texts.filter(t => (looksLikeCSS(t) || cssIndicators(t)) && !isLicense(t));
      if (cssish.length) {
        cssish.sort((a,b)=>(b.length||0)-(a.length||0));
        return cssish[0];
      }
      // Fallback: return the longest non-license text if it looks somewhat like CSS
      texts = texts.filter(t => !isLicense(t) && cssIndicators(t));
      texts.sort((a,b)=>(b.length||0)-(a.length||0));
      return texts[0] || '';
    });

    // Heuristics: swap if misdetected; derive minimal HTML if missing
    if (!html || !looksLikeHTML(html)) { if (looksLikeHTML(css)) { const tmp = html; html = css; css = tmp || ''; } }
    if (!css || !looksLikeCSS(css)) { if (looksLikeCSS(html)) { const tmp = css; css = html; html = tmp || ''; } }
    if (!html && css) html = deriveHtmlFromCss(css);

    // Prefer matched HTML/CSS pairs captured from network if they look richer/consistent
    if (collectedPairs.length) {
      try {
        collectedPairs.sort((a,b)=>((b.html?.length||0)+(b.css?.length||0))-((a.html?.length||0)+(a.css?.length||0)));
        const best = collectedPairs[0] || { html:'', css:'' };
        const htmlLen = (html||'').length, cssLen = (css||'').length;
        const bestHtmlLen = (best.html||'').length, bestCssLen = (best.css||'').length;
        // Extract class names from CSS to test if HTML references any
        const getClasses = (c='') => Array.from(new Set((c.match(/\.([A-Za-z_-][A-Za-z0-9_-]*)/g)||[]).map(s=>s.slice(1))));
        const cssClasses = getClasses(css);
        const htmlHasCssClasses = cssClasses.some(cls => new RegExp(`class=["'][^"']*\\b${cls}\\b`).test(html||''));
        const bestCssClasses = getClasses(best.css);
        const bestHtmlHasCssClasses = bestCssClasses.some(cls => new RegExp(`class=["'][^"']*\\b${cls}\\b`).test(best.html||''));

        const tooShort = (s='') => s.trim().length < 50; // very small snippets likely incomplete

        const preferBest = (
          (bestHtmlLen + bestCssLen) > (htmlLen + cssLen + 40) // materially richer
          || (!html || tooShort(html))
          || (!htmlHasCssClasses && bestHtmlHasCssClasses)
        );
        if (preferBest) {
          if (best.html) html = best.html;
          if (best.css) css = best.css;
        }
      } catch {}
    }

    // Fallback: parse __NEXT_DATA__
    if ((!html && !css) || (!looksLikeHTML(html) && !looksLikeCSS(css))) {
      try {
        const pair = await page.evaluate(() => {
          const looksLikeHTML = (s = '') => /<[^>]+>/.test(s) || /&lt;[^&]*&gt;/.test(s);
          const looksLikeCSS = (s = '') => /[{][^}]*[}]/.test(s) && /;/.test(s);
          const decode = (str) => { try { const ta = document.createElement('textarea'); ta.innerHTML = str; return ta.value; } catch { return str; } };
          const scrapeStrings = (obj, acc = []) => {
            if (!obj) return acc;
            if (typeof obj === 'string') { const t = obj.trim(); if (t.length > 5) acc.push(t); return acc; }
            if (Array.isArray(obj)) { for (const it of obj) scrapeStrings(it, acc); return acc; }
            if (typeof obj === 'object') { for (const k in obj) { if (!Object.prototype.hasOwnProperty.call(obj, k)) continue; scrapeStrings(obj[k], acc);} return acc; }
            return acc;
          };
          const scrapePairs = (obj, acc = []) => {
            if (!obj) return acc;
            if (typeof obj === 'object') {
              const keys = Object.keys(obj);
              const htmlKey = keys.find(k => /(html|htmlCode|codeHtml|markup|template)/i.test(k));
              const cssKey = keys.find(k => /(css|cssCode|codeCss|style|styles|styleCode)/i.test(k));
              if (htmlKey || cssKey) {
                const html = obj[htmlKey] ?? ''; const css = obj[cssKey] ?? '';
                if ((typeof html === 'string' && looksLikeHTML(decode(html))) || (typeof css === 'string' && looksLikeCSS(decode(css)))) {
                  acc.push({ html: typeof html === 'string' ? decode(html) : '', css: typeof css === 'string' ? decode(css) : '' });
                }
              }
              for (const k of keys) scrapePairs(obj[k], acc);
            } else if (Array.isArray(obj)) { for (const it of obj) scrapePairs(it, acc); }
            return acc;
          };
          try {
            const raw = document.querySelector('#__NEXT_DATA__')?.textContent || '';
            const json = raw ? JSON.parse(raw) : (window.__NEXT_DATA__ || null);
            if (!json) return null;
            const pairs = scrapePairs(json, []);
            if (pairs.length) { pairs.sort((a,b)=>((b.html?.length||0)+(b.css?.length||0))-((a.html?.length||0)+(a.css?.length||0))); return pairs[0]; }
            const strings = scrapeStrings(json, []);
            const html = strings.filter(looksLikeHTML).map(decode).sort((a,b)=>b.length-a.length)[0] || '';
            const css = strings.filter(looksLikeCSS).map(decode).sort((a,b)=>b.length-a.length)[0] || '';
            if (!html && !css) return null; return { html, css };
          } catch { return null; }
        });
        if (pair) { if (!html && pair.html) html = pair.html; if (!css && pair.css) css = pair.css; }
      } catch {}
    }

    // Last resort: if still empty, use any collected network pair
    if ((!html && !css) && collectedPairs.length) {
      collectedPairs.sort((a,b)=>((b.html?.length||0)+(b.css?.length||0))-((a.html?.length||0)+(a.css?.length||0)));
      const best = collectedPairs[0];
      if (best) { html = best.html || ''; css = best.css || ''; }
    }

    return { html: html || '', css: css || '' };
  } finally {
    try {
      if (typeof page.off === 'function') {
        page.off('response', onResp);
      } else if (typeof page.removeListener === 'function') {
        page.removeListener('response', onResp);
      }
    } catch {}
  }
}

async function dismissBanners(page) {
  // Try dismissing cookie/consent banners
  const labels = ['accept', 'agree', 'okay', 'ok', 'got it', 'close'];
  for (const label of labels) {
    try {
      const clicked = await page.evaluate((l) => {
        const els = Array.from(document.querySelectorAll('button, [role="button"], a'));
        for (const el of els) {
          const t = (el.innerText || el.textContent || '').trim().toLowerCase();
          if (t.includes(l)) { el.click(); return true; }
        }
        return false;
      }, label);
      if (clicked) await sleep(300);
    } catch {}
  }
}

async function main() {
  const puppeteer = await getPuppeteer();
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], defaultViewport: { width: 1200, height: 900 } });
  const page = await browser.newPage();
  page.setDefaultTimeout(45000);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });

  // Guard against navigation to external sites (e.g., Termly Policy Viewer)
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      try {
        const urlObj = new URL(req.url());
        const isDoc = req.resourceType() === 'document';
        if (isDoc && urlObj.hostname !== 'uiverse.io') {
          return req.abort();
        }
      } catch {}
      return req.continue();
    });
  } catch {}

  page.on('framenavigated', async (frame) => {
    try {
      if (frame === page.mainFrame()) {
        const urlObj = new URL(page.url());
        if (urlObj.hostname !== 'uiverse.io') {
          await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
        }
      }
    } catch {}
  });

  let urls = [];
  if (!SEEDS_ONLY) {
    try {
      urls = await discoverUrls(page, Math.max(5, LIMIT * 3));
    } catch (e) {
      console.warn('Discovery failed, will use seeds. Reason:', e.message);
    }
  }
  const combined = Array.from(new Set([ ...fallbackSeeds, ...urls ]));
  const selected = combined.filter(u => {
    try {
      const pu = new URL(u);
      const segs = pu.pathname.replace(/^\/+|\/+$/g, '').split('/');
      if (segs.length !== 2) return false;
      const first = segs[0].toLowerCase();
      if (['profile', 'collection', 'collections', 'tag', 'tags', 'search'].includes(first)) return false;
      return /-[0-9]+$/i.test(segs[1]);
    } catch { return false; }
  }).slice(0, LIMIT);

  console.log(`Selected ${selected.length} URLs (limit=${LIMIT}):`, selected);

  const items = [];
  for (const url of selected) {
    const { id, author } = extractIdFromUrl(url);
    try {
      console.log('Scraping', url);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      // Wait a bit for UI
      await sleep(1200);
      await dismissBanners(page);
      // Ensure code area exists somewhere before clicking
      await page.waitForSelector('pre code, code, pre, textarea', { timeout: 8000 }).catch(() => {});

      const title = await page.title();
      let html = '', css = '';
      try {
        const res = await withTimeout(extractCode(page), 30000, 'extractCode');
        html = res.html || '';
        css = res.css || '';
      } catch (inner) {
        console.warn('Extraction failed', url, inner.message);
      }

      items.push({
        url,
        id,
        title: title || undefined,
        author: author || undefined,
        category: null,
        tags: [],
        html,
        css,
        success: Boolean(html || css)
      });
      console.log('Extraction result lengths:', { html: html.length, css: css.length, success: Boolean(html || css) });
      if (!html && !css) {
        await saveFailureArtifacts(page, `fail-${id}`);
      }
      await sleep(400);
    } catch (e) {
      console.warn('Failed to scrape', url, e.message);
      items.push({ url, id, author, title: undefined, category: null, tags: [], html: '', css: '', success: false, error: e.message });
    }
  }

  const out = {
    scrapedAt: new Date().toISOString(),
    count: items.filter(i => i.success).length,
    requested: LIMIT,
    attempted: selected.length,
    items,
  };
  const outPath = path.join(__dirname, '..', 'public', 'uiverse_components.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`Wrote ${items.length} components to`, outPath);

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
