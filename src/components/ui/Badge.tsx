import { type ComponentProps } from 'react'

type BadgeVariant = 'default' | 'accent' | 'outline'

interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  outline: 'border border-border text-muted-foreground',
}

export function Badge({
  className = '',
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    />
  )
}

