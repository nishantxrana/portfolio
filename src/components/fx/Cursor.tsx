import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { prefersReducedMotion } from '@/lib/smoothScroll'

/**
 * Crosshair cursor follower (fine pointers only). The native cursor stays,
 * this adds a trailing reticle that expands over interactive elements.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        'a, button, [role="option"], input, [data-cursor]'
      )
      setHover(el ? el.dataset.cursor ?? (el.tagName === 'INPUT' ? 'type' : 'link') : null)
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  const active = hover !== null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[300]">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{ width: active ? 46 : 26, height: active ? 46 : 26, rotate: active ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {/* reticle corners */}
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-accent" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-accent" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-accent" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent" />
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y, opacity: visible && !active ? 1 : 0 }}
      />
    </div>
  )
}
