import { siteConfig } from '@/config'

export function Footer() {
  const { name } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-muted-foreground/50 sm:flex-row">
          <p>
            © {currentYear} {name}
          </p>
          <p>react · typescript · tailwind</p>
        </div>
      </div>
    </footer>
  )
}
