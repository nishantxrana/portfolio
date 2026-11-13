import { type ComponentProps, type PointerEvent, forwardRef } from 'react'
import { cn } from '@/utils'

interface CardProps extends ComponentProps<'div'> {
  /** Pointer-following glow + border highlight */
  spotlight?: boolean
  as?: 'div' | 'article' | 'li'
}

function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, spotlight = false, as = 'div', onPointerMove, ...props }, ref) => {
    // Semantic tag swap; all candidates share div-compatible props.
    const Tag = as as 'div'
    return (
    <Tag
      ref={ref}
      className={cn('surface', spotlight && 'spotlight', className)}
      onPointerMove={
        spotlight
          ? (e: PointerEvent<HTMLDivElement>) => {
              trackPointer(e)
              onPointerMove?.(e)
            }
          : onPointerMove
      }
      {...props}
    />
    )
  }
)
Card.displayName = 'Card'
