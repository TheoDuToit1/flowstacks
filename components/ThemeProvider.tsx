'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Wrap next-themes provider so we can control the import location app-wide
// and keep a consistent interface in `app/layout.tsx`.
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />
}
