import { experiences } from '@/data'

export function Experience() {
  return (
    <section id="experience" className="relative bg-section-alt py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex items-center gap-4">
          <h2 className="section-label">
            deployment.log
          </h2>
          <div className="h-px flex-1 bg-border/40" />
          <span className="font-mono text-xs text-muted-foreground/50">
            {experiences.length} {experiences.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - softer */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border/40 md:left-32 md:block" />

          {experiences.map((exp) => (
            <article key={exp.id} className="relative mb-20 last:mb-0">
              {/* Timeline dot - accent only here */}
              <div className="absolute left-0 top-1 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-32 md:block" />

              <div className="grid gap-8 md:grid-cols-[120px,1fr] md:gap-16">
                {/* Timestamp */}
                <div className="flex items-start gap-3 md:flex-col md:items-end md:gap-1.5">
                  {exp.current && (
                    <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
                      <span className="status-dot scale-75" />
                      CURRENT
                    </span>
                  )}
                  <span className="font-mono text-sm text-muted-foreground/70">
                    {exp.period.split(' – ')[0]}
                  </span>
                </div>

                {/* Content - softer card */}
                <div className="rounded-lg bg-card/40 p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-foreground">
                      {exp.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">
                      @{exp.company.toLowerCase().replace(/\s+/g, '-')}
                      <span className="mx-2 text-border">·</span>
                      <span className="text-muted-foreground/60">{exp.location}</span>
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <p className="section-label mb-4">
                      system.improvements
                    </p>
                    <div className="space-y-3">
                      {exp.highlights.map((highlight, i) => {
                        const metricMatch = highlight.match(/(\d+%?|~\d+%)/g)
                        const hasMetric = metricMatch && metricMatch.length > 0

                        return (
                          <div
                            key={i}
                            className="flex gap-3 text-sm leading-relaxed"
                          >
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-border" />
                            <p className="text-muted-foreground">
                              {hasMetric ? (
                                <>
                                  {highlight.split(metricMatch[0]!)[0]}
                                  <span className="font-medium text-foreground">
                                    {metricMatch[0]}
                                  </span>
                                  {highlight.split(metricMatch[0]!).slice(1).join(metricMatch[0]!)}
                                </>
                              ) : (
                                highlight
                              )}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p className="section-label mb-3">
                      stack.used
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* End marker - subtle */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-border/30" />
          <span className="font-mono text-xs text-muted-foreground/40">
            // more to come
          </span>
          <div className="h-px flex-1 bg-border/30" />
        </div>
      </div>
    </section>
  )
}
