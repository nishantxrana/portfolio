import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { siteConfig } from '@/config'
import { projects } from '@/data'
import { useCopyToClipboard, useTheme } from '@/hooks'
import { cn } from '@/utils'
import { navLinks, OPEN_COMMAND_MENU, scrollToId } from '@/components/layout/nav'
import { lockScroll } from '@/lib/smoothScroll'
import { Icon, type IconName } from './Icon'

interface CommandItem {
  id: string
  label: string
  group: 'Navigate' | 'Actions' | 'Links'
  icon: IconName
  hint?: string
  keywords?: string
  perform: () => void
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)
  const { copy } = useCopyToClipboard()
  const { theme, toggleTheme } = useTheme()
  const listId = useId()

  const { email, resumeUrl, social } = siteConfig

  const items = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [
      {
        id: 'nav-top',
        label: 'Home',
        group: 'Navigate',
        icon: 'arrow-up',
        keywords: 'top hero intro',
        perform: () => scrollToId(''),
      },
      ...navLinks.map<CommandItem>((link) => ({
        id: `nav-${link.id}`,
        label: link.label,
        group: 'Navigate',
        icon: 'arrow-right',
        perform: () => scrollToId(link.id),
      })),
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        icon: 'copy',
        hint: email,
        keywords: 'mail contact clipboard',
        perform: () => {
          void copy(email).then((ok) =>
            setToast(ok ? 'Email copied to clipboard' : email)
          )
        },
      },
      {
        id: 'send-email',
        label: 'Send an email',
        group: 'Actions',
        icon: 'email',
        keywords: 'mail contact hire',
        perform: () => {
          window.location.href = `mailto:${email}`
        },
      },
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        group: 'Actions',
        icon: theme === 'dark' ? 'sun' : 'moon',
        keywords: 'theme dark light mode appearance',
        perform: toggleTheme,
      },
      {
        id: 'markdown',
        label: 'View as Markdown',
        group: 'Actions',
        icon: 'file-text',
        hint: '/index.md',
        keywords: 'markdown agent llm text',
        perform: () => openExternal('/index.md'),
      },
    ]

    if (resumeUrl) {
      list.push({
        id: 'resume',
        label: 'Open résumé',
        group: 'Actions',
        icon: 'download',
        keywords: 'resume cv',
        perform: () => openExternal(resumeUrl),
      })
    }

    const socials: [string, string, IconName][] = [
      ['GitHub', social.github, 'github'],
      ['LinkedIn', social.linkedin, 'linkedin'],
      ['X / Twitter', social.twitter, 'twitter'],
    ]
    for (const [label, url, icon] of socials) {
      if (url) {
        list.push({
          id: `social-${icon}`,
          label,
          group: 'Links',
          icon,
          hint: url.replace(/^https?:\/\//, ''),
          perform: () => openExternal(url),
        })
      }
    }

    for (const project of projects) {
      const url = project.links?.live || project.links?.github
      if (url) {
        list.push({
          id: `project-${project.id}`,
          label: project.title,
          group: 'Links',
          icon: 'code',
          hint: 'project',
          keywords: project.techStack.join(' '),
          perform: () => openExternal(url),
        })
      }
    }

    return list
  }, [copy, email, resumeUrl, social, theme, toggleTheme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) =>
      `${item.label} ${item.keywords ?? ''} ${item.hint ?? ''}`
        .toLowerCase()
        .includes(q)
    )
  }, [items, query])

  // Global shortcuts + external open requests
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_COMMAND_MENU, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen)
    }
  }, [])

  // Open / close side-effects
  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement | null
      setQuery('')
      setActiveIndex(0)
      lockScroll(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      lockScroll(false)
      restoreFocus.current?.focus?.()
    }
    return () => lockScroll(false)
  }, [open])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(''), 2000)
    return () => window.clearTimeout(t)
  }, [toast])

  // Keep the active option in view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const run = (item: CommandItem | undefined) => {
    if (!item) return
    setOpen(false)
    // Let the dialog unmount and focus restore before acting
    requestAnimationFrame(() => item.perform())
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog
      e.preventDefault()
    }
  }

  const groups = ['Navigate', 'Actions', 'Links'] as const
  let runningIndex = -1

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          onKeyDown={onKeyDown}
        >
          <div
            className="absolute inset-0 animate-overlay-in bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="surface relative w-full max-w-xl animate-dialog-in overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Icon name="search" size={16} className="text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(0)
                }}
                placeholder="Type a command or search…"
                className="h-14 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-subtle focus-visible:ring-0 focus-visible:ring-offset-0"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={
                  filtered[activeIndex] ? `${listId}-${filtered[activeIndex]!.id}` : undefined
                }
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="kbd">esc</kbd>
            </div>

            <div
              ref={listRef}
              id={listId}
              role="listbox"
              data-lenis-prevent
              aria-label="Commands"
              className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No results for “{query}”
                </p>
              )}

              {groups.map((group) => {
                const groupItems = filtered.filter((i) => i.group === group)
                if (!groupItems.length) return null
                return (
                  <div key={group} role="group" aria-label={group} className="mb-1">
                    <p className="px-3 pb-1.5 pt-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      runningIndex += 1
                      const index = runningIndex
                      const active = index === activeIndex
                      return (
                        <div
                          key={item.id}
                          id={`${listId}-${item.id}`}
                          role="option"
                          aria-selected={active}
                          data-active={active}
                          onMouseMove={() => setActiveIndex(index)}
                          onClick={() => run(item)}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                            active
                              ? 'bg-muted text-foreground'
                              : 'text-muted-foreground'
                          )}
                        >
                          <Icon
                            name={item.icon}
                            size={16}
                            className={active ? 'text-accent' : 'text-subtle'}
                          />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.hint && (
                            <span className="hidden truncate font-mono text-xs text-subtle sm:block">
                              {item.hint}
                            </span>
                          )}
                          {active && (
                            <Icon name="corner-down-left" size={14} className="text-subtle" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 text-xs text-subtle">
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd>
                navigate
                <kbd className="kbd ml-2">↵</kbd>
                select
              </span>
              <span className="font-mono">{siteConfig.name}</span>
            </div>
          </div>
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className={cn(
          'pointer-events-none fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 transition-all duration-300 ease-out-expo',
          toast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        )}
      >
        {toast && (
          <span className="surface flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground">
            <Icon name="check" size={14} className="text-accent" />
            {toast}
          </span>
        )}
      </div>
    </>
  )
}
