export interface CanvasNodeData {
  id: string
  type: 'core' | 'layer' | 'experience' | 'project' | 'contact'
  label: string
  x: number
  y: number
  sublabel?: string
  items?: string[]
  description?: string
  highlights?: string[]
  links?: { label: string; url: string }[]
  meta?: Record<string, string>
}

// Node positions relative to center (0, 0)
export const canvasNodes: CanvasNodeData[] = [
  // Core identity - center
  {
    id: 'core',
    type: 'core',
    label: 'Nishant Rana',
    sublabel: 'Software Engineer',
    x: 0,
    y: 0,
    description: 'Building production systems that scale. Shipping CI/CD pipelines, Kubernetes deployments, and infrastructure automation.',
    highlights: [
      '~30% cloud cost reduction for AMEX',
      '~70% alert noise reduction via automation',
      'Production AKS with Helm + GitOps',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/nishantxrana' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/nishantxrana' },
    ],
  },

  // System layers - surrounding the core
  {
    id: 'observability',
    type: 'layer',
    label: 'Observability',
    sublabel: 'Layer 4',
    x: 0,
    y: -280,
    items: ['Prometheus', 'Grafana', 'Azure Monitor', 'Application Insights'],
    description: 'Monitoring, alerting, and system visibility across the stack.',
  },
  {
    id: 'delivery',
    type: 'layer',
    label: 'Delivery',
    sublabel: 'Layer 3',
    x: -350,
    y: -140,
    items: ['Azure DevOps', 'GitLab CI/CD', 'GitHub Actions', 'Jenkins'],
    description: 'CI/CD pipelines for continuous deployment and release automation.',
  },
  {
    id: 'platform',
    type: 'layer',
    label: 'Platform',
    sublabel: 'Layer 2',
    x: -350,
    y: 140,
    items: ['Kubernetes (AKS)', 'Docker', 'Helm', 'Azure Container Registry'],
    description: 'Container orchestration and platform services.',
  },
  {
    id: 'infrastructure',
    type: 'layer',
    label: 'Infrastructure',
    sublabel: 'Layer 1',
    x: 0,
    y: 280,
    items: ['Microsoft Azure', 'Terraform', 'App Service', 'Azure Functions', 'Azure SQL'],
    description: 'Cloud resources and infrastructure-as-code.',
  },
  {
    id: 'runtime',
    type: 'layer',
    label: 'Runtime',
    sublabel: 'Layer 0',
    x: 0,
    y: 420,
    items: ['JavaScript', 'Python', 'Node.js', 'React.js'],
    description: 'Application layer technologies and frameworks.',
  },

  // Experience cluster - right side
  {
    id: 'experience',
    type: 'experience',
    label: 'Experience',
    sublabel: 'Grazitti Interactive',
    x: 350,
    y: 140,
    description: 'Software Engineer | Jan 2025 – Present',
    highlights: [
      'Designed CI/CD pipelines for multiple enterprise clients',
      'Deployed containerized apps on AKS with zero-downtime releases',
      'Reduced cloud costs by ~30% migrating VMs to App Services',
      'Automated infrastructure provisioning with Terraform',
      'Integrated observability stack: Prometheus + Grafana + App Insights',
    ],
    meta: {
      location: 'Haryana, India',
      status: 'Current',
    },
  },

  // Project clusters - upper right
  {
    id: 'insightops',
    type: 'project',
    label: 'InsightOps',
    sublabel: 'AI DevOps Platform',
    x: 400,
    y: -200,
    description: 'Real-time DevOps pipeline monitoring with AI-powered failure analysis.',
    highlights: [
      'Live pipeline status dashboard',
      'AI failure root cause analysis',
      '~70% reduction in monitoring overhead',
    ],
    items: ['Node.js', 'React', 'Azure DevOps API', 'OpenAI', 'Docker'],
    links: [
      { label: 'GitHub', url: 'https://github.com/nishantxrana/insightops' },
    ],
  },
  {
    id: 'openpost',
    type: 'project',
    label: 'OpenPost',
    sublabel: 'Blog Platform',
    x: 500,
    y: -60,
    description: 'Full-stack blog platform with admin dashboard and user management.',
    highlights: [
      'Google OAuth authentication',
      'Role-based access control',
      'Search, pagination, dark mode',
    ],
    items: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    links: [
      { label: 'GitHub', url: 'https://github.com/nishantxrana/OpenPost' },
    ],
  },

  // Contact - bottom
  {
    id: 'contact',
    type: 'contact',
    label: 'Connect',
    sublabel: 'Interface',
    x: 0,
    y: 560,
    description: 'Available for opportunities and collaboration.',
    links: [
      { label: 'Email', url: 'mailto:nishantrana.me@gmail.com' },
      { label: 'Resume', url: 'https://drive.google.com/file/d/1vcIUFNDL8n3VeBxm_0AwLI3VXUkI0cax/view' },
    ],
    meta: {
      status: 'Open to opportunities',
      response: 'Usually within 24 hours',
    },
  },
]

// Connections between nodes
export const nodeConnections = [
  // Core to layers
  { from: 'core', to: 'observability' },
  { from: 'core', to: 'delivery' },
  { from: 'core', to: 'platform' },
  { from: 'core', to: 'infrastructure' },
  { from: 'core', to: 'experience' },
  
  // Layer chain
  { from: 'infrastructure', to: 'runtime' },
  { from: 'runtime', to: 'contact' },
  
  // Experience to layers
  { from: 'experience', to: 'delivery' },
  { from: 'experience', to: 'platform' },
  
  // Projects
  { from: 'core', to: 'insightops' },
  { from: 'core', to: 'openpost' },
  { from: 'insightops', to: 'observability' },
]

