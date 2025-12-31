// ==========================================
// Skills Data
// Source: RESUME.md
// ==========================================

import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages & Frameworks',
    skills: ['JavaScript', 'Python', 'React.js', 'Node.js'],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    skills: [
      'Microsoft Azure',
      'Azure DevOps',
      'Docker',
      'Kubernetes (AKS)',
      'Terraform',
      'Jenkins',
      'GitHub Actions',
      'GitLab CI/CD',
    ],
  },
  {
    id: 'azure-services',
    name: 'Azure Services',
    skills: [
      'Azure App Service',
      'Azure Function Apps',
      'Azure Storage Accounts',
      'Azure SQL Database',
      'Azure Logic Apps',
      'Azure Application Gateway',
    ],
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Observability',
    skills: ['Azure Monitor', 'Application Insights', 'Prometheus', 'Grafana'],
  },
]

