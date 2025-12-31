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

// Kept for reference but not used in new design
// The hero section uses inline technical copy instead
export const professionalSummary = `Software Engineer specializing in production systems, DevOps automation, and cloud infrastructure. Building CI/CD pipelines, Kubernetes deployments, and infrastructure-as-code solutions. Focused on reliability, observability, and cost optimization.`
