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
    credentialUrl:
      'https://learn.microsoft.com/api/credentials/share/en-us/Nishant-2490/86227C61FF8E2B7D?sharingId=7C5B7CF861970B97',
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft',
    date: 'May 2025',
    credentialUrl:
      'https://learn.microsoft.com/api/credentials/share/en-us/nishantxrana/3BF09ED76E73C1F0?sharingId=749C77E590B75703',
  },
]
