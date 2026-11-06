// ==========================================
// Education Data
// Source: Resume (single source of truth)
// ==========================================

import type { Education, Certification } from '@/types'

export const education: Education[] = [
  {
    id: 'btech',
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Chandigarh Engineering College, Chandigarh, India',
    period: '2020 – 2024',
    score: 'CGPA: 8.12 / 10',
  },
]

export const certifications: Certification[] = [
  {
    id: 'azure-dev',
    name: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
    issuer: 'Microsoft',
    date: 'May 2025',
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft',
    date: 'May 2025',
  },
]
