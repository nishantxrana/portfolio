import { type ComponentProps } from 'react'
import { cn } from '@/utils'

type BadgeVariant = 'default' | 'accent' | 'outline' | 'amber'

interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'border-border bg-muted text-muted-foreground',
  accent: 'border-accent/25 bg-accent/10 text-accent',
  amber: 'border-amber/30 bg-amber/10 text-amber',
  outline: 'border-border text-muted-foreground',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium leading-5',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
