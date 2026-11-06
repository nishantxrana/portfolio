import { skillCategories } from '@/data'

const accentClasses = {
  cyan: {
    dot: 'bg-cyan',
    node: 'border-cyan text-cyan',
    chip: 'border-cyan/30 bg-cyan/5 text-cyan hover:border-cyan/50',
  },
  amber: {
    dot: 'bg-amber',
    node: 'border-amber text-amber',
    chip: 'border-amber/30 bg-amber/5 text-amber hover:border-amber/50',
  },
  accent: {
    dot: 'bg-accent',
    node: 'border-accent text-accent',
    chip: 'border-accent/30 bg-accent/5 text-accent hover:border-accent/50',
  },
} as const

export function Skills() {
  const techCount = skillCategories.reduce(
    (acc, category) => acc + category.skills.length,
    0
  )

  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
            system.map
          </h2>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-accent">
            {skillCategories.length} layers
          </span>
        </div>

        {/* System architecture visualization */}
        <div className="relative">
          {/* Connection lines - visual only */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 border-l border-dashed border-border lg:block" />

          <div className="space-y-6">
            {skillCategories.map((layer, index) => {
              const colors = accentClasses[layer.accent]

              return (
                <div
                  key={layer.id}
                  className="relative grid gap-4 lg:grid-cols-[1fr,auto,1fr] lg:gap-8"
                >
                  {/* Layer info - alternating sides */}
                  <div
                    className={`flex flex-col justify-center ${
                      index % 2 === 0
                        ? 'lg:items-end lg:text-right'
                        : 'lg:order-3 lg:items-start lg:text-left'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        layer.{index}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                    </div>
                    <h3 className="mt-1 font-mono text-lg font-medium text-foreground">
                      {layer.name}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>

                  {/* Center node */}
                  <div className="relative hidden lg:flex lg:items-center lg:justify-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background font-mono text-xs ${colors.node}`}
                    >
                      {String(index).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Skills grid */}
                  <div className={index % 2 === 0 ? 'lg:order-3' : ''}>
                    <div
                      className={`rounded-lg border border-border bg-card/30 p-4 ${
                        index % 2 === 0 ? '' : 'lg:text-right'
                      }`}
                    >
                      <div
                        className={`flex flex-wrap gap-2 ${
                          index % 2 === 0 ? '' : 'lg:justify-end'
                        }`}
                      >
                        {layer.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`inline-flex items-center rounded border px-2.5 py-1 font-mono text-xs transition-colors ${colors.chip}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats footer */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 text-center">
          <div>
            <p className="font-mono text-2xl text-foreground">{techCount}</p>
            <p className="font-mono text-xs text-muted-foreground">
              technologies
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl text-foreground">
              {skillCategories.length}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              system layers
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl text-accent">2</p>
            <p className="font-mono text-xs text-muted-foreground">
              certifications
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
