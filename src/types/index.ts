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
  highlights: string[]
  technologies: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  highlights: string[]
  links?: {
    github?: string
    live?: string
  }
}

export interface SkillCategory {
  id: string
  name: string
  skills: string[]
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

