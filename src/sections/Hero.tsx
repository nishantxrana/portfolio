import { siteConfig } from '@/config'
import { Icon } from '@/components/ui'

export function Hero() {
  const { name, title, subtitle, email, social } = siteConfig

  return (
    <section className="relative min-h-screen pt-20">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* System header */}
        <div className="mb-12 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="text-accent">▲</span>
          <span>system status</span>
          <span className="text-border">│</span>
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-accent">operational</span>
          </span>
          <span className="text-border">│</span>
          <span>last updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr,400px] lg:gap-16">
          {/* Left: Identity */}
          <div>
            {/* Name as system identifier */}
            <div className="mb-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                engineer.identity
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {name}
              </h1>
            </div>

            {/* Role */}
            <div className="mb-8">
              <p className="font-mono text-lg text-accent sm:text-xl">{title}</p>
              <p className="mt-1 text-muted-foreground">{subtitle}</p>
            </div>

            {/* Mission statement - dense, not fluffy */}
            <div className="mb-10 max-w-xl border-l-2 border-accent/30 pl-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Building production systems that scale. Shipping CI/CD pipelines, 
                Kubernetes deployments, and infrastructure automation. 
                Reducing costs, improving observability, and making deployments boring.
              </p>
            </div>

            {/* Quick stats - metrics first */}
            <div className="mb-10 grid grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-2xl text-foreground">~30%</p>
                <p className="font-mono text-xs text-muted-foreground">cost reduction</p>
                <p className="font-mono text-2xs text-accent">for amex infra</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-foreground">~70%</p>
                <p className="font-mono text-xs text-muted-foreground">alert reduction</p>
                <p className="font-mono text-2xs text-accent">via automation</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-foreground">AKS</p>
                <p className="font-mono text-xs text-muted-foreground">prod deployments</p>
                <p className="font-mono text-2xs text-accent">helm + gitops</p>
              </div>
            </div>

            {/* Actions - terminal style */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded border border-accent bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
              >
                <span className="text-muted-foreground">$</span>
                connect --email
              </a>
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

          {/* Right: System diagram / Tech stack visualization */}
          <div className="relative">
            <div className="rounded-lg border border-border bg-card/50 p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  tech.stack
                </span>
                <span className="font-mono text-xs text-accent">v2025.1</span>
              </div>

              {/* Stack layers */}
              <div className="space-y-4">
                {/* Layer: Application */}
                <div className="relative">
                  <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-cyan">
                    ┌─ application
                  </p>
                  <div className="ml-4 flex flex-wrap gap-2">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">JavaScript</span>
                  </div>
                </div>

                {/* Layer: Platform */}
                <div className="relative">
                  <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-cyan">
                    ├─ platform
                  </p>
                  <div className="ml-4 flex flex-wrap gap-2">
                    <span className="tech-tag">Kubernetes</span>
                    <span className="tech-tag">Docker</span>
                    <span className="tech-tag">Helm</span>
                    <span className="tech-tag">AKS</span>
                  </div>
                </div>

                {/* Layer: Infrastructure */}
                <div className="relative">
                  <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-cyan">
                    ├─ infrastructure
                  </p>
                  <div className="ml-4 flex flex-wrap gap-2">
                    <span className="tech-tag">Azure</span>
                    <span className="tech-tag">Terraform</span>
                    <span className="tech-tag">App Service</span>
                    <span className="tech-tag">Functions</span>
                  </div>
                </div>

                {/* Layer: Delivery */}
                <div className="relative">
                  <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-cyan">
                    ├─ delivery
                  </p>
                  <div className="ml-4 flex flex-wrap gap-2">
                    <span className="tech-tag">Azure DevOps</span>
                    <span className="tech-tag">GitLab CI</span>
                    <span className="tech-tag">Jenkins</span>
                    <span className="tech-tag">GitHub Actions</span>
                  </div>
                </div>

                {/* Layer: Observability */}
                <div className="relative">
                  <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-cyan">
                    └─ observability
                  </p>
                  <div className="ml-4 flex flex-wrap gap-2">
                    <span className="tech-tag">Prometheus</span>
                    <span className="tech-tag">Grafana</span>
                    <span className="tech-tag">App Insights</span>
                    <span className="tech-tag">Azure Monitor</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>5 layers</span>
                  <span>20+ tools</span>
                  <span className="text-accent">production-ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#experience"
            className="flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            <span>scroll.down()</span>
            <Icon name="arrow-right" size={14} className="rotate-90" />
          </a>
        </div>
      </div>
    </section>
  )
}
