import { motion } from 'motion/react'
import { siteConfig } from '@/config'
import { useCopyToClipboard } from '@/hooks'
import { Container } from '@/components/layout'
import { Magnetic } from '@/components/fx'
import { Icon, type IconName, buttonClass } from '@/components/ui'
import { Terminal } from './Terminal'

const words = ["Let's", 'ship', 'something', 'reliable.']

export function Contact() {
  const { email, social, availability } = siteConfig
  const { copied, copy } = useCopyToClipboard()
  const strip = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')

  const channels: { label: string; href: string; icon: IconName; value: string }[] = [
    ...(social.linkedin ? [{ label: 'LinkedIn', href: social.linkedin, icon: 'linkedin' as const, value: strip(social.linkedin) }] : []),
    ...(social.github ? [{ label: 'GitHub', href: social.github, icon: 'github' as const, value: strip(social.github) }] : []),
    ...(social.twitter ? [{ label: 'X', href: social.twitter, icon: 'twitter' as const, value: strip(social.twitter) }] : []),
  ]

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000,transparent_75%)]" />
        <div className="absolute bottom-[-30%] left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <Container>
        <p className="mb-6 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="text-accent">[05]</span>
          <span className="h-px w-10 bg-border-highlight" aria-hidden="true" />
          <span>
            <span className="text-subtle">$</span> ./contact.sh --interactive
          </span>
        </p>

        <h2
          id="contact-heading"
          className="text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-foreground"
        >
          {words.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${i === words.length - 1 ? 'text-gradient-accent' : ''}`}
                initial={{ y: '105%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && ' '}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr,1.15fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Open to discussing production systems, DevOps challenges, cloud architecture, or new
              opportunities. Prefer clicking? Use the buttons. Prefer typing? The terminal is live.
            </p>
            {availability && (
              <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                <span className="status-dot scale-75" aria-hidden="true" />
                {availability}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a href={`mailto:${email}`} className={buttonClass('accent', 'lg')} data-cursor="mail">
                  <Icon name="email" size={16} />
                  Email me
                </a>
              </Magnetic>
              <Magnetic>
                <button type="button" onClick={() => void copy(email)} className={buttonClass('secondary', 'lg')}>
                  <Icon name={copied ? 'check' : 'copy'} size={16} className={copied ? 'text-accent' : ''} />
                  <span aria-live="polite">{copied ? 'Copied!' : email}</span>
                </button>
              </Magnetic>
            </div>

            <ul className="mt-10 divide-y divide-border border-y border-border">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4"
                  >
                    <Icon name={c.icon} size={18} className="text-muted-foreground transition-colors group-hover:text-accent" />
                    <span className="text-lg font-medium tracking-tight text-foreground">{c.label}</span>
                    <span className="hidden truncate font-mono text-xs text-subtle sm:block">{c.value}</span>
                    <span className="ml-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon
                        name="arrow-up-right"
                        size={15}
                        className="transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Terminal />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
