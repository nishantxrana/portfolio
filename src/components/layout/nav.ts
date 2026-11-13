import { env } from '@/config'
import { scrollToTarget } from '@/lib/smoothScroll'

/** Each section doubles as a stage in the "deployment pipeline". */
export const navLinks = [
  { id: 'experience', label: 'Experience', stage: 'deploy', enabled: env.showExperience },
  { id: 'projects', label: 'Projects', stage: 'release', enabled: env.showProjects },
  { id: 'skills', label: 'Skills', stage: 'provision', enabled: env.showSkills },
  { id: 'education', label: 'Education', stage: 'verify', enabled: env.showEducation },
  { id: 'contact', label: 'Contact', stage: 'connect', enabled: true },
].filter((link) => link.enabled)

export const OPEN_COMMAND_MENU = 'open-command-menu'

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU))
}

export const scrollToId = scrollToTarget

export const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
