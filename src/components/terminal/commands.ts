import { siteConfig } from '@/config'

export type CommandOutput = {
  type: 'text' | 'ascii' | 'list' | 'error' | 'link'
  content: string
  items?: string[]
  url?: string
}

const { name, title, subtitle, email, social, resumeUrl } = siteConfig

export const commands: Record<string, CommandOutput> = {
  help: {
    type: 'list',
    content: 'Available commands:',
    items: [
      'whoami        — about me',
      'experience    — work history',
      'projects      — view projects',
      'skills        — technical skills',
      'certs         — certifications',
      'connect       — contact information',
      'resume        — download resume',
      'clear         — clear terminal',
      'help          — show this message',
    ],
  },

  whoami: {
    type: 'text',
    content: `
┌─────────────────────────────────────────────────────────────┐
│  ${name}
│  ${title}
│  ${subtitle}
├─────────────────────────────────────────────────────────────┤
│
│  Building production systems that scale.
│  Shipping CI/CD pipelines, Kubernetes deployments,
│  and infrastructure automation.
│
│  Key metrics:
│  • Reduced cloud costs by ~30% for AMEX infrastructure
│  • Cut alert noise by ~70% via automation
│  • Production AKS deployments with Helm + GitOps
│
│  Currently: Software Engineer @ Grazitti Interactive
│  Status: Open to opportunities
│
└─────────────────────────────────────────────────────────────┘
`,
  },

  experience: {
    type: 'text',
    content: `
┌─ DEPLOYMENT LOG ────────────────────────────────────────────┐
│
│  [CURRENT] Software Engineer
│  @grazitti-interactive | Haryana, India
│  Jan 2025 – Present
│
│  Deployments:
│  ────────────
│  → Designed CI/CD pipelines (Azure DevOps, GitLab, Jenkins)
│  → Deployed containers on AKS with Helm — zero-downtime
│  → Reduced cloud costs ~30% for AMEX (VMs → App Services)
│  → Automated infra with Terraform — ~70% less manual work
│  → Integrated Prometheus + Grafana + App Insights
│  → Configured Azure App Gateway & Load Balancers
│
│  Stack:
│  ──────
│  Azure DevOps | GitLab CI | Kubernetes | Helm | Terraform
│  Docker | Azure Functions | Prometheus | Grafana
│
└─────────────────────────────────────────────────────────────┘
`,
  },

  projects: {
    type: 'text',
    content: `
┌─ ARCHITECTURE REGISTRY ─────────────────────────────────────┐
│
│  [01] InsightOps
│  ────────────────
│  AI-powered DevOps monitoring platform
│
│  Problem: Manual pipeline monitoring is time-consuming
│  Solution: Real-time insights + AI failure analysis
│  Impact: ~70% reduction in monitoring overhead
│
│  Stack: Node.js | React | Azure DevOps API | OpenAI | Docker
│  Source: github.com/nishantxrana/insightops
│
│  ─────────────────────────────────────────────────────────
│
│  [02] OpenPost
│  ─────────────
│  Full-stack blog platform
│
│  Problem: Need a customizable blog with admin controls
│  Solution: MERN stack with Google OAuth + RBAC
│  Features: Search, pagination, dark mode, user management
│
│  Stack: React | Redux | Node.js | Express | MongoDB
│  Source: github.com/nishantxrana/OpenPost
│
└─────────────────────────────────────────────────────────────┘

Type 'open insightops' or 'open openpost' to view on GitHub.
`,
  },

  skills: {
    type: 'text',
    content: `
┌─ SYSTEM MAP ────────────────────────────────────────────────┐
│
│  ┌─ Layer 0: APPLICATION
│  │   JavaScript, Python, Node.js, React.js
│  │
│  ├─ Layer 1: PLATFORM
│  │   Docker, Kubernetes (AKS), Helm, Azure Container Registry
│  │
│  ├─ Layer 2: INFRASTRUCTURE
│  │   Microsoft Azure, Terraform, App Service, Functions
│  │   Azure SQL, Storage Accounts, Application Gateway
│  │
│  ├─ Layer 3: DELIVERY
│  │   Azure DevOps, GitLab CI/CD, GitHub Actions, Jenkins
│  │
│  └─ Layer 4: OBSERVABILITY
│      Prometheus, Grafana, Azure Monitor, Application Insights
│
│  Total: 20+ technologies across 5 system layers
│
└─────────────────────────────────────────────────────────────┘
`,
  },

  certs: {
    type: 'text',
    content: `
┌─ CERTIFICATIONS ────────────────────────────────────────────┐
│
│  ┌──────────┐
│  │    MS    │  Microsoft Certified: Azure Developer Associate
│  └──────────┘  Issued: May 2025
│
│  ┌──────────┐
│  │    MS    │  Microsoft Certified: Azure AI Engineer Associate
│  └──────────┘  Issued: May 2025
│
│  ─────────────────────────────────────────────────────────
│
│  Education:
│  B.Tech Computer Science & Engineering
│  Chandigarh Engineering College | 2020-2024
│  CGPA: 8.12 / 10
│
└─────────────────────────────────────────────────────────────┘
`,
  },

  connect: {
    type: 'text',
    content: `
┌─ CONNECTION INTERFACE ──────────────────────────────────────┐
│
│  $ echo $EMAIL
│  ${email}
│
│  $ echo $GITHUB
│  ${social.github || 'not set'}
│
│  $ echo $LINKEDIN
│  ${social.linkedin || 'not set'}
│
│  ─────────────────────────────────────────────────────────
│
│  STATUS: Available for opportunities
│
│  Preferred contact: Email
│  Response time: Usually within 24 hours
│
└─────────────────────────────────────────────────────────────┘

Type 'email' to compose, or 'github' / 'linkedin' to open.
`,
  },

  resume: {
    type: 'link',
    content: resumeUrl
      ? `Opening resume...\n\nIf it doesn't open, visit:\n${resumeUrl}`
      : 'Resume URL not configured.',
    url: resumeUrl || undefined,
  },

  email: {
    type: 'link',
    content: `Opening email client for ${email}...`,
    url: `mailto:${email}`,
  },

  github: {
    type: 'link',
    content: social.github
      ? `Opening GitHub profile...`
      : 'GitHub not configured.',
    url: social.github || undefined,
  },

  linkedin: {
    type: 'link',
    content: social.linkedin
      ? `Opening LinkedIn profile...`
      : 'LinkedIn not configured.',
    url: social.linkedin || undefined,
  },

  'open insightops': {
    type: 'link',
    content: 'Opening InsightOps repository...',
    url: 'https://github.com/nishantxrana/insightops',
  },

  'open openpost': {
    type: 'link',
    content: 'Opening OpenPost repository...',
    url: 'https://github.com/nishantxrana/OpenPost',
  },

  // Easter eggs
  sudo: {
    type: 'text',
    content: `
┌─────────────────────────────────────────────────────────────┐
│  Nice try. No root access here.                             │
│  But I appreciate the curiosity.                            │
└─────────────────────────────────────────────────────────────┘
`,
  },

  vim: {
    type: 'text',
    content: `
┌─────────────────────────────────────────────────────────────┐
│  :q! to exit. You're welcome.                               │
└─────────────────────────────────────────────────────────────┘
`,
  },

  ls: {
    type: 'list',
    content: 'Contents of ~/portfolio:',
    items: [
      'whoami.txt',
      'experience.log',
      'projects/',
      'skills.tree',
      'certs.md',
      'connect.sh',
      'resume.pdf',
    ],
  },

  pwd: {
    type: 'text',
    content: '/home/nishant/portfolio',
  },

  date: {
    type: 'text',
    content: new Date().toString(),
  },

  echo: {
    type: 'text',
    content: 'Usage: echo <message>',
  },

  cat: {
    type: 'text',
    content: `Usage: cat <file>

Try:
  cat whoami.txt
  cat experience.log
  cat skills.tree`,
  },

  'cat whoami.txt': {
    type: 'text',
    content: `${name}\n${title}\n${subtitle}`,
  },

  neofetch: {
    type: 'ascii',
    content: `
       ████████████           nishant@portfolio
     ██            ██         -----------------
   ██    ██████    ██         OS: DevOps Engineer
   ██  ██████████  ██         Host: Grazitti Interactive
   ██  ██████████  ██         Kernel: Cloud-Native
   ██  ██████████  ██         Shell: Azure DevOps + GitLab CI
   ██    ██████    ██         DE: Kubernetes (AKS)
     ██            ██         WM: Terraform
       ████████████           Terminal: This portfolio
                              CPU: Always learning
                              Memory: 20+ technologies loaded
`,
  },
}

