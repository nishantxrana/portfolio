import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@/utils'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Delay in ms before the element animates in */
  delay?: number
}

/** Fades + lifts content in once it scrolls into view. Respects reduced motion via CSS. */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Also reveal anything already scrolled past (anchor jumps, fast scrolls)
        if (entry && (entry.isIntersecting || entry.boundingClientRect.top < 0)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
