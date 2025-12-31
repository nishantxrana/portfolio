import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Contact() {
  const { email, resumeUrl, social } = siteConfig

  return (
    <section id="contact" className="relative bg-section-alt py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="section-label">
            connect.interface
          </h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: Message */}
          <div>
            <h3 className="mb-4 text-2xl font-medium text-foreground">
              Let's build something together
            </h3>
            <p className="mb-10 text-muted-foreground">
              Open to discussing production systems, DevOps challenges, cloud
              architecture, or new opportunities.
            </p>

            {/* Terminal */}
            <div className="rounded-lg bg-card font-mono text-sm">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                <span className="ml-2 text-xs text-muted-foreground/50">
                  connect.sh
                </span>
              </div>

              {/* Content */}
              <div className="p-4 text-muted-foreground/80">
                <p className="mb-4 text-muted-foreground/40">
                  # connection methods
                </p>

                <div className="space-y-3">
                  <div>
                    <p><span className="text-accent">$</span> echo $EMAIL</p>
                    <p className="pl-3 text-foreground">{email}</p>
                  </div>

                  {social.github && (
                    <div>
                      <p><span className="text-accent">$</span> echo $GITHUB</p>
                      <p className="pl-3">
                        <a
                          href={social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/80 hover:text-foreground hover:underline"
                        >
                          {social.github.replace('https://', '')}
                        </a>
                      </p>
                    </div>
                  )}

                  {social.linkedin && (
                    <div>
                      <p><span className="text-accent">$</span> echo $LINKEDIN</p>
                      <p className="pl-3">
                        <a
                          href={social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/80 hover:text-foreground hover:underline"
                        >
                          {social.linkedin.replace('https://', '')}
                        </a>
                      </p>
                    </div>
                  )}

                  <p className="mt-6 text-muted-foreground/40">
                    # status: <span className="text-accent">available</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              {/* Primary CTA */}
              <a
                href={`mailto:${email}`}
                className="group flex items-center justify-between rounded-lg border border-accent bg-accent/5 p-5 transition-colors hover:bg-accent/10"
              >
                <div className="flex items-center gap-4">
                  <Icon name="email" size={20} className="text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Send an email</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {email}
                    </p>
                  </div>
                </div>
                <Icon
                  name="arrow-right"
                  size={16}
                  className="text-accent transition-transform group-hover:translate-x-1"
                />
              </a>

              {/* Resume */}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-border/50 p-5 transition-colors hover:border-border hover:bg-card/40"
                >
                  <div className="flex items-center gap-4">
                    <Icon
                      name="download"
                      size={20}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="font-medium text-foreground">Download Resume</p>
                      <p className="font-mono text-xs text-muted-foreground/70">
                        PDF format
                      </p>
                    </div>
                  </div>
                  <Icon
                    name="external"
                    size={16}
                    className="text-muted-foreground transition-transform group-hover:translate-x-1"
                  />
                </a>
              )}

              {/* Social */}
              <div className="flex gap-2 pt-4">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                  >
                    <Icon name="github" size={18} />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                  >
                    <Icon name="linkedin" size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
