// ==========================================
// Projects Data
// Source: RESUME.md
// ==========================================

import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'insightops',
    title: 'InsightOps',
    description:
      'AI-Powered DevOps Monitoring & Automation Platform for real-time pipeline insights and intelligent failure analysis.',
    techStack: ['Node.js', 'React', 'Azure DevOps REST API', 'OpenAI', 'Docker', 'Vite'],
    highlights: [
      'Engineered an AI-driven platform to monitor Azure DevOps pipelines, builds, releases, and pull requests with real-time insights.',
      'Implemented automated failure analysis and root-cause summaries using multi-provider AI models.',
      'Integrated automated alerts to Google Chat, reducing manual monitoring and on-call overhead by approximately 70%.',
      'Designed with an AI abstraction layer to support flexible model routing based on cost and use case.',
    ],
    links: {
      github: 'https://github.com/nishantxrana/insightops',
    },
  },
  {
    id: 'openpost',
    title: 'OpenPost',
    description:
      'Full-Stack Blog Application with authentication, role-based access control, and comprehensive admin dashboard.',
    techStack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    highlights: [
      'Built a full-featured blogging platform with Google OAuth authentication and role-based access control.',
      'Implemented features including post creation, search, pagination, dark mode, and user management.',
      'Optimized backend APIs and frontend state management for improved performance and user experience.',
    ],
    links: {
      github: 'https://github.com/nishantxrana/OpenPost',
    },
  },
]

