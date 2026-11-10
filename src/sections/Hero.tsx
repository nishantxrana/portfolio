import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

const techLayers = [
  {
    name: 'application',
    tools: ['.NET', 'Node.js', 'React', 'Python'],
  },
  {
    name: 'platform',
    tools: ['Kubernetes', 'AKS', 'Docker', 'Helm'],
  },
  {
    name: 'infrastructure',
    tools: ['Azure', 'Terraform', 'App Service', 'Functions', 'App Gateway'],
  },
  {
    name: 'delivery',
    tools: ['Azure DevOps', 'GitLab CI', 'Jenkins', 'GitHub Actions'],
  },
  {
    name: 'observability',
    tools: ['Prometheus', 'Grafana', 'Azure Monitor', 'App Insights'],
  },
  {
    name: 'ai',
    tools: ['Azure OpenAI', 'AI Foundry', 'RAG'],
  },
] as const

function treeGlyph(index: number, total: number) {
  if (index === 0) return '┌─'
  if (index === total - 1) return '└─'
  return '├─'
}

export function Hero() {
  const { name, title, subtitle, email, social, resumeUrl, lastUpdated } =
    siteConfig
  const toolCount = techLayers.reduce(
    (acc, layer) => acc + layer.tools.length,
    0
  )

  return (
    <section className="relative pt-20">
      {/* Grid background */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* System header */}
        <div className="mb-10 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="text-accent">▲</span>
          <span>portfolio</span>
          <span className="text-border" aria-hidden="true">
            │
          </span>
          <span>last updated: {lastUpdated}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr,400px] lg:gap-16">
          {/* Left: Identity */}
          <div>
            <div className="mb-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                engineer.identity
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {name}
              </h1>
            </div>

            <div className="mb-8">
              <p className="font-mono text-lg text-accent sm:text-xl">
                {title}
              </p>
              <p className="mt-1 text-muted-foreground">{subtitle}</p>
            </div>

            <div className="mb-10 max-w-xl border-l-2 border-accent/30 pl-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Software Engineer (DevOps & Cloud) on Microsoft Azure. I ship
                AKS deployments with Helm, build Azure DevOps CI/CD pipelines,
                and monitor with Prometheus, Grafana and Azure Monitor.
                Currently at Grazitti Interactive, working on American Express
                infrastructure.
              </p>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="font-mono text-2xl text-foreground">30%</p>
                <p className="font-mono text-xs text-muted-foreground">
                  Azure cost reduction
                </p>
                <p className="font-mono text-2xs text-accent">
                  American Express infra
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl text-foreground">20+</p>
                <p className="font-mono text-xs text-muted-foreground">
                  .NET microservices
                </p>
                <p className="font-mono text-2xs text-accent">on AKS via Helm</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-foreground">CI/CD</p>
                <p className="font-mono text-xs text-muted-foreground">
                  multi-platform pipelines
                </p>
                <p className="font-mono text-2xs text-accent">
                  ado · gitlab · jenkins · gha
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded border border-accent bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
              >
                <span className="text-muted-foreground">$</span>
                connect --email
              </a>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                >
                  <span className="text-accent">$</span>
                  download --resume
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                >
                  <span className="text-accent">$</span>
                  view --github
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                >
                  <span className="text-accent">$</span>
                  view --linkedin
                </a>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-border bg-card/50 p-6">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  tech.stack
                </span>
              </div>

              <div className="space-y-4">
                {techLayers.map((layer, index) => (
                  <div key={layer.name} className="relative">
                    <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-cyan">
                      {treeGlyph(index, techLayers.length)} {layer.name}
                    </p>
                    <div className="ml-4 flex flex-wrap gap-2">
                      {layer.tools.map((tool) => (
                        <span key={tool} className="tech-tag">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>{techLayers.length} layers</span>
                  <span>{toolCount} tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href="#experience"
            className="scroll-cue flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            <span>scroll.down()</span>
            <Icon name="arrow-right" size={14} className="rotate-90" />
          </a>
        </div>
      </div>
    </section>
  )
}
