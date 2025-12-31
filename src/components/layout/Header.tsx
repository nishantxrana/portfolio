import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Header() {
  const { name, social, resumeUrl } = siteConfig

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-sm transition-colors hover:text-foreground"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 text-xs text-accent">
            ▲
          </span>
          <span className="text-foreground/90">
            {name.split(' ')[0]?.toLowerCase()}
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-muted-foreground/60">portfolio</span>
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: '#experience', label: 'experience' },
            { href: '#projects', label: 'projects' },
            { href: '#skills', label: 'skills' },
            { href: '#contact', label: 'contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1.5 font-mono text-xs text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground/60 transition-colors hover:bg-muted/50 hover:text-foreground"
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
              className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground/60 transition-colors hover:bg-muted/50 hover:text-foreground"
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
              className="ml-2 hidden items-center gap-1.5 rounded border border-border/50 px-3 py-1.5 font-mono text-xs text-muted-foreground/70 transition-colors hover:border-border hover:text-foreground sm:flex"
            >
              <Icon name="download" size={12} />
              resume
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
