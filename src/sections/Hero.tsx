import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Hero() {
  const { name, title, subtitle, email, social } = siteConfig

  return (
    <section className="relative min-h-screen pt-20">
      {/* Grid background - softer */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* System header - more subtle */}
        <div className="mb-16 flex items-center gap-3 font-mono text-xs text-muted-foreground/60">
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

        <div className="grid gap-16 lg:grid-cols-[1fr,380px] lg:gap-20">
          {/* Left: Identity */}
          <div>
            {/* Name */}
            <div className="mb-8">
              <p className="section-label mb-3">
                engineer.identity
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {name}
              </h1>
            </div>

            {/* Role - typography hierarchy, not color */}
            <div className="mb-10">
              <p className="text-xl font-medium text-foreground/90 sm:text-2xl">{title}</p>
              <p className="mt-1 text-muted-foreground">{subtitle}</p>
            </div>

            {/* Mission - softer containment */}
            <div className="mb-12 max-w-xl border-l border-border pl-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Building production systems that scale. Shipping CI/CD pipelines, 
                Kubernetes deployments, and infrastructure automation. 
                Reducing costs, improving observability, and making deployments boring.
              </p>
            </div>

            {/* Metrics - weight emphasis, not color */}
            <div className="mb-12 grid grid-cols-3 gap-8">
              <div>
                <p className="metric-value">~30%</p>
                <p className="metric-label">cost reduction</p>
                <p className="mt-1 font-mono text-2xs text-muted-foreground/60">amex infra</p>
              </div>
              <div>
                <p className="metric-value">~70%</p>
                <p className="metric-label">alert reduction</p>
                <p className="mt-1 font-mono text-2xs text-muted-foreground/60">via automation</p>
              </div>
              <div>
                <p className="metric-value">AKS</p>
                <p className="metric-label">prod deploys</p>
                <p className="mt-1 font-mono text-2xs text-muted-foreground/60">helm + gitops</p>
              </div>
            </div>

            {/* Actions - primary CTA gets accent, rest are neutral */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded border border-accent bg-accent/10 px-4 py-2.5 font-mono text-sm text-accent transition-all hover:bg-accent/20"
              >
                <span className="text-accent/60">$</span>
                connect --email
              </a>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border/60 px-4 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-border hover:text-foreground"
                >
                  view --github
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border/60 px-4 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-border hover:text-foreground"
                >
                  view --linkedin
                </a>
              )}
            </div>
          </div>

          {/* Right: Tech stack - softer containment */}
          <div className="relative">
            <div className="rounded-lg bg-card/60 p-6">
              {/* Header - minimal */}
              <div className="mb-6 flex items-center justify-between pb-4">
                <span className="section-label">
                  tech.stack
                </span>
                <span className="font-mono text-xs text-muted-foreground/50">v2025.1</span>
              </div>

              {/* Stack layers - neutral tags */}
              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/60">
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
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/60">
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
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/60">
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
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/60">
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
                  <p className="mb-2 font-mono text-2xs text-muted-foreground/60">
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

              {/* Footer - very subtle */}
              <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4 font-mono text-xs text-muted-foreground/50">
                <span>5 layers</span>
                <span>20+ tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - subtle */}
        <div className="mt-20 flex justify-center">
          <a
            href="#experience"
            className="flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            <span>scroll</span>
            <Icon name="arrow-right" size={12} className="rotate-90" />
          </a>
        </div>
      </div>
    </section>
  )
}
