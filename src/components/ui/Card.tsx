import { type ComponentProps, forwardRef } from 'react'

interface CardProps extends ComponentProps<'div'> {
  hover?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = false, ...props }, ref) => {
    const hoverStyles = hover
      ? 'hover:border-accent/30 hover:bg-card/80 transition-all duration-300'
      : ''

    return (
      <div
        ref={ref}
        className={`rounded-xl border border-border bg-card p-6 ${hoverStyles} ${className}`}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export function CardHeader({ className = '', ...props }: ComponentProps<'div'>) {
  return <div className={`mb-4 ${className}`} {...props} />
}

export function CardTitle({ className = '', ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      className={`text-lg font-semibold text-foreground ${className}`}
      {...props}
    />
  )
}

export function CardDescription({
  className = '',
  ...props
}: ComponentProps<'p'>) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props} />
  )
}

export function CardContent({ className = '', ...props }: ComponentProps<'div'>) {
  return <div className={className} {...props} />
}

