import { type CSSProperties, useState } from 'react'
import { motion } from 'motion/react'
import { certifications, skillCategories } from '@/data'
import { siteConfig } from '@/config'
import { Container } from '@/components/layout'
import { CountUp, SectionHeader } from '@/components/fx'
import { cn } from '@/utils'

const accent = {
  accent: { text: 'text-accent', border: 'border-accent/50', bg: 'bg-accent', ring: 'border-accent/25', glow: 'shadow-[0_0_14px_hsl(var(--accent)/0.45)]' },
  cyan: { text: 'text-cyan', border: 'border-cyan/50', bg: 'bg-cyan', ring: 'border-cyan/25', glow: 'shadow-[0_0_14px_hsl(var(--cyan)/0.45)]' },
  amber: { text: 'text-amber', border: 'border-amber/50', bg: 'bg-amber', ring: 'border-amber/25', glow: 'shadow-[0_0_14px_hsl(var(--amber)/0.45)]' },
} as const

const shortLabel = (s: string) => s.replace(/\s*\(.*\)\s*$/, '')

// Smallest namespaces orbit closest to the core
const ordered = [...skillCategories].sort((a, b) => a.skills.length - b.skills.length)
const SIZE = 620
const radii = ordered.map((_, i) => 96 + i * ((SIZE / 2 - 30 - 96) / Math.max(1, ordered.length - 1)))

function Orbit({ active }: { active: string | null }) {
  return (
    <div
      className="orbit-wrap relative mx-auto h-[620px] w-[620px]"
      aria-hidden="true"
    >
      {/* core */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-accent/40 bg-background shadow-[0_0_60px_-10px_hsl(var(--accent)/0.6)]">
          <span className="absolute inset-0 animate-ping rounded-full border border-accent/30 [animation-duration:3s]" />
          <span className="text-2xl leading-none text-accent">⎈</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            control
          </span>
        </div>
      </div>

      {ordered.map((cat, ri) => {
        const r = radii[ri]!
        const c = accent[cat.accent]
        const dim = active !== null && active !== cat.id
        const dur = 60 + ri * 22
        const dir = ri % 2 === 0 ? 'normal' : 'reverse'
        const counter = ri % 2 === 0 ? 'reverse' : 'normal'
        return (
          <div
            key={cat.id}
            className={cn('absolute inset-0 transition-opacity duration-500', dim && 'opacity-15')}
          >
            <div
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-colors duration-500',
                active === cat.id ? c.border : 'border-border'
              )}
              style={{ width: r * 2, height: r * 2 }}
            />
            <div
              className="orbit absolute inset-0"
              style={{ '--dur': `${dur}s`, '--dir': dir } as CSSProperties}
            >
              {cat.skills.map((skill, si) => {
                const angle = (360 / cat.skills.length) * si + ri * 17
                return (
                  <div
                    key={skill}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(${r}px) rotate(${-angle}deg)`,
                    }}
                  >
                    <div
                      className="orbit"
                      style={{ '--dur': `${dur}s`, '--dir': counter } as CSSProperties}
                    >
                      <span
                        className={cn(
                          'block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border bg-card px-2 py-0.5 font-mono text-[10px] transition-all duration-500',
                          active === cat.id
                            ? cn(c.border, c.text, c.glow, 'scale-110')
                            : 'border-border text-muted-foreground'
                        )}
                      >
                        {shortLabel(skill)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Skills() {
  const [active, setActive] = useState<string | null>(null)
  const techCount = skillCategories.reduce((n, c) => n + c.skills.length, 0)
  const certCount = siteConfig.sections.certifications ? certifications.length : 0

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative overflow-hidden py-28 sm:py-36">
      <Container>
        <SectionHeader
          id="skills"
          index="03"
          command="kubectl get pods --all-namespaces"
          title="The control plane."
          description="Every tool I run in production, scheduled into namespaces. Hover a namespace to light up its orbit."
          aside={
            <dl className="flex gap-8 font-mono">
              {[
                { v: String(techCount), l: 'pods' },
                { v: String(skillCategories.length), l: 'namespaces' },
                ...(certCount ? [{ v: String(certCount), l: 'certs' }] : []),
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-subtle">{s.l}</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                    <CountUp value={s.v} />
                  </dd>
                </div>
              ))}
            </dl>
          }
        />

        <div className="grid items-center gap-12 xl:grid-cols-[620px,1fr] xl:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <Orbit active={active} />
          </motion.div>

          <ul className="space-y-2" onMouseLeave={() => setActive(null)}>
            {skillCategories.map((cat, i) => {
              const c = accent[cat.accent]
              const isActive = active === cat.id
              return (
                <motion.li
                  key={cat.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    tabIndex={0}
                    onMouseEnter={() => setActive(cat.id)}
                    onFocus={() => setActive(cat.id)}
                    onBlur={() => setActive(null)}
                    data-cursor="inspect"
                    className={cn(
                      'rounded-xl border p-4 outline-none transition-all duration-300',
                      isActive ? cn('bg-card', c.border) : 'border-border/60 bg-card/40 hover:bg-card'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4 font-mono text-xs">
                      <span className="flex items-center gap-2.5">
                        <span className={cn('h-2 w-2 rounded-full', c.bg, isActive && 'animate-pulse')} />
                        <span className="text-subtle">ns/</span>
                        <span className="-ml-2.5 text-sm text-foreground">{cat.id}</span>
                      </span>
                      <span className={cn(c.text)}>
                        {cat.skills.length}/{cat.skills.length} Running
                      </span>
                    </div>
                    <p className="mt-1 pl-[18px] text-sm text-muted-foreground">
                      {cat.name} — {cat.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5 pl-[18px]">
                      {cat.skills.map((s) => (
                        <li key={s} className={cn('chip', isActive && cn(c.text, c.border))}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
