import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { prefersReducedMotion } from '@/lib/smoothScroll'

/** Animates the numeric part of strings like "30%", "20+", "1,300+", "2×". */
export function CountUp({
  value,
  className,
  duration = 1.8,
}: {
  value: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const raw = match?.[2] ?? ''
  const suffix = match?.[3] ?? ''
  const target = Number(raw.replace(/,/g, ''))
  const useCommas = raw.includes(',')
  const [display, setDisplay] = useState(match ? '0' : value)

  useEffect(() => {
    if (!match || !inView) return
    if (prefersReducedMotion()) {
      setDisplay(raw)
      return
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = Math.round(v)
        setDisplay(useCommas ? n.toLocaleString('en-US') : String(n))
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target])

  if (!match) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  )
}
