import { siteConfig } from '@/config'

export function Footer() {
  const { name } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-accent">©</span>
            <span>
              {currentYear} {name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>react + typescript + tailwind</span>
            <span className="text-border">│</span>
            <span className="flex items-center gap-1.5">
              <span className="status-dot scale-75" />
              <span className="text-accent">deployed</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
