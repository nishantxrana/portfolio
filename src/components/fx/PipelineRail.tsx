import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useActiveSection } from '@/hooks'
import { navLinks } from '@/components/layout/nav'
import { cn } from '@/utils'

const stages = [{ id: '', label: 'Init', stage: 'init' }, ...navLinks]
const ids = navLinks.map((l) => l.id)

/** Fixed CI/CD stage tracker that fills as you scroll (wide screens only). */
export function PipelineRail() {
  const { scrollYProgress } = useScroll()
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  const pct = useTransform(fill, (v) => `${String(Math.round(v * 100)).padStart(2, '0')}%`)
  const active = useActiveSection(ids)
  const activeIndex = active ? stages.findIndex((s) => s.id === active) : 0

  return (
    <nav
      aria-label="Pipeline progress"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-4 rounded-2xl border border-border/70 bg-background/70 px-4 py-5 backdrop-blur-xl min-[1400px]:flex"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">pipeline</p>
      <div className="relative">
        {/* track */}
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-border" aria-hidden="true" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-accent to-cyan"
          style={{ scaleY: fill }}
        />
        <ol className="relative flex flex-col gap-7">
          {stages.map((s, i) => {
            const done = i < activeIndex
            const current = i === activeIndex
            return (
              <li key={s.stage}>
                <a
                  href={s.id ? `#${s.id}` : '#'}
                  className="group flex items-center gap-3"
                  aria-current={current ? 'step' : undefined}
                >
                  <span
                    className={cn(
                      'relative flex h-[11px] w-[11px] items-center justify-center rounded-full border transition-all duration-500',
                      done && 'border-accent bg-accent',
                      current && 'border-accent bg-background shadow-[0_0_0_4px_hsl(var(--accent)/0.15)]',
                      !done && !current && 'border-border-highlight bg-background'
                    )}
                  >
                    {current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10.5px] lowercase tracking-wider transition-colors duration-300',
                      current ? 'text-foreground' : done ? 'text-muted-foreground' : 'text-subtle',
                      'group-hover:text-accent'
                    )}
                  >
                    {s.stage}
                    {done && <span className="ml-1.5 text-accent">✓</span>}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
      <motion.p className="font-mono text-[10px] tabular-nums text-accent">{pct}</motion.p>
    </nav>
  )
}
