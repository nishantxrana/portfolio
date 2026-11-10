// ==========================================
// Core Types for Portfolio
// ==========================================

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  current: boolean
  highlights: { text: string; metric?: string; badge?: string }[]
  technologies: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  highlights: string[]
  status: 'internal' | 'open-source'
  stat?: {
    value: string
    label: string
  }
  links?: {
    github?: string
    live?: string
  }
}

export interface SkillCategory {
  id: string
  name: string
  skills: string[]
  accent: 'accent' | 'cyan' | 'amber'
  description: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  score?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

export interface SiteConfig {
  name: string
  title: string
  subtitle: string
  email: string
  phone: string
  location: string
  resumeUrl: string
  siteUrl: string
  lastUpdated: string
  /** Job availability status; omit or leave empty to hide from UI */
  availability?: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  sections: {
    experience: boolean
    projects: boolean
    skills: boolean
    education: boolean
    certifications: boolean
  }
}
