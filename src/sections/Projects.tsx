import { projects } from '@/data'
import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

function hasPublicLinks(project: (typeof projects)[number]) {
  return Boolean(project.links?.github || project.links?.live)
}

export function Projects() {
  const reposUrl = siteConfig.social.github
    ? `${siteConfig.social.github.replace(/\/$/, '')}?tab=repositories`
    : ''

  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-foreground">
            architecture.registry
          </h2>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-accent">
            {projects.length} systems
          </span>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-lg border border-border bg-card/50 transition-colors hover:border-accent/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-mono text-xs text-accent">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden text-border sm:inline" aria-hidden="true">
                    │
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.id}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-2xs ${
                      project.status === 'open-source'
                        ? 'border-accent/40 bg-accent/10 text-accent'
                        : 'border-border bg-muted/40 text-muted-foreground'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
                  {!hasPublicLinks(project) && (
                    <span className="font-mono text-xs text-muted-foreground">
                      Private — walkthrough on request
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-8 lg:grid-cols-[1fr,280px]">
                  <div>
                    <h3 className="mb-2 text-xl font-medium text-foreground">
                      {project.title}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

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

                  <div className="rounded border border-border bg-background/50 p-4">
                    <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      stack.overview
                    </p>

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

                    {project.stat && (
                      <div className="mt-4 border-t border-border pt-4 text-center">
                        <p className="font-mono text-lg text-foreground">
                          {project.stat.value}
                        </p>
                        <p className="font-mono text-2xs text-muted-foreground">
                          {project.stat.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {reposUrl && (
          <div className="mt-12 flex justify-center">
            <a
              href={reposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="text-accent">$</span>
              ls ~/projects --all
              <Icon name="external" size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
