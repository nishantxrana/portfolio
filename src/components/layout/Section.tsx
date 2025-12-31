import { type ComponentProps, type ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps extends ComponentProps<'section'> {
  title?: string
  subtitle?: string
  children: ReactNode
}

export function Section({
  title,
  subtitle,
  children,
  className = '',
  ...props
}: SectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className}`} {...props}>
      <Container>
        {(title || subtitle) && (
          <div className="mb-12">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}

