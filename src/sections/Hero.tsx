import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Hero() {
  const { name, title, subtitle, email, social } = siteConfig

  return (
    <section className="relative min-h-screen pt-20">
      {/* Grid background - lighter touch */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Status bar */}
        <div className="mb-12 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="text-accent">▲</span>
          <span>system status</span>
          <span className="text-border">│</span>
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-accent">operational</span>
          </span>
          <span className="text-border">│</span>
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr,380px] lg:gap-24">
          {/* Left: Identity */}
          <div>
            {/* Name - confident, dominant */}
            <div className="mb-10">
              <p className="section-label mb-4">
                engineer.identity
              </p>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                {name}
              </h1>
            </div>

            {/* Role */}
            <div className="mb-10">
              <p className="text-xl font-medium text-foreground sm:text-2xl">{title}</p>
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            </div>

            {/* Mission */}
            <div className="mb-14 max-w-xl border-l-2 border-border pl-5">
              <p className="text-base leading-relaxed text-muted-foreground">
                Building production systems that scale. Shipping CI/CD pipelines, 
                Kubernetes deployments, and infrastructure automation. 
                Reducing costs, improving observability, and making deployments boring.
              </p>
            </div>

            {/* Metrics */}
            <div className="mb-14 grid grid-cols-3 gap-8">
              <div>
                <p className="metric-value">~30%</p>
                <p className="metric-label">cost reduction</p>
                <p className="mt-1.5 font-mono text-2xs text-muted-foreground/70">amex infra</p>
              </div>
              <div>
                <p className="metric-value">~70%</p>
                <p className="metric-label">alert reduction</p>
                <p className="mt-1.5 font-mono text-2xs text-muted-foreground/70">via automation</p>
              </div>
              <div>
                <p className="metric-value">AKS</p>
                <p className="metric-label">prod deploys</p>
                <p className="mt-1.5 font-mono text-2xs text-muted-foreground/70">helm + gitops</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-all hover:bg-accent/15"
              >
                <span className="text-accent/70">$</span>
                connect --email
              </a>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-border-highlight hover:text-foreground"
                >
                  view --github
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-border-highlight hover:text-foreground"
                >
                  view --linkedin
                </a>
              )}
            </div>
          </div>

          {/* Right: Tech stack */}
          <div className="relative">
            <div className="rounded-lg bg-card p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <span className="section-label">
                  tech.stack
                </span>
                <span className="font-mono text-xs text-muted-foreground/60">v2025.1</span>
              </div>

              {/* Stack layers */}
              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/70">
                    ┌─ application
                  </p>
                  <div className="ml-3 flex flex-wrap gap-1.5">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">JavaScript</span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/70">
                    ├─ platform
                  </p>
                  <div className="ml-3 flex flex-wrap gap-1.5">
                    <span className="tech-tag">Kubernetes</span>
                    <span className="tech-tag">Docker</span>
                    <span className="tech-tag">Helm</span>
                    <span className="tech-tag">AKS</span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/70">
                    ├─ infrastructure
                  </p>
                  <div className="ml-3 flex flex-wrap gap-1.5">
                    <span className="tech-tag">Azure</span>
                    <span className="tech-tag">Terraform</span>
                    <span className="tech-tag">App Service</span>
                    <span className="tech-tag">Functions</span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/70">
                    ├─ delivery
                  </p>
                  <div className="ml-3 flex flex-wrap gap-1.5">
                    <span className="tech-tag">Azure DevOps</span>
                    <span className="tech-tag">GitLab CI</span>
                    <span className="tech-tag">Jenkins</span>
                    <span className="tech-tag">GitHub Actions</span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/70">
                    └─ observability
                  </p>
                  <div className="ml-3 flex flex-wrap gap-1.5">
                    <span className="tech-tag">Prometheus</span>
                    <span className="tech-tag">Grafana</span>
                    <span className="tech-tag">App Insights</span>
                    <span className="tech-tag">Azure Monitor</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 font-mono text-xs text-muted-foreground/60">
                <span>5 layers</span>
                <span>20+ tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 flex justify-center">
          <a
            href="#experience"
            className="flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>scroll</span>
            <Icon name="arrow-right" size={12} className="rotate-90" />
          </a>
        </div>
      </div>
    </section>
  )
}
