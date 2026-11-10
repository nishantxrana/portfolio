// ==========================================
// Environment Variable Validation
// ==========================================
// All env vars must be prefixed with VITE_ to be exposed

const viteEnv: Record<string, string | boolean | undefined> =
  (import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> })
    .env ?? {}

const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = viteEnv[key]
  if (typeof value === 'string' && value.trim() !== '') {
    return value
  }
  return fallback
}

const getEnvBool = (key: string, fallback: boolean = true): boolean => {
  const value = viteEnv[key]
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true'
  }
  return fallback
}

export const env = {
  // Personal Information
  name: getEnvVar('VITE_NAME', 'Nishant Rana'),
  title: getEnvVar('VITE_TITLE', 'Software Engineer'),
  subtitle: getEnvVar(
    'VITE_SUBTITLE',
    'DevOps & Cloud Engineer · Microsoft Azure'
  ),
  email: getEnvVar('VITE_EMAIL', 'nishantxrana@gmail.com'),
  phone: getEnvVar('VITE_PHONE', '+91 8968755216'),
  location: getEnvVar('VITE_LOCATION', 'Haryana, India'),

  // Social Links
  githubUrl: getEnvVar('VITE_GITHUB_URL', 'https://github.com/nishantxrana'),
  linkedinUrl: getEnvVar(
    'VITE_LINKEDIN_URL',
    'https://linkedin.com/in/nishantxrana'
  ),
  twitterUrl: getEnvVar('VITE_TWITTER_URL', ''),

  // Resume
  resumeUrl: getEnvVar('VITE_RESUME_URL', ''),

  // Availability (empty = hidden in UI)
  availability: getEnvVar('VITE_AVAILABILITY', ''),

  // Site Metadata
  siteUrl: getEnvVar('VITE_SITE_URL', 'https://nishantxrana.com'),
  ogImage: getEnvVar('VITE_OG_IMAGE', 'https://nishantxrana.com/og-image.png'),

  // Section Visibility
  showExperience: getEnvBool('VITE_SHOW_EXPERIENCE', true),
  showProjects: getEnvBool('VITE_SHOW_PROJECTS', true),
  showSkills: getEnvBool('VITE_SHOW_SKILLS', true),
  showEducation: getEnvBool('VITE_SHOW_EDUCATION', true),
  showCertifications: getEnvBool('VITE_SHOW_CERTIFICATIONS', true),
} as const

export type Env = typeof env
