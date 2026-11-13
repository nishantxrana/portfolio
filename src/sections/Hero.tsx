import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { siteConfig } from '@/config'
import { certifications, experiences } from '@/data'
import { Icon, buttonClass } from '@/components/ui'
import { Container } from '@/components/layout'
import { ClusterCanvas, CountUp, Magnetic, Marquee, ScrambleText, Tilt, Typewriter } from '@/components/fx'
import { KubectlPanel } from './KubectlPanel'

const roles = [
  'DevOps Engineer',
  'Cloud Engineer · Azure',
  'Kubernetes Operator',
  'Pipeline Architect',
  'AI-on-Azure Builder',
] as const

const stack = [
  'Azure', 'AKS', 'Kubernetes', 'Helm', 'Terraform', 'Docker', 'Azure DevOps',
  'GitLab CI', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'Azure Monitor',
  'App Insights', '.NET', 'Node.js', 'React', 'Python', 'Azure OpenAI', 'AI Foundry', 'RAG',
]

const commands = [
  'helm upgrade --install',
  'terraform apply -auto-approve',
  'kubectl rollout status',
  'az aks get-credentials',
  'docker buildx build --push',
  'git push origin main',
]

const ease = [0.16, 1, 0.3, 1] as const

export function Hero({ ready }: { ready: boolean }) {
  const { name, email, social, resumeUrl, location, availability } = siteConfig
  const current = experiences.find((e) => e.current)
  const [first = name, ...rest] = name.split(' ')
  const last = rest.join(' ')

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yPanel = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const metrics = [
    { value: '30%', label: 'Azure cost cut', sub: 'American Express' },
    { value: '20+', label: 'Microservices → AKS', sub: 'Helm, zero-downtime' },
    { value: '1,300+', label: 'Hackathon, won', sub: 'Azure OpenAI + RAG' },
    { value: `${certifications.length}×`, label: 'Microsoft certified', sub: 'AZ-204 · AI-102' },
  ]

  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
    transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease },
  })

  return (
    <>
      <section
        ref={ref}
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16"
        aria-labelledby="hero-heading"
      >
        {/* Living cluster */}
        <motion.div
          style={{ scale: canvasScale }}
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_90%_75%_at_60%_40%,#000_35%,transparent_80%)]"
        >
          <ClusterCanvas />
        </motion.div>
        <div className="glow-top pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

        <Container className="flex flex-1 flex-col justify-center py-14 sm:py-20">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
              {/* starship-style prompt */}
              <motion.p
                {...reveal(0)}
                className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs sm:text-[13px]"
              >
                <span className="text-cyan">nishant@azure</span>
                <span className="text-subtle">in</span>
                <span className="text-foreground">~/portfolio</span>
                <span className="text-subtle">on</span>
                <span className="text-violet">⎇ main</span>
                <span className="text-subtle">via</span>
                <span className="text-accent">⎈ aks-prod</span>
                <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                  <span className="status-dot scale-75" aria-hidden="true" />
                  {availability || (current ? `live @ ${current.company}` : 'online')}
                </span>
              </motion.p>

              <h1
                id="hero-heading"
                className="text-[clamp(3.4rem,11vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.06em]"
              >
                <span className="block text-foreground">
                  <ScrambleText text={first} trigger={ready} duration={1000} delay={150} />
                </span>
                <span className="text-outline block">
                  <ScrambleText text={`${last}.`} trigger={ready} duration={1100} delay={350} />
                </span>
              </h1>

              <motion.p
                {...reveal(3)}
                className="mt-8 font-mono text-lg text-muted-foreground sm:text-xl"
              >
                <span className="text-accent">&gt;</span>{' '}
                <Typewriter words={roles} start={ready} className="text-foreground" />
              </motion.p>

              <motion.p
                {...reveal(4)}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]"
              >
                I ship AKS deployments with Helm, build Azure DevOps CI/CD pipelines, and keep
                production observable with Prometheus, Grafana and Azure Monitor. Currently at
                Grazitti Interactive, working on American Express infrastructure.
              </motion.p>

              <motion.div {...reveal(5)} className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a href={`mailto:${email}`} className={buttonClass('accent', 'lg', 'group')} data-cursor="mail">
                    <span className="font-mono text-xs opacity-70">$</span>
                    ./hire --now
                    <Icon name="arrow-right" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Magnetic>
                <Magnetic>
                  {resumeUrl ? (
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg')}>
                      <Icon name="download" size={16} />
                      Résumé
                    </a>
                  ) : (
                    <a href="#projects" className={buttonClass('secondary', 'lg')}>
                      View deployments
                    </a>
                  )}
                </Magnetic>
                <div className="flex items-center gap-1">
                  {social.github && (
                    <Magnetic strength={0.5}>
                      <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={buttonClass('ghost', 'icon')}>
                        <Icon name="github" size={18} />
                      </a>
                    </Magnetic>
                  )}
                  {social.linkedin && (
                    <Magnetic strength={0.5}>
                      <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={buttonClass('ghost', 'icon')}>
                        <Icon name="linkedin" size={18} />
                      </a>
                    </Magnetic>
                  )}
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: yPanel }} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <Tilt max={6}>
                <KubectlPanel start={ready} />
              </Tilt>
              <p className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-subtle">
                <Icon name="map-pin" size={12} />
                {location} · move your cursor over the mesh
              </p>
            </motion.div>
            </motion.div>
          </div>
        </Container>

        {/* Status bar metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.9 }}
          className="border-t border-border/80 bg-background/40 backdrop-blur-md"
        >
          <Container>
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`group py-6 pr-4 ${i % 2 === 1 ? 'pl-6' : ''} ${i > 0 ? 'lg:border-l lg:border-border lg:pl-6' : ''} ${i % 2 === 1 ? 'border-l border-border' : ''} ${i > 1 ? 'border-t border-border lg:border-t-0' : ''}`}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    {m.label}
                  </dt>
                  <dd className="mt-2 flex items-baseline gap-3">
                    <CountUp
                      value={m.value}
                      className="text-4xl font-semibold tracking-[-0.05em] text-foreground transition-colors duration-300 group-hover:text-accent sm:text-5xl"
                    />
                  </dd>
                  <dd className="mt-1 font-mono text-[11px] text-muted-foreground">{m.sub}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </motion.div>
      </section>

      {/* Crossing tape bands */}
      <div className="relative -my-4 h-36 select-none sm:h-44" aria-hidden="true">
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] border-y border-accent/40 bg-accent py-3 text-accent-foreground shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.6)]">
          <Marquee speed={55}>
            {stack.map((t) => (
              <span key={t} className="mx-5 flex items-center gap-5 font-mono text-sm font-semibold uppercase tracking-[0.12em]">
                {t}
                <span aria-hidden="true">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2deg] border-y border-border bg-card/90 py-3 backdrop-blur" aria-hidden="true">
          <Marquee speed={70} reverse>
            {[...commands, ...commands].map((t, i) => (
              <span key={i} className="mx-6 flex items-center gap-6 font-mono text-sm text-muted-foreground">
                <span className="text-accent">$</span> {t}
                <span className="text-subtle">//</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  )
}
