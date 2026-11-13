import { useEffect, useState } from 'react'
import { siteConfig } from '@/config'
import { useActiveSection } from '@/hooks'
import { isMac, navLinks, openCommandMenu } from './nav'

const ids = navLinks.map((l) => l.id)

function useSessionUptime() {
  const [s, setS] = useState(0)
  useEffect(() => {
    const t0 = Date.now()
    const id = window.setInterval(() => setS(Math.floor((Date.now() - t0) / 1000)), 1000)
    return () => window.clearInterval(id)
  }, [])
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

/** tmux-style status line. */
export function Footer() {
  const { name, lastUpdated } = siteConfig
  const uptime = useSessionUptime()
  const active = useActiveSection(ids)
  const stage = navLinks.find((l) => l.id === active)?.stage ?? 'init'

  return (
    <footer className="relative border-t border-border font-mono text-[11px]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {name} · last deploy {lastUpdated}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-subtle">
          <button type="button" onClick={openCommandMenu} className="transition-colors hover:text-foreground">
            <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'}</kbd> <kbd className="kbd">K</kbd> commands
          </button>
          <a href="/index.md" data-native className="transition-colors hover:text-foreground">
            index.md
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            ↑ top
          </a>
        </div>
      </div>
      <div className="flex items-stretch overflow-hidden border-t border-border bg-muted/50 text-[10.5px]" aria-hidden="true">
        <span className="bg-accent px-3 py-1.5 font-semibold text-accent-foreground">NORMAL</span>
        <span className="bg-border px-3 py-1.5 text-foreground">⎇ main</span>
        <span className="px-3 py-1.5 text-muted-foreground">stage:{stage}</span>
        <span className="ml-auto hidden px-3 py-1.5 text-subtle sm:inline">utf-8 · tsx</span>
        <span className="bg-border px-3 py-1.5 text-foreground">up {uptime}</span>
        <span className="flex items-center gap-1.5 bg-accent/15 px-3 py-1.5 text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> all systems operational
        </span>
      </div>
    </footer>
  )
}
