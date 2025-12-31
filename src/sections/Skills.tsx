import { Section } from '@/components/layout'
import { Badge } from '@/components/ui'
import { skillCategories } from '@/data'

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-border bg-card/50 p-6"
          >
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

