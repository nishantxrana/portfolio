// ==========================================
// Experience Data
// Source: RESUME.md
// Format: Deployment log / Engineering milestones
// ==========================================

import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'grazitti-swe',
    title: 'Software Engineer',
    company: 'Grazitti Interactive',
    location: 'Haryana, India',
    period: 'Jan 2025 – Present',
    current: true,
    highlights: [
      'Designed CI/CD pipelines using Azure DevOps, GitLab CI/CD, and Jenkins — streamlined deployments across multiple environments.',
      'Deployed containerized applications on AKS using Helm — zero-downtime deployments with automated rollbacks.',
      'Reduced cloud costs by ~30% for AMEX by migrating VMs → Azure App Services and schedulers → Function Apps.',
      'Automated infrastructure provisioning with Terraform — consistent environments, reduced manual configuration by ~70%.',
      'Configured Azure Application Gateway and Load Balancers — improved routing and scalability for production workloads.',
      'Integrated Prometheus + Grafana + App Insights — end-to-end observability with proactive alerting.',
    ],
    technologies: [
      'Azure DevOps',
      'GitLab CI/CD',
      'Jenkins',
      'Kubernetes (AKS)',
      'Helm',
      'Terraform',
      'Docker',
      'Azure App Service',
      'Azure Functions',
      'Prometheus',
      'Grafana',
      'Application Insights',
    ],
  },
]
