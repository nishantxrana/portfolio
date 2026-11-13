import { useEffect, useId, useState } from 'react'
import { siteConfig } from '@/config'
import { useActiveSection, useScrolled } from '@/hooks'
import { cn } from '@/utils'
import { Icon, ThemeToggle, buttonClass } from '@/components/ui'
import { lockScroll } from '@/lib/smoothScroll'
import { isMac, navLinks, openCommandMenu } from './nav'

const sectionIds = navLinks.map((l) => l.id)

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Header() {
  const { name, resumeUrl } = siteConfig
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    lockScroll(true)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      lockScroll(false)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || menuOpen
            ? 'border-border/80 bg-background/75 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Brand */}
          <a
            href="#"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 rounded-lg text-sm font-medium text-foreground"
            aria-label={`${name} — back to top`}
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-border bg-card font-mono text-[11px] font-semibold tracking-tight text-foreground transition-colors group-hover:border-accent/50">
              <span className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-cyan/10" aria-hidden="true" />
              <span className="relative">{initials(name)}</span>
            </span>
            <span className="hidden tracking-tight sm:inline">{name}</span>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur md:flex"
          >
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-muted text-foreground shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.06)]'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCommandMenu}
              className="hidden h-9 items-center gap-2 rounded-full border border-border bg-card/60 pl-3 pr-1.5 text-[13px] text-muted-foreground transition-colors hover:border-border-highlight hover:text-foreground sm:flex"
              aria-label="Open command menu"
              aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            >
              <Icon name="search" size={14} />
              <span className="hidden lg:inline">Search</span>
              <span className="flex gap-0.5">
                <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'}</kbd>
                <kbd className="kbd">K</kbd>
              </span>
            </button>

            <button
              type="button"
              onClick={openCommandMenu}
              className={buttonClass('ghost', 'icon-sm', 'sm:hidden')}
              aria-label="Open command menu"
            >
              <Icon name="search" size={16} />
            </button>

            <ThemeToggle />

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass('primary', 'sm', 'ml-1 hidden sm:inline-flex')}
              >
                Résumé
                <Icon name="arrow-up-right" size={14} />
              </a>
            )}

            <button
              type="button"
              className={buttonClass('ghost', 'icon-sm', 'md:hidden')}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <nav
          id={menuId}
          aria-label="Mobile"
          data-lenis-prevent
          className="h-[calc(100dvh-4rem)] animate-overlay-in overflow-y-auto border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                className="animate-enter delay-step border-b border-border/60"
                style={{ ['--i' as string]: i }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={active === link.id ? 'true' : undefined}
                  className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight text-foreground"
                >
                  {link.label}
                  <Icon name="arrow-right" size={18} className="text-subtle" />
                </a>
              </li>
            ))}
          </ul>
          {resumeUrl && (
            <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={buttonClass('primary', 'lg', 'w-full')}
              >
                View résumé
                <Icon name="arrow-up-right" size={16} />
              </a>
            </div>
          )}
        </nav>
      )}
    </header>
  )
}
