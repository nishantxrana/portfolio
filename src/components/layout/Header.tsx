import { useEffect, useId, useState } from 'react'
import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

const navLinks = [
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'projects' },
  { href: '#skills', label: 'skills' },
  { href: '#education', label: 'education' },
  { href: '#contact', label: 'contact' },
] as const

export function Header() {
  const { name, social, resumeUrl } = siteConfig
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-sm transition-colors hover:text-accent"
          onClick={closeMenu}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 text-xs text-accent">
            ▲
          </span>
          <span className="hidden text-foreground sm:inline">
            {name.split(' ')[0]?.toLowerCase()}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">portfolio</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub"
            >
              <Icon name="github" size={16} />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" size={16} />
            </a>
          )}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden items-center gap-1.5 rounded border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground sm:flex"
            >
              <Icon name="download" size={12} />
              resume
            </a>
          )}

          <button
            type="button"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span
                className={`block h-px w-4 bg-current transition-transform ${
                  menuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-4 bg-current transition-opacity ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform ${
                  menuOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-1 flex items-center gap-2 rounded border border-border px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <Icon name="download" size={14} />
                resume
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
