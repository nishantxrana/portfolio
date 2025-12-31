import { siteConfig } from '@/config'
import { Container } from './Container'

export function Footer() {
  const { name } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  )
}

