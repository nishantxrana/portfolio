import { siteConfig } from '@/config'
import { Container } from './Container'
import { Icon, ButtonLink } from '@/components/ui'

export function Header() {
  const { name, social, resumeUrl } = siteConfig

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
          >
            {name.split(' ')[0]}
            <span className="text-accent">.</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden items-center gap-6 text-sm sm:flex">
            <a
              href="#experience"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Icon name="github" size={20} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={20} />
              </a>
            )}
            {resumeUrl && (
              <ButtonLink
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="ml-2 hidden sm:inline-flex"
              >
                <Icon name="download" size={16} />
                Resume
              </ButtonLink>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

