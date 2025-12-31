import { education, certifications } from '@/data'

export function Education() {
  return (
    <section id="education" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
            credentials.log
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="font-mono text-xs text-accent">01</span>
              <span className="font-mono text-sm text-foreground">Education</span>
            </div>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`rounded border border-border bg-card/30 p-4 ${
                    index === 0 ? 'border-accent/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{edu.degree}</p>
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

          {/* Certifications */}
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{cert.name}</p>
                      <p className="mt-1 font-mono text-xs text-accent">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-xs text-accent">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certification badge visual */}
            <div className="mt-6 flex items-center gap-3 rounded border border-border bg-card/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0078d4] font-mono text-sm font-bold text-white">
                MS
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Microsoft Certified
                </p>
                <p className="font-mono text-sm text-foreground">
                  2x Azure Associate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
