import { siteConfig } from '@/config'
import { Section } from '@/components/layout'
import { ButtonLink, Icon } from '@/components/ui'

export function Contact() {
  const { email, resumeUrl, social } = siteConfig

  return (
    <Section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Let's work together
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          I'm currently open to new opportunities. Whether you have a project in
          mind, a question, or just want to say hi — my inbox is always open.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href={`mailto:${email}`} variant="primary" size="lg">
            <Icon name="email" size={18} />
            Send me an email
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
        <div className="mt-10 flex items-center justify-center gap-6">
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

        {/* Email display */}
        <p className="mt-8 text-sm text-muted-foreground">
          or reach out directly at{' '}
          <a
            href={`mailto:${email}`}
            className="text-accent underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </p>
      </div>
    </Section>
  )
}

