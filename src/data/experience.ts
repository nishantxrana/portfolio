// ==========================================
// Experience Data
// Source: RESUME.md
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
      'Designed and automated CI/CD pipelines using Azure DevOps, GitLab CI/CD, and Jenkins, streamlining build, test, and deployment workflows across multiple environments.',
      'Deployed and managed containerized applications on Azure Kubernetes Service (AKS) using Helm, ensuring high availability, version control, and seamless rollbacks.',
      'Reduced cloud infrastructure costs by ~30% for American Express (AMEX) by identifying over-provisioned resources and migrating workloads from VMs to Azure App Services and Function Apps.',
      'Automated infrastructure provisioning using Terraform, enabling consistent, repeatable environments and reducing manual configuration effort.',
      'Configured and optimized Azure Application Gateway, Load Balancers, and Logic Apps to improve routing, automation, and scalability.',
      'Integrated Application Insights, Prometheus, and Grafana for end-to-end monitoring and observability, enabling proactive performance tracking and faster incident response.',
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
    ],
  },
]

