/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME: string
  readonly VITE_TITLE: string
  readonly VITE_SUBTITLE: string
  readonly VITE_EMAIL: string
  readonly VITE_PHONE: string
  readonly VITE_LOCATION: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_TWITTER_URL: string
  readonly VITE_RESUME_URL: string
  readonly VITE_SITE_URL: string
  readonly VITE_OG_IMAGE: string
  readonly VITE_SHOW_EXPERIENCE: string
  readonly VITE_SHOW_PROJECTS: string
  readonly VITE_SHOW_SKILLS: string
  readonly VITE_SHOW_EDUCATION: string
  readonly VITE_SHOW_CERTIFICATIONS: string
  readonly VITE_CLARITY_ID: string
  readonly VITE_GA_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

