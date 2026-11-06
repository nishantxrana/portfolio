// ==========================================
// Experience Data
// Source: Resume (single source of truth)
// Format: Deployment log / Engineering milestones
// ==========================================

import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'grazitti-swe',
    title: 'Software Engineer – DevOps & Cloud',
    company: 'Grazitti Interactive',
    location: 'Haryana, India',
    period: 'Jan 2025 – Present',
    current: true,
    highlights: [
      {
        text: 'Reduced Azure infrastructure costs by 30% for American Express by identifying over-provisioned resources, migrating workloads from VMs to App Services, and helping migrate IIS-based schedulers to Function Apps.',
        metric: '30%',
      },
      {
        text: 'Deployed 20+ .NET microservices end-to-end to AKS using Helm, enabling high availability, version-controlled releases and zero-downtime rollbacks.',
        metric: '20+',
      },
      {
        text: 'Designed and automated CI/CD pipelines across Azure DevOps, GitLab CI/CD and Jenkins for multiple client environments.',
      },
      {
        text: 'Built cloud infrastructure with Terraform (IaC), delivering repeatable environments and eliminating manual configuration drift.',
      },
      {
        text: 'Optimized network routing and application scalability using Azure Application Gateway and Load Balancers.',
      },
      {
        text: 'Deployed Prometheus and Grafana and used Azure Monitor and Application Insights for full-stack observability, enabling proactive incident detection and faster resolution.',
      },
      {
        text: 'Created scheduled security audit reports across multiple Azure DevOps projects, covering exposed credentials, shared VM access and missing pipeline variables.',
      },
      {
        text: 'Built an AI meeting intelligence tool with Azure OpenAI, RAG and vector embeddings that turns transcripts into requirement documents, winning a company-wide hackathon (1,300+ employees, 6-hour sprint).',
        metric: '1,300+',
      },
    ],
    technologies: [
      'Azure DevOps',
      'GitLab CI/CD',
      'Jenkins',
      'AKS',
      'Helm',
      'Terraform',
      'Docker',
      '.NET',
      'Azure App Service',
      'Azure Functions',
      'Application Gateway',
      'Azure Monitor',
      'Application Insights',
      'Prometheus',
      'Grafana',
      'Azure OpenAI',
      'RAG',
    ],
  },
]
