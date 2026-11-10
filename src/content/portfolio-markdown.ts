// ==========================================
// Portfolio Markdown (agent / content negotiation)
// ==========================================

import { siteConfig } from '../config/site'
import { env } from '../config/env'
import {
  experiences,
  projects,
  skillCategories,
  education,
  certifications,
} from '../data'

const PAGE_TITLE =
  'Nishant Rana | Software Engineer – DevOps & Cloud (Azure)'
const PAGE_DESCRIPTION =
  'DevOps & Cloud engineer on Azure. Cut Azure costs 30% for American Express, shipped 20+ .NET microservices to AKS, built an Azure OpenAI tool that won a 1,300+ person hackathon.'

export function estimateMarkdownTokens(markdown: string): number {
  return Math.ceil(markdown.length / 4)
}

export function buildPortfolioMarkdown(): string {
  const { name, title, subtitle, email, phone, location, resumeUrl, social } =
    siteConfig

  const lines: string[] = [
    '---',
    `title: ${PAGE_TITLE}`,
    `description: ${PAGE_DESCRIPTION}`,
    `image: ${env.ogImage}`,
    '---',
    '',
    `# ${name}`,
    '',
    `**${title}** · ${subtitle}`,
    '',
    PAGE_DESCRIPTION,
    '',
    '## Contact',
    '',
    `- Email: [${email}](mailto:${email})`,
    `- Phone: ${phone}`,
    `- Location: ${location}`,
  ]

  if (social.github) lines.push(`- GitHub: ${social.github}`)
  if (social.linkedin) lines.push(`- LinkedIn: ${social.linkedin}`)
  if (social.twitter) lines.push(`- Twitter: ${social.twitter}`)
  if (resumeUrl) lines.push(`- Resume: ${resumeUrl}`)

  if (siteConfig.sections.experience && experiences.length > 0) {
    lines.push('', '## Experience', '')
    for (const job of experiences) {
      lines.push(`### ${job.title} — ${job.company}`, '')
      const period = job.current ? `${job.period} (current)` : job.period
      lines.push(`${job.location} · ${period}`, '')
      for (const highlight of job.highlights) {
        const metric = highlight.metric ? ` **(${highlight.metric})**` : ''
        lines.push(`- ${highlight.text}${metric}`)
      }
      if (job.technologies.length > 0) {
        lines.push('', `Technologies: ${job.technologies.join(', ')}`)
      }
      lines.push('')
    }
  }

  if (siteConfig.sections.projects && projects.length > 0) {
    lines.push('## Projects', '')
    for (const project of projects) {
      lines.push(`### ${project.title}`, '', project.description, '')
      for (const highlight of project.highlights) {
        lines.push(`- ${highlight}`)
      }
      lines.push('', `Stack: ${project.techStack.join(', ')}`)
      if (project.stat) {
        lines.push(`Impact: ${project.stat.value} ${project.stat.label}`)
      }
      if (project.links?.github) {
        lines.push(`GitHub: ${project.links.github}`)
      }
      if (project.links?.live) {
        lines.push(`Live: ${project.links.live}`)
      }
      lines.push(`Status: ${project.status}`, '')
    }
  }

  if (siteConfig.sections.skills && skillCategories.length > 0) {
    lines.push('## Skills', '')
    for (const category of skillCategories) {
      lines.push(`### ${category.name}`, '', category.description, '')
      for (const skill of category.skills) {
        lines.push(`- ${skill}`)
      }
      lines.push('')
    }
  }

  if (siteConfig.sections.education && education.length > 0) {
    lines.push('## Education', '')
    for (const item of education) {
      lines.push(`### ${item.degree}`, '')
      lines.push(`${item.institution} · ${item.period}`)
      if (item.score) lines.push(item.score)
      lines.push('')
    }
  }

  if (siteConfig.sections.certifications && certifications.length > 0) {
    lines.push('## Certifications', '')
    for (const cert of certifications) {
      const verify = cert.credentialUrl ? ` — [verify](${cert.credentialUrl})` : ''
      lines.push(
        `- **${cert.name}** — ${cert.issuer} (${cert.date})${verify}`
      )
    }
    lines.push('')
  }

  const sameAs = [social.github, social.linkedin, social.twitter].filter(
    Boolean
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: 'Software Engineer – DevOps & Cloud',
    worksFor: {
      '@type': 'Organization',
      name: experiences[0]?.company ?? 'Grazitti Interactive',
    },
    url: env.siteUrl,
    email,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
    },
    sameAs,
  }

  lines.push(
    '## Structured data',
    '',
    '```json',
    JSON.stringify(jsonLd, null, 2),
    '```',
    ''
  )

  return lines.join('\n')
}
