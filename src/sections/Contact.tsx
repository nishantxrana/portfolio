import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Contact() {
  const { email, resumeUrl, social, siteUrl, availability } = siteConfig
  const websiteHost = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-foreground">
            connect.interface
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-medium text-foreground">
              Let&apos;s talk about your platform
            </h3>
            <p className="mb-8 text-muted-foreground">
              Open to discussing production systems, DevOps challenges, cloud
              architecture, or new opportunities.
            </p>

            <div className="rounded-lg border border-border bg-card/50 font-mono text-sm">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <span
                  className="h-3 w-3 rounded-full bg-red/50"
                  aria-hidden="true"
                />
                <span
                  className="h-3 w-3 rounded-full bg-amber/50"
                  aria-hidden="true"
                />
                <span
                  className="h-3 w-3 rounded-full bg-accent/50"
                  aria-hidden="true"
                />
                <span className="ml-2 text-xs text-muted-foreground">
                  connect.sh
                </span>
              </div>

              <div className="p-4 text-muted-foreground">
                <p className="mb-3 text-muted-foreground/80">
                  # available connection methods
                </p>

                <div className="space-y-2">
                  <p>
                    <span className="text-accent">$</span> echo $EMAIL
                  </p>
                  <p className="pl-4 text-foreground">{email}</p>

                  {social.github && (
                    <>
                      <p>
                        <span className="text-accent">$</span> echo $GITHUB
                      </p>
                      <p className="pl-4">
                        <a
                          href={social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan hover:underline"
                        >
                          {social.github.replace('https://', '')}
                        </a>
                      </p>
                    </>
                  )}

                  {social.linkedin && (
                    <>
                      <p>
                        <span className="text-accent">$</span> echo $LINKEDIN
                      </p>
                      <p className="pl-4">
                        <a
                          href={social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan hover:underline"
                        >
                          {social.linkedin.replace('https://', '')}
                        </a>
                      </p>
                    </>
                  )}

                  <p>
                    <span className="text-accent">$</span> echo $WEBSITE
                  </p>
                  <p className="pl-4">
                    <a
                      href={siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan hover:underline"
                    >
                      {websiteHost}
                    </a>
                  </p>

                  {availability && (
                    <p className="mt-4 text-muted-foreground/80">
                      # status:{' '}
                      <span className="text-accent">{availability}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="group flex items-center justify-between rounded-lg border border-accent bg-accent/10 p-4 transition-colors hover:bg-accent/20"
              >
                <div className="flex items-center gap-3">
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
                  className="scroll-cue text-accent transition-transform group-hover:translate-x-1"
                />
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:border-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      name="download"
                      size={20}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        Download Resume
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        Open share link
                      </p>
                    </div>
                  </div>
                  <Icon
                    name="external"
                    size={16}
                    className="scroll-cue text-muted-foreground transition-transform group-hover:translate-x-1"
                  />
                </a>
              )}

              <div className="flex gap-3 pt-4">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon name="github" size={20} />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon name="linkedin" size={20} />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon name="twitter" size={20} />
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
