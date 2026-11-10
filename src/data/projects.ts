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
      'AI-powered DevOps monitoring platform on Azure App Service for a 120-person engineering org—real-time pipeline visibility with failure diagnosis and chat alerts.',
    techStack: [
      'Node.js',
      'React',
      'Azure DevOps REST API',
      'Docker',
      'Azure App Service',
      'Azure AI Foundry',
    ],
    highlights: [
      'Azure AI Foundry agents diagnose pipeline failures automatically',
      'Failure alerts routed to Google Chat for on-call engineers',
      'Runs on Azure App Service with Dockerized Node.js + React',
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
      'Multi-organization gateway on Azure App Service that lets Copilot Studio agents read pull requests, pipelines and work items—with secrets in Azure Key Vault.',
    techStack: [
      'Azure DevOps MCP',
      'Azure App Service',
      'Azure Key Vault',
      'Copilot Studio',
    ],
    highlights: [
      'Key Vault-backed secrets instead of hardcoded credentials',
      'Single gateway across multiple Azure DevOps organizations',
      'Exposes PRs, pipelines and work items to Copilot Studio agents',
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
      'Open-source, browser-only toolkit for comparing, exporting and importing Azure DevOps variable groups and release variables—no backend required.',
    techStack: ['React', 'TypeScript', 'Vite', 'ExcelJS'],
    highlights: [
      'Runs entirely in the browser with no server dependency',
      'Eleven tools covering variable groups and release variables',
      'Excel export/import via ExcelJS for offline workflows',
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
