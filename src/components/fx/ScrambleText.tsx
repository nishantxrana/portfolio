import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { prefersReducedMotion } from '@/lib/smoothScroll'
import { cn } from '@/utils'

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&01ABCDEFxyz'

interface ScrambleTextProps {
  text: string
  className?: string
  /** Start immediately (true), wait (false), or start when scrolled into view ('view') */
  trigger?: boolean | 'view'
  duration?: number
  delay?: number
}

/**
 * "Decrypt" effect: characters cycle through glyphs then lock in, left to right.
 * The real text is kept invisible underneath to reserve layout (no jitter)
 * and exposed to screen readers.
 */
export function ScrambleText({
  text,
  className,
  trigger = 'view',
  duration = 1100,
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const shouldRun = trigger === 'view' ? inView : trigger
  const [output, setOutput] = useState<string | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!shouldRun || started.current) return
    started.current = true
    if (prefersReducedMotion()) {
      setOutput(text)
      return
    }

    const settleAt = Array.from(text, (_, i) =>
      delay + (i / Math.max(1, text.length)) * duration * 0.75 + Math.random() * duration * 0.25
    )
    const start = performance.now()
    let frame = 0
    let last = 0

    const tick = (now: number) => {
      const elapsed = now - start
      if (now - last > 45) {
        last = now
        let next = ''
        let done = true
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]!
          if (ch === ' ' || elapsed >= settleAt[i]!) {
            next += ch
          } else {
            done = false
            next += elapsed < delay ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
        }
        setOutput(next)
        if (done) return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [shouldRun, text, duration, delay])

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {output ?? ''}
      </span>
    </span>
  )
}
