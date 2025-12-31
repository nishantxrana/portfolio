import { projects } from '@/data'
import { Icon } from '@/components/ui'

export function Projects() {
  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
            architecture.registry
          </h2>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-accent">
            {projects.length} systems
          </span>
        </div>

        {/* Projects grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-lg border border-border bg-card/30 transition-colors hover:border-accent/30"
            >
              {/* Project header bar */}
              <div className="flex items-center justify-between border-b border-border px-6 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">
                    #{String(index).padStart(2, '0')}
                  </span>
                  <span className="text-border">│</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
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
                      className="flex items-center gap-1.5 rounded border border-accent/50 bg-accent/10 px-2 py-1 font-mono text-xs text-accent transition-colors hover:bg-accent/20"
                    >
                      <Icon name="external" size={12} />
                      live
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-8 lg:grid-cols-[1fr,280px]">
                  {/* Main content */}
                  <div>
                    {/* Title */}
                    <h3 className="mb-2 text-xl font-medium text-foreground">
                      {project.title}
                    </h3>

                    {/* Description as problem statement */}
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Highlights as implementation details */}
                    <div className="space-y-4">
                      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        implementation.details
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-0.5 text-accent">→</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar: Architecture overview */}
                  <div className="rounded border border-border bg-background/50 p-4">
                    <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      stack.overview
                    </p>

                    {/* Visual stack representation */}
                    <div className="space-y-2">
                      {project.techStack.map((tech, i) => (
                        <div key={tech} className="flex items-center gap-2">
                          <span className="font-mono text-2xs text-accent">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px flex-1 bg-border" />
                          <span className="font-mono text-xs text-foreground">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Project stats */}
                    <div className="mt-4 border-t border-border pt-4">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <p className="font-mono text-lg text-foreground">
                            {project.techStack.length}
                          </p>
                          <p className="font-mono text-2xs text-muted-foreground">
                            technologies
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-lg text-foreground">
                            {project.highlights.length}
                          </p>
                          <p className="font-mono text-2xs text-muted-foreground">
                            features
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More projects link */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/nishantxrana?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <span className="text-accent">$</span>
            ls ~/projects --all
            <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
