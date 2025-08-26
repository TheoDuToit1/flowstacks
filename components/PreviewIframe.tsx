'use client'

import { useEffect, useRef, useState } from 'react'

export interface PreviewIframeProps {
  id: string
  html: string
  css?: string
  usesTailwind?: boolean
  height?: number
  bodyStyle?: string
  htmlClass?: string
  center?: boolean
  viewportWidth?: number
}

export default function PreviewIframe({ id, html, css = '', usesTailwind = false, height = 260, bodyStyle = '', htmlClass = '', center = false, viewportWidth }: PreviewIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(height)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    // Build iframe document
    const tailwindScript = usesTailwind ? '<script src="https://cdn.tailwindcss.com"></' + 'script>' : ''
    // Heuristics for popular icon/font dependencies used by Uiverse snippets
    const h = (html || '') + (css || '')
    const needsBoxicons = /\bbx\b|\bbxs-/.test(h)
    const needsRemix = /\bri-/.test(h)
    const needsFA = /\bfa[srlb]?\b|\bfa-/.test(h)
    const needsMaterialSymbols = /material-symbols-outlined/.test(h)
    const needsMaterialIcons = /material-icons(?!-)/.test(h)
    const needsIonicons = /ion-icon/.test(h)

    // Google Fonts (basic detection)
    const wants = (names: string[]) => names.some((n) => new RegExp(`font-family:\\s*[^;]*${n}`, 'i').test(h) || new RegExp(`['\"]${n}['\"]`, 'i').test(h))
    const gf = [
      wants(['Inter']) ? '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Poppins']) ? '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Roboto']) ? '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />' : '',
      wants(['Montserrat']) ? '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Nunito']) ? '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Lato']) ? '<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />' : '',
      wants(['Open Sans']) ? '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Raleway']) ? '<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Source Sans 3', 'Source Sans Pro']) ? '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Manrope']) ? '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Urbanist']) ? '<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Rubik']) ? '<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet" />' : '',
      wants(['Kanit']) ? '<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Exo 2']) ? '<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['DM Sans']) ? '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />' : '',
      wants(['Plus Jakarta Sans']) ? '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet" />' : '',
      wants(['Quicksand']) ? '<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet" />' : '',
    ].filter(Boolean).join('')

    const externalLinks = [
      gf,
      needsBoxicons ? '<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />' : '',
      needsRemix ? '<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />' : '',
      needsFA ? '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet" />' : '',
      needsMaterialSymbols ? '<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400;500;700&display=swap" rel="stylesheet" />' : '',
      needsMaterialIcons ? '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />' : '',
      needsIonicons ? '<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></' + 'script><script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></' + 'script>' : '',
    ].filter(Boolean).join('')
    const base = '<base target="_blank">'
    const reset = `
      <style>
        body { margin: 0; }
      </style>
    `
    const styles = css ? `<style>${css}</style>` : ''
    const bodyStyleTag = bodyStyle ? `<style>${bodyStyle}</style>` : ''
    const wrapperStyles = center ? `<style>.uiv-center{min-height:220px;display:grid;place-content:center;padding:12px}</style>` : ''
    const bodyInner = center ? `<div class="uiv-center">${html}</div>` : html
    const htmlAttrs = htmlClass ? ` class="${htmlClass}"` : ''

    doc.open()
    // Order: base/reset -> Tailwind (if any) -> fonts/icons -> wrapper styles -> component CSS -> body style -> body HTML
    doc.write(`<!doctype html><html${htmlAttrs}><head><meta charset=\"utf-8\" />${base}${reset}${tailwindScript}${externalLinks}${wrapperStyles}${styles}${bodyStyleTag}</head><body>${bodyInner}</body></html>`)
    doc.close()

    // Auto-resize height while content settles (Tailwind may load async)
    let ticks = 0
    const adjust = () => {
      const h = Math.max(
        doc.body?.scrollHeight || 0,
        doc.documentElement?.scrollHeight || 0,
        doc.body?.offsetHeight || 0,
        doc.documentElement?.offsetHeight || 0,
      )
      if (h && Math.abs(h - iframeHeight) > 2) {
        setIframeHeight(Math.min(Math.max(h, 120), 800))
      }
      if (ticks++ < 50) { // ~5s at 100ms
        setTimeout(adjust, 100)
      }
    }
    adjust()
  }, [id, html, css, usesTailwind, bodyStyle, htmlClass, center, viewportWidth])

  return (
    <iframe
      ref={iframeRef}
      title={`preview-${id}`}
      sandbox="allow-scripts allow-same-origin allow-popups allow-modals"
      style={{ width: viewportWidth ? `${viewportWidth}px` : '100%', border: '0', background: 'transparent', height: iframeHeight }}
    />
  )
}
