import { projects } from '@/data'
import { Icon } from '@/components/ui'

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex items-center gap-4">
          <h2 className="section-label">
            architecture.registry
          </h2>
          <div className="h-px flex-1 bg-border/50" />
          <span className="font-mono text-xs text-muted-foreground/50">
            {projects.length} systems
          </span>
        </div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-lg bg-card transition-colors hover:bg-card/80"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-border/30 px-6 py-4">
                <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground/60">
                  <span>#{String(index).padStart(2, '0')}</span>
                  <span className="text-border/50">│</span>
                  <span>{project.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded border border-border/50 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                      <Icon name="github" size={12} />
                      source
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded border border-accent/50 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent transition-colors hover:bg-accent/10"
                    >
                      <Icon name="external" size={12} />
                      live
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-10 lg:grid-cols-[1fr,260px]">
                  {/* Main content */}
                  <div>
                    <h3 className="mb-3 text-xl font-medium text-foreground">
                      {project.title}
                    </h3>
                    <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div>
                      <p className="section-label mb-4">
                        implementation
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {project.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 text-muted-foreground/40">→</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="rounded bg-background/50 p-4">
                    <p className="section-label mb-4">
                      stack
                    </p>
                    <div className="space-y-2">
                      {project.techStack.map((tech, i) => (
                        <div key={tech} className="flex items-center gap-3">
                          <span className="font-mono text-2xs text-muted-foreground/40">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px flex-1 bg-border/30" />
                          <span className="font-mono text-xs text-foreground/80">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More link */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/nishantxrana?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground/60 transition-colors hover:text-muted-foreground"
          >
            ls ~/projects --all
            <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
