'use client'

import { useState } from 'react'
import PreviewIframe from '@/components/PreviewIframe'

export interface ItemData {
  id: string
  title?: string
  url: string
  author?: string
  html: string
  css?: string
  tailwindSuggested?: boolean
}

type BgOption = 'transparent' | 'white' | 'black' | 'gray' | 'gradient'

function bgToStyle(bg: BgOption): string {
  switch (bg) {
    case 'white':
      return 'body{background:#ffffff;}'
    case 'black':
      return 'body{background:#0b0b0b;color:#e5e7eb;}'
    case 'gray':
      return 'body{background:#f5f7fb;}'
    case 'gradient':
      return 'body{background:linear-gradient(135deg,#f1f5f9,#e9d5ff 40%,#dbeafe);}';
    case 'transparent':
    default:
      return ''
  }
}

export default function ComponentPreviewCard({ item }: { item: ItemData }) {
  const [useTailwind, setUseTailwind] = useState(!!item.tailwindSuggested)
  const [bg, setBg] = useState<BgOption>('transparent')
  const [dark, setDark] = useState(false)
  const [center, setCenter] = useState(true)
  const [vw, setVw] = useState<number | undefined>(undefined)

  return (
    <article className="rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden bg-white dark:bg-dark-900">
      <header className="p-4 border-b border-gray-100 dark:border-dark-800">
        <h2 className="text-xl font-semibold">{item.title || item.id}</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-neon-blue">{item.url}</a>
          {item.author ? <> · by {item.author}</> : null}
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={useTailwind} onChange={(e) => setUseTailwind(e.target.checked)} />
            <span>Tailwind</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
            <span>Dark mode (html.dark)</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={center} onChange={(e) => setCenter(e.target.checked)} />
            <span>Center content</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Background:</span>
            <select className="border rounded px-2 py-1 bg-white dark:bg-dark-800" value={bg} onChange={(e) => setBg(e.target.value as BgOption)}>
              <option value="transparent">transparent</option>
              <option value="white">white</option>
              <option value="black">black</option>
              <option value="gray">gray</option>
              <option value="gradient">gradient</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Width:</span>
            <select
              className="border rounded px-2 py-1 bg-white dark:bg-dark-800"
              value={vw ?? ''}
              onChange={(e) => setVw(e.target.value ? parseInt(e.target.value, 10) : undefined)}
            >
              <option value="">auto</option>
              <option value="320">320</option>
              <option value="360">360</option>
              <option value="375">375</option>
              <option value="414">414</option>
              <option value="480">480</option>
              <option value="640">640</option>
              <option value="768">768</option>
              <option value="1024">1024</option>
            </select>
          </div>
        </div>

        {/* Preview */}
        <PreviewIframe
          id={item.id}
          html={item.html || ''}
          css={item.css || ''}
          usesTailwind={useTailwind}
          bodyStyle={bgToStyle(bg)}
          htmlClass={dark ? 'dark' : ''}
          center={center}
          viewportWidth={vw}
        />

        {/* Code snapshot */}
        <details className="mt-2 group">
          <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 select-none">View code</summary>
          <div className="mt-2 grid grid-cols-1 gap-3">
            <div>
              <div className="text-xs font-semibold mb-1">HTML</div>
              <pre className="p-3 rounded bg-gray-50 dark:bg-dark-800 text-xs overflow-auto">
                <code>{item.html}</code>
              </pre>
            </div>
            {item.css ? (
              <div>
                <div className="text-xs font-semibold mb-1">CSS</div>
                <pre className="p-3 rounded bg-gray-50 dark:bg-dark-800 text-xs overflow-auto">
                  <code>{item.css}</code>
                </pre>
              </div>
            ) : null}
          </div>
        </details>
      </div>
    </article>
  )
}
