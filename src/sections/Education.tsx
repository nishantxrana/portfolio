import { education, certifications } from '@/data'

export function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="section-label">
            credentials.log
          </h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Education */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground/50">01</span>
              <span className="text-sm font-medium text-foreground">Education</span>
            </div>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`rounded bg-card p-4 ${index === 0 ? 'border-l-2 border-accent/60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{edu.degree}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-muted-foreground/60">
                        {edu.period}
                      </p>
                      {edu.score && (
                        <p className="mt-1 font-mono text-xs text-foreground/70">
                          {edu.score}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground/50">02</span>
              <span className="text-sm font-medium text-foreground">Certifications</span>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded border-l-2 border-accent/60 bg-accent/5 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{cert.name}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div className="mt-6 flex items-center gap-3 rounded bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0078d4]/20 font-mono text-sm font-semibold text-[#0078d4]">
                MS
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground/70">
                  Microsoft Certified
                </p>
                <p className="font-mono text-sm text-foreground">
                  2× Azure Associate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
