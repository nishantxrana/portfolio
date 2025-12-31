// ==========================================
// Education Data
// Source: RESUME.md
// ==========================================

import type { Education, Certification } from '@/types'

export const education: Education[] = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology – Computer Science & Engineering',
    institution: 'Chandigarh Engineering College',
    period: '2020 – 2024',
    score: 'CGPA: 8.12 / 10',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (12th)',
    institution: 'Punjab School Education Board',
    period: '2019 – 2020',
    score: '88%',
  },
  {
    id: 'matriculation',
    degree: 'Matriculation (10th)',
    institution: 'Punjab School Education Board',
    period: '2017 – 2018',
    score: '81.53%',
  },
]

export const certifications: Certification[] = [
  {
    id: 'azure-dev',
    name: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    date: 'May 2025',
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Certified: Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: 'May 2025',
  },
]

