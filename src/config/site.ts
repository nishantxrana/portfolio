// ==========================================
// Site Configuration
// ==========================================
// Central configuration derived from environment variables

import { env } from './env'
import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: env.name,
  title: env.title,
  subtitle: env.subtitle,
  email: env.email,
  phone: env.phone,
  location: env.location,
  resumeUrl: env.resumeUrl,
  siteUrl: env.siteUrl,
  lastUpdated: 'Nov 2026',
  availability: env.availability || undefined,
  social: {
    github: env.githubUrl,
    linkedin: env.linkedinUrl,
    twitter: env.twitterUrl,
  },
  sections: {
    experience: env.showExperience,
    projects: env.showProjects,
    skills: env.showSkills,
    education: env.showEducation,
    certifications: env.showCertifications,
  },
}
