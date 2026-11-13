import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projects } from '@/data'
import { prefersReducedMotion } from '@/lib/smoothScroll'
import { cn } from '@/utils'

type Status = 'Pending' | 'ContainerCreating' | 'Running'

function suffix(seed: string, len: number) {
  let h = 2166136261
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  const chars = 'abcdefghjkmnpqrstvwxz23456789'
  let out = ''
  for (let i = 0; i < len; i++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    out += chars[Math.abs(h) % chars.length]
  }
  return out
}

const pods = [
  ...projects.map((p) => `${p.id}-${suffix(p.id, 5)}-${suffix(p.id + 'x', 4)}`),
  `prometheus-server-0`,
  `grafana-${suffix('grafana', 5)}-${suffix('g', 4)}`,
  `ingress-nginx-controller-${suffix('ingress', 4)}`,
].slice(0, 6)

const events = [
  'Normal  Scheduled  Successfully assigned prod/insightops to aks-nodepool1-0',
  'Normal  Pulled     Container image pulled in 1.2s',
  'Normal  Created    Created container azuremcpgateway',
  'Normal  Started    Started container tooldock',
  'Normal  Scaled     HPA scaled deployment to 3 replicas',
  'Normal  Synced     Helm release "nishant" is healthy',
]

const statusColor: Record<Status, string> = {
  Pending: 'text-amber',
  ContainerCreating: 'text-cyan',
  Running: 'text-accent',
}

function formatAge(s: number) {
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  return `${m}m${String(s % 60).padStart(2, '0')}s`
}

/** Faux `kubectl get pods -w` that brings pods up one by one. */
export function KubectlPanel({ start }: { start: boolean }) {
  const [now, setNow] = useState(0)
  const [eventIndex, setEventIndex] = useState(0)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const id = window.setInterval(() => setNow((performance.now() - t0) / 1000), 250)
    const ev = window.setInterval(() => setEventIndex((i) => i + 1), 2600)
    return () => {
      window.clearInterval(id)
      window.clearInterval(ev)
    }
  }, [start])

  const statusOf = (i: number): Status => {
    if (reduced) return 'Running'
    const t = now - i * 0.45
    if (t < 0.4) return 'Pending'
    if (t < 1.4) return 'ContainerCreating'
    return 'Running'
  }
  const ready = pods.filter((_, i) => statusOf(i) === 'Running').length

  return (
    <div className="surface relative overflow-hidden font-mono text-[11.5px] leading-relaxed">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </span>
          <span className="ml-2 text-subtle">zsh — aks-prod</span>
        </div>
        <span className={cn('transition-colors', ready === pods.length ? 'text-accent' : 'text-amber')}>
          {ready}/{pods.length} ready
        </span>
      </div>

      <div className="px-4 py-4">
        <p className="text-foreground">
          <span className="text-accent">❯</span> kubectl get pods -n prod -w
        </p>
        <div className="mt-3 grid grid-cols-[1fr,auto,auto] gap-x-4 text-subtle">
          <span>NAME</span>
          <span>STATUS</span>
          <span className="w-12 text-right">AGE</span>
        </div>
        <ul className="mt-1 space-y-1">
          {pods.map((name, i) => {
            const status = statusOf(i)
            const visible = reduced || now >= i * 0.45
            return (
              <motion.li
                key={name}
                initial={false}
                animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-[1fr,auto,auto] items-center gap-x-4"
              >
                <span className="truncate text-muted-foreground">{name}</span>
                <span className={cn('flex items-center gap-1.5', statusColor[status])}>
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full bg-current',
                      status !== 'Running' && 'animate-pulse'
                    )}
                  />
                  <span className="hidden sm:inline">{status}</span>
                  <span className="sm:hidden">{status === 'ContainerCreating' ? 'Creating' : status}</span>
                </span>
                <span className="w-12 text-right tabular-nums text-subtle">
                  {formatAge(Math.max(0, Math.floor(now - i * 0.45)) + 3)}
                </span>
              </motion.li>
            )
          })}
        </ul>

        <div className="mt-4 border-t border-dashed border-border pt-3">
          <p className="mb-1 text-subtle">EVENTS</p>
          <div className="relative h-5 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={eventIndex}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 truncate text-muted-foreground"
              >
                {events[eventIndex % events.length]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* scanline sweep */}
      <div className="scan pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  )
}
