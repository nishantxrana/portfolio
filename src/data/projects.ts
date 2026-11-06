// ==========================================
// Projects Data
// Source: Resume (single source of truth)
// Format: Architecture case studies
// ==========================================

import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'insightops',
    title: 'InsightOps',
    description:
      'AI-powered DevOps monitoring platform on Azure App Service giving a 120-person engineering org real-time pipeline visibility; Azure AI Foundry agents diagnose failures and alert Google Chat.',
    techStack: [
      'Node.js',
      'React',
      'Azure DevOps REST API',
      'Docker',
      'Azure App Service',
      'Azure AI Foundry',
    ],
    highlights: [
      'Real-time Azure DevOps pipeline visibility for a 120-person engineering org',
      'Azure AI Foundry agents diagnose pipeline failures',
      'Automated failure alerts to Google Chat',
    ],
    status: 'internal',
    stat: {
      value: '120',
      label: 'engineers served',
    },
    links: {
      github: 'https://github.com/nishantxrana/insightops',
    },
  },
  {
    id: 'azure-devops-mcp-gateway',
    title: 'Azure DevOps MCP Gateway',
    description:
      'Multi-organization gateway on Azure App Service with secrets in Azure Key Vault, letting Copilot Studio agents read pull requests, pipelines and work items.',
    techStack: [
      'Azure DevOps MCP',
      'Azure App Service',
      'Azure Key Vault',
      'Copilot Studio',
    ],
    highlights: [
      'Multi-organization Azure DevOps gateway on Azure App Service',
      'Secrets stored in Azure Key Vault',
      'Exposes pull requests, pipelines and work items to Copilot Studio agents',
    ],
    status: 'internal',
    stat: {
      value: '3',
      label: 'resource types exposed',
    },
  },
  {
    id: 'tooldock',
    title: 'ToolDock',
    description:
      'Open-source, browser-only toolkit with 11 tools to compare, export and import Azure DevOps variable groups and release variables.',
    techStack: ['React', 'TypeScript', 'Vite', 'ExcelJS'],
    highlights: [
      'Browser-only toolkit — no backend required',
      '11 tools for Azure DevOps variable groups and release variables',
      'Compare, export and import variable data',
    ],
    status: 'open-source',
    stat: {
      value: '11',
      label: 'tools',
    },
    links: {
      github: 'https://github.com/nishantxrana/tooldock',
    },
  },
]
