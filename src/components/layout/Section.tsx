import { type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from './Container'

interface SectionProps extends Omit<ComponentProps<'section'>, 'title'> {
  index?: string
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  /** Right-aligned content in the header (counts, links) */
  aside?: ReactNode
  children: ReactNode
}

export function Section({
  index,
  eyebrow,
  title,
  description,
  aside,
  children,
  className,
  ...props
}: SectionProps) {
  const headingId = props.id ? `${props.id}-heading` : undefined

  return (
    <section
      className={cn('relative py-24 sm:py-32', className)}
      aria-labelledby={title ? headingId : undefined}
      {...props}
    >
      <Container>
        {(title || eyebrow) && (
          <Reveal className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="eyebrow mb-4 flex items-center gap-3">
                  {index && <span className="text-accent">{index}</span>}
                  {index && <span className="h-px w-6 bg-border-highlight" aria-hidden="true" />}
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2
                  id={headingId}
                  className="text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {description}
                </p>
              )}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  )
}
