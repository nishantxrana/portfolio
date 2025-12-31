import { Section } from '@/components/layout'
import { Badge, Icon } from '@/components/ui'
import { experiences } from '@/data'

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey and achievements"
    >
      <div className="space-y-8">
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="group relative rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card sm:p-8"
          >
            {/* Current indicator */}
            {exp.current && (
              <div className="absolute -top-px left-6 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
            )}

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="mt-1 text-accent">{exp.company}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Icon name="calendar" size={14} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="map-pin" size={14} />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Highlights */}
            <ul className="mb-6 space-y-3">
              {exp.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <Icon
                    name="check"
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

