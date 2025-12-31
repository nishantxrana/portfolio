import { Section } from '@/components/layout'
import { Badge, Icon } from '@/components/ui'
import { education, certifications } from '@/data'

export function Education() {
  return (
    <Section
      id="education"
      title="Education & Certifications"
      subtitle="Academic background and professional certifications"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Icon name="briefcase" size={16} />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-lg border border-border bg-card/50 p-4"
              >
                <h4 className="font-medium text-foreground">{edu.degree}</h4>
                <p className="mt-1 text-sm text-accent">{edu.institution}</p>
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{edu.period}</span>
                  {edu.score && (
                    <Badge variant="outline">{edu.score}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Icon name="check" size={16} />
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="rounded-lg border border-accent/20 bg-accent/5 p-4"
              >
                <h4 className="font-medium text-foreground">{cert.name}</h4>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-accent">{cert.issuer}</span>
                  <span className="text-muted-foreground">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

