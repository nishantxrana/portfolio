import { experiences } from '@/data'

export function Experience() {
  return (
    <section id="experience" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
            deployment.log
          </h2>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-accent">
            {experiences.length} {experiences.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-32 md:block" />

          {experiences.map((exp, index) => (
            <article key={exp.id} className="relative mb-16 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background md:left-32 md:block" />

              <div className="grid gap-6 md:grid-cols-[120px,1fr] md:gap-12">
                {/* Timestamp */}
                <div className="flex items-start gap-3 md:flex-col md:items-end md:gap-1">
                  <span className="font-mono text-xs text-accent">
                    {exp.current ? 'CURRENT' : `#${index}`}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {exp.period.split(' – ')[0]}
                  </span>
                  {exp.current && (
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground md:mt-1">
                      <span className="status-dot scale-75" />
                      active
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="rounded-lg border border-border bg-card/30 p-6">
                  {/* Header */}
                  <div className="mb-6 border-b border-border pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-foreground">
                          {exp.title}
                        </h3>
                        <p className="font-mono text-sm text-accent">
                          @{exp.company.toLowerCase().replace(/\s+/g, '-')}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights as system improvements */}
                  <div className="mb-6 space-y-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      system.improvements
                    </p>
                    <div className="space-y-3">
                      {exp.highlights.map((highlight, i) => {
                        // Extract metrics if present
                        const metricMatch = highlight.match(/(\d+%?|\~\d+%)/g)
                        const hasMetric = metricMatch && metricMatch.length > 0

                        return (
                          <div
                            key={i}
                            className="group relative flex gap-3 text-sm"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50 group-hover:bg-accent" />
                            <p className="text-muted-foreground">
                              {hasMetric ? (
                                <>
                                  {highlight.split(metricMatch[0]!)[0]}
                                  <span className="font-mono text-accent">
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
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      stack.used
                    </p>
                    <div className="flex flex-wrap gap-2">
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

        {/* Timeline end marker */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-muted-foreground">
            // more to come
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  )
}
