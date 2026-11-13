import { cn } from '@/utils'

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-foreground text-background shadow-[0_1px_0_0_hsl(var(--background)/0.2)_inset,0_8px_24px_-12px_hsl(var(--foreground)/0.5)] hover:bg-foreground/90',
  accent:
    'bg-accent text-accent-foreground shadow-[0_8px_24px_-12px_hsl(var(--accent)/0.8)] hover:bg-accent/90',
  secondary:
    'border border-border bg-card text-foreground hover:border-border-highlight hover:bg-muted',
  outline:
    'border border-border bg-transparent text-foreground hover:border-border-highlight hover:bg-muted/60',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
  icon: 'h-10 w-10',
  'icon-sm': 'h-9 w-9',
}

export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
) {
  return cn(base, variantStyles[variant], sizeStyles[size], className)
}

