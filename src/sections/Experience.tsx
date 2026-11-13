import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { experiences } from '@/data'
import { Container } from '@/components/layout'
import { SectionHeader } from '@/components/fx'
import { cn } from '@/utils'

function shortHash(text: string) {
  let h = 5381
  for (const c of text) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0
  return h.toString(16).padStart(8, '0').slice(0, 7)
}

function renderHighlight(text: string, metric?: string) {
  if (!metric) return text
  const i = text.indexOf(metric)
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="rounded bg-accent/15 px-1 font-mono font-medium text-accent">{metric}</span>
      {text.slice(i + metric.length)}
    </>
  )
}

function useUptime(startLabel: string) {
  // Parse "Jan 2025" without relying on engine-specific Date string parsing
  const m = startLabel.match(/([A-Za-z]{3})[a-z]*\s+(\d{4})/)
  const month = m ? 'janfebmaraprmayjunjulaugsepoctnovdec'.indexOf(m[1]!.toLowerCase()) / 3 : -1
  const start = new Date(m ? Number(m[2]) : NaN, month, 1)
  const valid = month >= 0 && !Number.isNaN(start.getTime())
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  if (!valid) return null
  const s = Math.max(0, Math.floor((now - start.getTime()) / 1000))
  const d = Math.floor(s / 86400)
  const hh = String(Math.floor((s % 86400) / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${d}d ${hh}:${mm}:${ss}`
}

function Job({ exp }: { exp: (typeof experiences)[number] }) {
  const [startLabel = '', endLabel] = exp.period.split(/\s+[–-]\s+/)
  const uptime = useUptime(startLabel)
  const graphRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: graphRef, offset: ['start 75%', 'end 55%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })

  return (
    <article className="grid gap-10 lg:grid-cols-[340px,1fr] lg:gap-16">
      {/* Sticky meta */}
      <div>
        <div className="lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="surface overflow-hidden"
          >
            <div className="border-b border-border bg-muted/40 px-5 py-3 font-mono text-[11px] text-subtle">
              refs/heads/<span className="text-violet">main</span>
            </div>
            <div className="p-6">
              <p className="font-mono text-xs text-muted-foreground">
                {startLabel} → {endLabel ?? 'now'}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground">
                {exp.title}
              </h3>
              <p className="mt-1.5 text-muted-foreground">@ {exp.company}</p>
              <p className="mt-1 font-mono text-xs text-subtle">{exp.location}</p>

              {exp.current && uptime && (
                <div className="mt-6 rounded-xl border border-accent/25 bg-accent/[0.06] p-4">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    <span className="status-dot scale-75" aria-hidden="true" />
                    uptime
                  </p>
                  <p className="mt-1.5 font-mono text-2xl tabular-nums tracking-tight text-foreground" aria-live="off">
                    {uptime}
                  </p>
                </div>
              )}

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border font-mono text-xs">
                <div className="bg-card p-3">
                  <dt className="text-subtle">commits</dt>
                  <dd className="mt-0.5 text-lg text-foreground">{exp.highlights.length}</dd>
                </div>
                <div className="bg-card p-3">
                  <dt className="text-subtle">stack</dt>
                  <dd className="mt-0.5 text-lg text-foreground">{exp.technologies.length}</dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Commit graph */}
      <div>
        <p className="mb-6 font-mono text-xs text-subtle">
          <span className="text-accent">❯</span> git log --graph --decorate --author="{exp.company}"
        </p>
        <ol ref={graphRef} className="relative">
          <div className="absolute bottom-3 left-[11px] top-3 w-px bg-border" aria-hidden="true" />
          <motion.div
            className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-gradient-to-b from-accent via-cyan to-violet"
            style={{ scaleY: draw }}
            aria-hidden="true"
          />

          {exp.highlights.map((h, i) => {
            const isHead = i === 0
            const isTag = Boolean(h.badge)
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pb-9 pl-12 last:pb-0"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  className={cn(
                    'absolute left-[5px] top-[3px] flex h-[13px] w-[13px] items-center justify-center rounded-full border-2 bg-background transition-shadow duration-300',
                    isTag ? 'border-amber group-hover:shadow-[0_0_0_6px_hsl(var(--amber)/0.15)]' : 'border-accent group-hover:shadow-[0_0_0_6px_hsl(var(--accent)/0.15)]'
                  )}
                  aria-hidden="true"
                />
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
                  <span className="text-amber">{shortHash(h.text)}</span>
                  {isHead && (
                    <span className="text-subtle">
                      (<span className="text-cyan">HEAD</span> → <span className="text-accent">main</span>)
                    </span>
                  )}
                  {isTag && (
                    <span className="rounded border border-amber/40 bg-amber/10 px-1.5 text-[10.5px] uppercase tracking-wider text-amber">
                      tag: {h.badge}
                    </span>
                  )}
                </p>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-base">
                  {renderHighlight(h.text, h.metric)}
                </p>
              </motion.li>
            )
          })}

          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative pl-12 pt-9"
          >
            <span className="absolute left-[7px] top-[39px] h-[9px] w-[9px] rounded-full bg-border-highlight" aria-hidden="true" />
            <p className="font-mono text-xs text-subtle">
              <span className="text-amber/70">{shortHash(exp.id)}</span> Initial commit — joined {exp.company} · {startLabel}
            </p>
          </motion.li>
        </ol>
      </div>
    </article>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeader
          id="experience"
          index="01"
          command="git log --stat"
          title="Shipping platforms that stay up and cost less."
          description="Production DevOps on Microsoft Azure. Every line below is a change that landed in prod."
        />
        <div className="space-y-24">
          {experiences.map((exp) => (
            <Job key={exp.id} exp={exp} />
          ))}
        </div>
      </Container>
    </section>
  )
}
