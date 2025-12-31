// ==========================================
// Projects Data
// Source: RESUME.md
// Format: Architecture case studies
// ==========================================

import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'insightops',
    title: 'InsightOps',
    description:
      'AI-powered DevOps monitoring platform that provides real-time pipeline observability and automated failure analysis. Built to reduce on-call overhead and accelerate incident response.',
    techStack: ['Node.js', 'React', 'Azure DevOps API', 'OpenAI', 'Docker', 'Vite'],
    highlights: [
      'Real-time monitoring of Azure DevOps pipelines, builds, releases, and PRs',
      'AI-driven root-cause analysis using multi-provider model abstraction',
      'Automated alerts to Google Chat — reduced manual monitoring by ~70%',
      'Flexible model routing based on cost and use-case requirements',
    ],
    links: {
      github: 'https://github.com/nishantxrana/insightops',
    },
  },
  {
    id: 'openpost',
    title: 'OpenPost',
    description:
      'Full-stack blog platform with enterprise-grade auth, RBAC, and admin dashboard. Designed for scalability with optimized state management and performant APIs.',
    techStack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    highlights: [
      'Google OAuth + JWT-based authentication with role-based access control',
      'Admin dashboard for user, post, and comment management',
      'Search, pagination, dark mode — optimized for UX and performance',
      'RESTful API design with proper error handling and validation',
    ],
    links: {
      github: 'https://github.com/nishantxrana/OpenPost',
    },
  },
]
