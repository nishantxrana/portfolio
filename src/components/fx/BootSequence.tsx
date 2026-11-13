import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { siteConfig } from '@/config'
import { prefersReducedMotion } from '@/lib/smoothScroll'

const KEY = 'booted'

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const lines = (host: string): [string, 'cmd' | 'ok' | 'info' | 'done'][] => [
  ['helm upgrade --install nishant ./portfolio -n prod --atomic', 'cmd'],
  ['Release "nishant" has been upgraded. Happy Helming!', 'info'],
  ['pulling image  portfolio:latest ........ done', 'info'],
  ['mounting volumes  experience · projects · skills', 'info'],
  [`configuring ingress  ${host}`, 'info'],
  ['readiness probe  GET /healthz → 200 OK', 'ok'],
  ['deployment "nishant-rana" successfully rolled out', 'done'],
]

/** One-time-per-session boot screen. Skippable with any key / click. */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY) && !prefersReducedMotion()
    } catch {
      return false
    }
  })
  const [count, setCount] = useState(0)
  const items = lines(hostOf(siteConfig.siteUrl))

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    const finish = () => {
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* ignore */
      }
      setShow(false)
    }
    const timers: number[] = []
    items.forEach((_, i) => timers.push(window.setTimeout(() => setCount(i + 1), 160 + i * 175)))
    timers.push(window.setTimeout(finish, 160 + items.length * 175 + 420))

    window.addEventListener('keydown', finish, { once: true })
    window.addEventListener('pointerdown', finish, { once: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const progress = count / items.length

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[400] flex items-end bg-background"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-[12vh] sm:px-8">
            <div className="space-y-1.5 font-mono text-[12px] sm:text-sm">
              {items.slice(0, count).map(([text, kind], i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    kind === 'cmd'
                      ? 'text-foreground'
                      : kind === 'ok'
                        ? 'text-accent'
                        : kind === 'done'
                          ? 'font-medium text-accent'
                          : 'text-muted-foreground'
                  }
                >
                  <span className="mr-2 text-subtle">
                    {kind === 'cmd' ? '$' : kind === 'done' ? '✓' : kind === 'ok' ? '✓' : '→'}
                  </span>
                  {text}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 flex items-end justify-between gap-6">
              <p className="text-[clamp(3rem,12vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-foreground">
                {String(Math.round(progress * 100)).padStart(3, '0')}
                <span className="text-accent">%</span>
              </p>
              <p className="hidden pb-3 font-mono text-xs text-subtle sm:block">
                press any key to skip
              </p>
            </div>
            <div className="mt-4 h-px w-full overflow-hidden bg-border">
              <motion.div
                className="h-full origin-left bg-accent"
                animate={{ scaleX: progress }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
