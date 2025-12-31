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

// Professional summary - can also be moved to env if needed
export const professionalSummary = `Software Engineer with strong experience in DevOps, Cloud Infrastructure, and Full Stack Development. Proven expertise in designing scalable CI/CD pipelines, containerized deployments on Azure Kubernetes Service (AKS), and infrastructure automation using Terraform. Passionate about building developer-focused platforms and improving system observability, performance, and automation.`

