import { Section } from '@/components/layout'
import { Badge, Icon, ButtonLink } from '@/components/ui'
import { projects } from '@/data'

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Featured work and side projects"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card"
          >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon name="code" size={20} />
              </div>
              <div className="flex gap-2">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="View source on GitHub"
                  >
                    <Icon name="github" size={20} />
                  </a>
                )}
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="View live demo"
                  >
                    <Icon name="external" size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="mb-6 flex-grow space-y-2">
              {project.highlights.slice(0, 3).map((highlight, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-accent">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="accent">
                  {tech}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* View more link */}
      <div className="mt-10 text-center">
        <ButtonLink
          href="https://github.com/nishantxrana"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="md"
        >
          View all projects on GitHub
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </Section>
  )
}

