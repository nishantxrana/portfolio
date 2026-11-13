import { type CSSProperties, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { projects } from '@/data'
import { siteConfig } from '@/config'
import { useMediaQuery } from '@/hooks'
import { Icon, buttonClass } from '@/components/ui'
import { Container } from '@/components/layout'
import { CountUp, ScrambleText, Tilt } from '@/components/fx'

type Project = (typeof projects)[number]

function containerId(id: string) {
  let h = 0
  for (const c of id) h = (Math.imul(31, h) + c.charCodeAt(0)) >>> 0
  return (h.toString(16) + 'a3f9c2e1').slice(0, 12)
}

/** Vertical service topology with packets flowing between hops. */
function Topology({ stack }: { stack: string[] }) {
  return (
    <ol className="relative flex flex-col">
      {stack.map((tech, i) => (
        <li key={tech} className="relative">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group/node flex items-center gap-3 rounded-lg border border-border bg-background/70 px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-accent/50"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border text-[9px] text-subtle transition-colors group-hover/node:border-accent/50 group-hover/node:text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="truncate">{tech}</span>
            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]" />
          </motion.div>
          {i < stack.length - 1 && (
            <div className="relative ml-[22px] h-4 w-px bg-border" aria-hidden="true">
              <span
                className="packet absolute -left-[2px] h-[5px] w-[5px] rounded-full bg-accent"
                style={{ '--d': `${i * 0.35}s` } as CSSProperties}
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

function ProjectContainer({ project, index, total }: { project: Project; index: number; total: number }) {
  const { github, live } = project.links ?? {}
  const image = `${project.id}:latest`

  return (
    <article className="surface flex h-full flex-col overflow-hidden">
      {/* docker ps header */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 border-b border-border bg-muted/40 px-5 py-3 font-mono text-[10.5px] sm:grid-cols-[auto,1fr,auto]">
        <span className="text-subtle">
          CONTAINER <span className="text-muted-foreground">{containerId(project.id)}</span>
        </span>
        <span className="hidden truncate text-subtle sm:block">
          IMAGE <span className="text-cyan">{image}</span>
        </span>
        <span className="flex items-center justify-end gap-1.5 text-accent">
          <span className="status-dot scale-75" aria-hidden="true" />
          {project.status === 'open-source' ? 'Up · public' : 'Up · internal'}
        </span>
      </div>

      <div className="grid flex-1 gap-8 p-6 sm:p-8 md:grid-cols-[1fr,240px] md:gap-10">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="text-outline text-[clamp(4rem,9vw,7rem)] font-semibold leading-[0.8] tracking-[-0.06em]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[11px] text-subtle">
              {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            <ScrambleText text={project.title} duration={700} />
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-muted-foreground">
                <span className="mt-px font-mono text-accent">+</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
            {project.stat && (
              <div>
                <CountUp
                  value={project.stat.value}
                  className="text-5xl font-semibold leading-none tracking-[-0.05em] text-foreground"
                />
                <p className="mt-1.5 font-mono text-[11px] text-subtle">{project.stat.label}</p>
              </div>
            )}
            <div className="flex gap-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass('secondary', 'md')}
                  aria-label={`${project.title} source on GitHub`}
                  data-cursor="code"
                >
                  <Icon name="github" size={15} />
                  Source
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass('accent', 'md')}
                  aria-label={`${project.title} live site`}
                >
                  Live <Icon name="arrow-up-right" size={15} />
                </a>
              )}
              {!github && !live && (
                <span className="flex items-center gap-1.5 font-mono text-xs text-subtle">
                  <Icon name="lock" size={12} /> Private — walkthrough on request
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="mb-3 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
            topology
            <span className="normal-case tracking-normal text-accent">{project.techStack.length} hops</span>
          </p>
          <Topology stack={project.techStack} />
        </div>
      </div>
    </article>
  )
}

function Intro({ reposUrl }: { reposUrl: string }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="text-accent">[02]</span>
        <span className="h-px w-10 bg-border-highlight" aria-hidden="true" />
        <span>
          <span className="text-subtle">$</span> docker ps --filter status=running
        </span>
      </p>
      <h2
        id="projects-heading"
        className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-foreground"
      >
        <ScrambleText text="Running in" />
        <br />
        <span className="text-gradient-accent">production.</span>
      </h2>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
        AI-assisted operations, secure agent gateways and browser-only tools for teams on Azure
        DevOps.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {reposUrl && (
          <a href={reposUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'md')}>
            All repositories <Icon name="arrow-up-right" size={14} />
          </a>
        )}
        <span className="hidden items-center gap-2 font-mono text-xs text-subtle lg:flex">
          scroll <Icon name="arrow-right" size={13} className="animate-nudge" />
        </span>
      </div>
    </div>
  )
}

/** Desktop: vertical scroll drives a pinned horizontal track. */
function HorizontalTrack({ reposUrl }: { reposUrl: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-6 pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-[8vw] will-change-transform"
        >
          <div className="w-[380px] shrink-0">
            <Intro reposUrl={reposUrl} />
          </div>
          {projects.map((p, i) => (
            <div key={p.id} className="h-[min(72vh,600px)] w-[min(76vw,880px)] shrink-0">
              <Tilt max={4} className="h-full">
                <ProjectContainer project={p} index={i} total={projects.length} />
              </Tilt>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 flex w-full max-w-6xl items-center gap-4 px-8 font-mono text-[11px] text-subtle">
          <span>release</span>
          <div className="h-px flex-1 bg-border">
            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: bar }} />
          </div>
          <span>{projects.length} containers</span>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  const isDesktop = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const reposUrl = siteConfig.social.github
    ? `${siteConfig.social.github.replace(/\/$/, '')}?tab=repositories`
    : ''

  if (isDesktop) return <HorizontalTrack reposUrl={reposUrl} />

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-28">
      <Container>
        <div className="mb-14">
          <Intro reposUrl={reposUrl} />
        </div>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectContainer project={p} index={i} total={projects.length} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
