const systemLayers = [
  {
    id: 'runtime',
    name: 'Runtime',
    description: 'Application layer',
    items: ['JavaScript', 'Python', 'Node.js', 'React.js'],
  },
  {
    id: 'platform',
    name: 'Platform',
    description: 'Container orchestration',
    items: ['Docker', 'Kubernetes (AKS)', 'Helm', 'Azure Container Registry'],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Cloud resources',
    items: [
      'Microsoft Azure',
      'Azure App Service',
      'Azure Functions',
      'Azure SQL',
      'Azure Storage',
      'Terraform',
    ],
  },
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'CI/CD pipelines',
    items: ['Azure DevOps', 'GitLab CI/CD', 'GitHub Actions', 'Jenkins'],
  },
  {
    id: 'observability',
    name: 'Observability',
    description: 'Monitoring & alerts',
    items: ['Prometheus', 'Grafana', 'Azure Monitor', 'Application Insights'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative bg-section-alt py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex items-center gap-4">
          <h2 className="section-label">
            system.map
          </h2>
          <div className="h-px flex-1 bg-border/40" />
          <span className="font-mono text-xs text-muted-foreground/50">
            {systemLayers.length} layers
          </span>
        </div>

        {/* System layers - simplified, typography-driven */}
        <div className="space-y-10">
          {systemLayers.map((layer, index) => (
            <div
              key={layer.id}
              className="grid gap-4 md:grid-cols-[200px,1fr] md:gap-8"
            >
              {/* Layer info */}
              <div className="flex items-baseline gap-3 md:justify-end md:text-right">
                <span className="font-mono text-xs text-muted-foreground/40">
                  {String(index).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-mono text-sm font-medium text-foreground">
                    {layer.name}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground/60">
                    {layer.description}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats - understated */}
        <div className="mt-16 grid grid-cols-3 gap-4 border-t border-border/30 pt-8 text-center">
          <div>
            <p className="metric-value">
              {systemLayers.reduce((acc, l) => acc + l.items.length, 0)}+
            </p>
            <p className="metric-label">technologies</p>
          </div>
          <div>
            <p className="metric-value">{systemLayers.length}</p>
            <p className="metric-label">system layers</p>
          </div>
          <div>
            <p className="metric-value text-accent">∞</p>
            <p className="metric-label">learning</p>
          </div>
        </div>
      </div>
    </section>
  )
}
