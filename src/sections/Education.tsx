import { motion } from 'motion/react'
import { education, certifications } from '@/data'
import { siteConfig } from '@/config'
import { Container } from '@/components/layout'
import { SectionHeader, Tilt } from '@/components/fx'
import { Icon } from '@/components/ui'

/** Deterministic base64-looking filler for the certificate body (decorative). */
function pem(seed: string, lines: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let h = 7
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 2654435761) >>> 0
  return Array.from({ length: lines }, () => {
    let line = ''
    for (let i = 0; i < 44; i++) {
      h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0
      line += chars[h % 64]
    }
    return line
  })
}

const J = {
  key: (k: string) => <span className="text-cyan">&quot;{k}&quot;</span>,
  str: (v: string) => <span className="text-accent">&quot;{v}&quot;</span>,
  p: (v: string) => <span className="text-subtle">{v}</span>,
}

export function Education() {
  const showCerts = siteConfig.sections.certifications && certifications.length > 0

  return (
    <section id="education" aria-labelledby="education-heading" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeader
          id="education"
          index="04"
          command="openssl verify -CAfile microsoft.pem nishant.crt"
          title="Signed, verified, trusted."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          {/* degree.json */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="surface h-fit overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3 font-mono text-[11px] text-subtle">
              <span className="flex items-center gap-2">
                <Icon name="graduation" size={13} /> education/degree.json
              </span>
              <span>JSON</span>
            </div>
            <pre className="whitespace-pre-wrap break-words p-5 font-mono text-[12.5px] leading-7 text-foreground">
              {education.map((edu, i) => (
                <code key={edu.id} className="block">
                  <span className="mr-4 select-none text-subtle/60">{i * 7 + 1}</span>
                  {J.p('{')}
                  {'\n'}
                  <span className="mr-4 select-none text-subtle/60">{i * 7 + 2}</span>
                  {'  '}{J.key('degree')}{J.p(': ')}{J.str(edu.degree)}{J.p(',')}
                  {'\n'}
                  <span className="mr-4 select-none text-subtle/60">{i * 7 + 3}</span>
                  {'  '}{J.key('institution')}{J.p(': ')}{J.str(edu.institution)}{J.p(',')}
                  {'\n'}
                  <span className="mr-4 select-none text-subtle/60">{i * 7 + 4}</span>
                  {'  '}{J.key('period')}{J.p(': ')}{J.str(edu.period)}
                  {edu.score && (
                    <>
                      {J.p(',')}
                      {'\n'}
                      <span className="mr-4 select-none text-subtle/60">{i * 7 + 5}</span>
                      {'  '}{J.key('score')}{J.p(': ')}{J.str(edu.score)}
                    </>
                  )}
                  {'\n'}
                  <span className="mr-4 select-none text-subtle/60">{i * 7 + 6}</span>
                  {J.p('}')}
                  <span className="caret ml-1" />
                </code>
              ))}
            </pre>
          </motion.div>

          {/* certificates */}
          {showCerts && (
            <ul className="space-y-6">
              {certifications.map((cert, i) => {
                const code = cert.name.match(/\(([^)]+)\)/)?.[1] ?? cert.id
                const title = cert.name.replace(/^Microsoft Certified:\s*/, '').replace(/\s*\([^)]+\)\s*$/, '')
                return (
                  <motion.li
                    key={cert.id}
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Tilt max={5}>
                      <div className="surface group relative overflow-hidden p-6 font-mono text-[12px]">
                        <div className="scan pointer-events-none absolute inset-0" aria-hidden="true" />
                        <p className="text-subtle">-----BEGIN CERTIFICATE-----</p>
                        <dl className="my-4 grid grid-cols-[96px,1fr] gap-x-4 gap-y-1.5">
                          <dt className="text-subtle">Subject</dt>
                          <dd className="text-foreground">CN={siteConfig.name}</dd>
                          <dt className="text-subtle">Issuer</dt>
                          <dd className="text-cyan">O={cert.issuer}</dd>
                          <dt className="text-subtle">Credential</dt>
                          <dd>
                            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">{code}</span>{' '}
                            <span className="font-sans text-sm font-medium text-foreground">{title}</span>
                          </dd>
                          <dt className="text-subtle">Not Before</dt>
                          <dd className="text-muted-foreground">{cert.date}</dd>
                        </dl>
                        <div className="select-none text-[10.5px] leading-5 text-subtle/50" aria-hidden="true">
                          {pem(cert.id, 2).map((l) => (
                            <p key={l} className="truncate">{l}</p>
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-subtle">-----END CERTIFICATE-----</p>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Verify ${cert.name}`}
                              data-cursor="verify"
                              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Icon name="check" size={13} />
                              verify: OK
                              <Icon name="arrow-up-right" size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </Tilt>
                  </motion.li>
                )
              })}
            </ul>
          )}
        </div>
      </Container>
    </section>
  )
}
