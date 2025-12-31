import { siteConfig, professionalSummary } from '@/config'
import { Container } from '@/components/layout'
import { ButtonLink, Icon } from '@/components/ui'

export function Hero() {
  const { name, title, subtitle, email, resumeUrl, social } = siteConfig

  return (
    <section className="relative flex min-h-[90vh] items-center pt-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </div>

          {/* Name */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {name}
          </h1>

          {/* Title */}
          <p className="mb-2 text-xl font-medium text-accent sm:text-2xl">
            {title}
          </p>

          {/* Subtitle */}
          <p className="mb-6 text-lg text-muted-foreground">{subtitle}</p>

          {/* Summary */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {professionalSummary}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href={`mailto:${email}`}
              variant="primary"
              size="lg"
            >
              <Icon name="email" size={18} />
              Get in Touch
            </ButtonLink>
            {resumeUrl && (
              <ButtonLink
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                <Icon name="download" size={18} />
                Download Resume
              </ButtonLink>
            )}
          </div>

          {/* Social links */}
          <div className="mt-10 flex items-center justify-center gap-5">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Icon name="github" size={24} />
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
                <Icon name="linkedin" size={24} />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Icon name="twitter" size={24} />
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

