import { type ReactNode } from 'react'
import { cn } from '@/utils'

/** Seamless infinite marquee (content duplicated, CSS-driven, pauses on hover). */
export function Marquee({
  children,
  className,
  reverse = false,
  speed = 40,
}: {
  children: ReactNode
  className?: string
  reverse?: boolean
  /** seconds per loop */
  speed?: number
}) {
  return (
    <div className={cn('group/marquee flex overflow-hidden', className)}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          className="marquee-track flex shrink-0 items-center"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
