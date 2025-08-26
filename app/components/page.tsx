import fs from 'fs'
import path from 'path'
import ComponentPreviewCard from '@/components/ComponentPreviewCard'

// Server component page that renders the first 5 successful Uiverse components
export default async function ComponentsPage() {
  const dataPath = path.join(process.cwd(), 'public', 'uiverse_components.json')
  let items: Array<{ id: string; title?: string; html: string; css: string; url: string; author?: string; success?: boolean }> = []

  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const json = JSON.parse(raw)
    const all = Array.isArray(json?.items) ? json.items : []
    // Prefer richer snippets to avoid minimal/incomplete HTML
    const scored = all
      .filter((it: any) => it && (it.success || it.html || it.css))
      .map((it: any) => ({
        ...it,
        _score: (it.html?.length || 0) + Math.floor((it.css?.length || 0) / 4),
      }))
      .sort((a: any, b: any) => b._score - a._score)
    items = scored.slice(0, 5)
  } catch (e) {
    // If reading fails, keep items empty
    console.warn('Failed to read uiverse_components.json:', (e as Error).message)
  }

  const looksLikeTailwind = (item: { html: string; css?: string; title?: string; tags?: string[] }) => {
    const t = (item.title || '').toLowerCase()
    if (t.includes('tailwind')) return true
    const tagsStr = (Array.isArray(item.tags) ? item.tags.join(' ') : '').toLowerCase()
    if (tagsStr.includes('tailwind')) return true
    const h = (item.html || '') + (item.css || '')
    // Common Tailwind class/variant patterns
    const indicators = [
      /\b(bg|text|border|shadow|ring|flex|grid|items|justify|gap|rounded|p[trblxy]?|m[trblxy]?|w-|h-|max-w-|min-w-|space-[xy]-|hover:|focus:|active:|sm:|md:|lg:|xl:|2xl:)[-:]/,
      /\bdark:/,
      /\bfrom-\w|\bto-\w|\bvia-\w/, // gradients
    ]
    // Heuristic: many hyphenated utility classes in a single class attribute
    const hyphenDensity = (h.match(/class\s*=\s*"[^"]*-[^"]*"/g) || []).length
    return hyphenDensity > 0 || indicators.some((re) => re.test(h))
  }

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Components</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Showing 5 imported components from Uiverse. Each preview is rendered in an isolated iframe for visual fidelity.
        </p>

        {items.length === 0 && (
          <div className="p-6 rounded-lg border border-gray-200 dark:border-dark-700">
            <p className="text-gray-700 dark:text-gray-300">No components available. Run the scraper to generate public/uiverse_components.json.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <ComponentPreviewCard
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                url: item.url,
                author: item.author,
                html: item.html || '',
                css: item.css || '',
                tailwindSuggested: looksLikeTailwind(item as any),
              }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
