// ==========================================
// Environment Variable Validation
// ==========================================
// All env vars must be prefixed with VITE_ to be exposed

const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = import.meta.env[key]
  return typeof value === 'string' ? value : fallback
}

const getEnvBool = (key: string, fallback: boolean = true): boolean => {
  const value = import.meta.env[key]
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true'
  }
  return fallback
}

export const env = {
  // Personal Information
  name: getEnvVar('VITE_NAME', 'Nishant Rana'),
  title: getEnvVar('VITE_TITLE', 'Software Engineer'),
  subtitle: getEnvVar('VITE_SUBTITLE', 'DevOps & Cloud-Focused Full Stack Developer'),
  email: getEnvVar('VITE_EMAIL', 'nishantxrana@gmail.com'),
  phone: getEnvVar('VITE_PHONE', '+91 8968755216'),
  location: getEnvVar('VITE_LOCATION', 'India'),

  // Social Links
  githubUrl: getEnvVar('VITE_GITHUB_URL', 'https://github.com/nishantxrana'),
  linkedinUrl: getEnvVar('VITE_LINKEDIN_URL', 'https://linkedin.com/in/nishantxrana'),
  twitterUrl: getEnvVar('VITE_TWITTER_URL', ''),

  // Resume
  resumeUrl: getEnvVar('VITE_RESUME_URL', ''),

  // Site Metadata
  siteUrl: getEnvVar('VITE_SITE_URL', ''),
  ogImage: getEnvVar('VITE_OG_IMAGE', '/og-image.png'),

  // Section Visibility
  showExperience: getEnvBool('VITE_SHOW_EXPERIENCE', true),
  showProjects: getEnvBool('VITE_SHOW_PROJECTS', true),
  showSkills: getEnvBool('VITE_SHOW_SKILLS', true),
  showEducation: getEnvBool('VITE_SHOW_EDUCATION', true),
  showCertifications: getEnvBool('VITE_SHOW_CERTIFICATIONS', true),

  // Analytics
  clarityId: getEnvVar('VITE_CLARITY_ID', ''),
  gaId: getEnvVar('VITE_GA_ID', ''),
} as const

export type Env = typeof env

