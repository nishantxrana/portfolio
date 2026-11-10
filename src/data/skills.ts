// ==========================================
// Skills Data
// Source: Resume (single source of truth)
// ==========================================

import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Microsoft Azure services',
    accent: 'accent',
    skills: [
      'Microsoft Azure',
      'AKS',
      'App Service',
      'Function Apps',
      'Virtual Machines',
      'VNets',
      'NSG',
      'Load Balancers',
      'Application Gateway',
      'Azure Key Vault',
      'Azure SQL',
      'Storage Accounts',
    ],
  },
  {
    id: 'iac-containers',
    name: 'IaC & Containers',
    description: 'Infrastructure and orchestration',
    accent: 'cyan',
    skills: [
      'Terraform',
      'Infrastructure as Code (IaC)',
      'Docker',
      'Kubernetes',
      'Helm',
    ],
  },
  {
    id: 'cicd-tooling',
    name: 'CI/CD & Tooling',
    description: 'Pipelines and delivery',
    accent: 'amber',
    skills: [
      'CI/CD',
      'Azure DevOps (YAML pipelines, Repos, Artifacts)',
      'Azure Pipelines',
      'GitHub Actions',
      'GitLab CI/CD',
      'Jenkins',
      'Git',
      'MSBuild',
      'Jira',
    ],
  },
  {
    id: 'monitoring-scripting',
    name: 'Monitoring & Scripting',
    description: 'Observability and automation',
    accent: 'accent',
    skills: [
      'Azure Monitor',
      'Application Insights',
      'Prometheus',
      'Grafana',
      'Bash',
      'PowerShell',
      'Python',
    ],
  },
  {
    id: 'ai-web',
    name: 'AI & Web',
    description: 'AI platforms and application stack',
    accent: 'cyan',
    skills: [
      'Azure OpenAI',
      'Azure AI Foundry',
      'RAG',
      'Vector Embeddings',
      '.NET',
      'Node.js',
      'React.js',
      'REST APIs',
    ],
  },
]
