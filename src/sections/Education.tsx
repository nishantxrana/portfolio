import { education, certifications } from '@/data'
import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Education() {
  const showCertifications = siteConfig.sections.certifications

  return (
    <section id="education" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-foreground">
            credentials.log
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="font-mono text-xs text-accent">01</span>
              <span className="font-mono text-sm text-foreground">
                Education
              </span>
            </div>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`rounded border border-border bg-card/50 p-4 ${
                    index === 0 ? 'border-accent/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {edu.degree}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-muted-foreground">
                        {edu.period}
                      </p>
                      {edu.score && (
                        <p className="mt-1 font-mono text-xs text-accent">
                          {edu.score}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showCertifications && (
            <div>
              <div className="mb-6 flex items-center gap-2">
                <span className="font-mono text-xs text-accent">02</span>
                <span className="font-mono text-sm text-foreground">
                  Certifications
                </span>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded border border-accent/30 bg-accent/5 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">
                          {cert.name}
                        </p>
                        <p className="mt-1 font-mono text-xs text-accent">
                          {cert.issuer}
                        </p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 rounded border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent transition-colors hover:border-accent hover:bg-accent/20"
                          >
                            verify
                            <Icon name="external" size={12} />
                          </a>
                        )}
                      </div>
                      <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-xs text-accent">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
