import { type FormEvent, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config'
import { experiences, projects, skillCategories } from '@/data'
import { useTheme } from '@/hooks'
import { scrollToTarget } from '@/lib/smoothScroll'

type Line = { id: number; node: ReactNode }

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith('mailto:') ? undefined : '_blank'}
    rel="noopener noreferrer"
    className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
  >
    {children}
  </a>
)

const COMMANDS = [
  'help', 'whoami', 'about', 'email', 'socials', 'projects', 'skills',
  'experience', 'resume', 'ls', 'theme', 'date', 'clear', 'sudo hire-me',
] as const

/** A tiny shell you can actually type into. */
export function Terminal() {
  const { name, title, subtitle, email, social, resumeUrl } = siteConfig
  const { toggleTheme } = useTheme()
  const [lines, setLines] = useState<Line[]>(() => [
    {
      id: 0,
      node: (
        <span className="text-muted-foreground">
          Last login: {new Date().toDateString()} on ttys001
        </span>
      ),
    },
    {
      id: 1,
      node: (
        <span>
          Welcome to <span className="text-accent">nishant-shell</span>. Type{' '}
          <span className="text-amber">help</span> to see what I can do.
        </span>
      ),
    },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const idRef = useRef(2)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const push = (...nodes: ReactNode[]) =>
    setLines((prev) => [...prev, ...nodes.map((node) => ({ id: idRef.current++, node }))])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim()
    push(
      <span>
        <span className="text-accent">❯</span> <span className="text-foreground">{cmd}</span>
      </span>
    )
    if (!cmd) return
    setHistory((h) => [cmd, ...h].slice(0, 50))
    setHIndex(-1)

    const [head = '', ...args] = cmd.split(/\s+/)
    switch (head.toLowerCase()) {
      case 'help':
        push(
          <div className="grid grid-cols-[auto,1fr] gap-x-6 text-muted-foreground">
            {[
              ['whoami', 'who is this'],
              ['about', 'the short version'],
              ['email', 'copy my email address'],
              ['socials', 'where to find me'],
              ['projects', 'things running in prod'],
              ['skills', 'list namespaces'],
              ['experience', 'jump to the git log'],
              ['resume', 'open my résumé'],
              ['theme', 'toggle light / dark'],
              ['clear', 'clear the screen'],
              ['sudo hire-me', '🙂'],
            ].map(([c, d]) => (
              <span key={c} className="contents">
                <span className="text-amber">{c}</span>
                <span>{d}</span>
              </span>
            ))}
          </div>
        )
        break
      case 'whoami':
        push(<span>{name} — {title} · {subtitle}</span>)
        break
      case 'about':
        push(
          <span className="text-muted-foreground">
            DevOps &amp; Cloud engineer on Azure. Cut Azure costs 30% for American Express, shipped
            20+ .NET microservices to AKS, and won a 1,300+ person hackathon with an Azure OpenAI tool.
          </span>
        )
        break
      case 'email':
      case 'contact':
        void navigator.clipboard?.writeText(email).catch(() => {})
        push(
          <span>
            <A href={`mailto:${email}`}>{email}</A>{' '}
            <span className="text-accent">✓ copied to clipboard</span>
          </span>
        )
        break
      case 'socials':
        push(
          <div className="flex flex-col">
            {social.github && <span>github   <A href={social.github}>{social.github.replace(/^https?:\/\//, '')}</A></span>}
            {social.linkedin && <span>linkedin <A href={social.linkedin}>{social.linkedin.replace(/^https?:\/\//, '')}</A></span>}
            {social.twitter && <span>x        <A href={social.twitter}>{social.twitter.replace(/^https?:\/\//, '')}</A></span>}
          </div>
        )
        break
      case 'projects':
      case 'ls':
        if (head === 'ls' && !args.length) {
          push(
            <span className="flex flex-wrap gap-x-6">
              <span className="text-cyan">experience/</span>
              <span className="text-cyan">projects/</span>
              <span>skills.yaml</span>
              <span>degree.json</span>
              <span className="text-accent">contact.sh*</span>
            </span>
          )
          break
        }
        push(
          <div className="flex flex-col">
            {projects.map((p) => {
              const url = p.links?.live || p.links?.github
              return (
                <span key={p.id}>
                  <span className="text-accent">●</span> {url ? <A href={url}>{p.title}</A> : p.title}{' '}
                  <span className="text-subtle">— {p.techStack.slice(0, 3).join(', ')}</span>
                </span>
              )
            })}
          </div>
        )
        break
      case 'skills':
        push(
          <div className="flex flex-col">
            {skillCategories.map((c) => (
              <span key={c.id}>
                <span className="text-cyan">ns/{c.id}</span>{' '}
                <span className="text-subtle">({c.skills.length})</span>{' '}
                <span className="text-muted-foreground">{c.skills.slice(0, 4).join(', ')}…</span>
              </span>
            ))}
          </div>
        )
        break
      case 'experience':
        push(<span className="text-muted-foreground">checking out {experiences[0]?.company ?? 'main'}…</span>)
        window.setTimeout(() => scrollToTarget('experience'), 400)
        break
      case 'resume':
        if (resumeUrl) {
          window.open(resumeUrl, '_blank', 'noopener,noreferrer')
          push(<span className="text-accent">opening résumé…</span>)
        } else {
          push(<span className="text-muted-foreground">résumé is shared on request — try <span className="text-amber">email</span></span>)
        }
        break
      case 'theme':
        toggleTheme()
        push(<span className="text-accent">theme toggled</span>)
        break
      case 'date':
        push(<span>{new Date().toString()}</span>)
        break
      case 'clear':
        setLines([])
        break
      case 'echo':
        push(<span>{args.join(' ')}</span>)
        break
      case 'exit':
        push(<span className="text-muted-foreground">there is no escape. try <span className="text-amber">sudo hire-me</span></span>)
        break
      case 'rm':
        push(<span className="text-red">nice try. this cluster has RBAC.</span>)
        break
      case 'sudo':
        if (args.join(' ').startsWith('hire')) {
          push(
            <span className="text-muted-foreground">[sudo] password for recruiter: ********</span>,
            <span className="text-accent">✓ access granted — opening mail client…</span>
          )
          window.setTimeout(() => {
            window.location.href = `mailto:${email}?subject=${encodeURIComponent("Let's talk")}`
          }, 900)
        } else {
          push(<span className="text-red">recruiter is not in the sudoers file. This incident will be reported.</span>)
        }
        break
      default:
        push(
          <span>
            <span className="text-red">zsh: command not found:</span> {head}. Try{' '}
            <span className="text-amber">help</span>.
          </span>
        )
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(history.length - 1, hIndex + 1)
      if (history[next] !== undefined) {
        setHIndex(next)
        setInput(history[next]!)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = hIndex - 1
      setHIndex(Math.max(-1, next))
      setInput(next >= 0 ? history[next] ?? '' : '')
    } else if (e.key === 'Tab') {
      const match = COMMANDS.find((c) => c.startsWith(input.trim()) && input.trim())
      if (match) {
        e.preventDefault()
        setInput(match)
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      className="surface flex h-[440px] flex-col overflow-hidden font-mono text-[12.5px] leading-relaxed"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      data-cursor="type"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        </span>
        <span className="ml-2 text-[11px] text-subtle">contact.sh — interactive</span>
      </div>

      <div
        ref={bodyRef}
        data-lenis-prevent
        className="flex-1 space-y-1.5 overflow-y-auto px-4 py-4 text-foreground"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((l) => (
          <div key={l.id} className="animate-term-line break-words">
            {l.node}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <span className="text-accent" aria-hidden="true">❯</span>
          <label htmlFor="term-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-foreground caret-accent outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="type a command…"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
        {['help', 'whoami', 'projects', 'email', 'sudo hire-me'].map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              run(c)
            }}
            className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
