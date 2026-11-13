import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/smoothScroll'
import { cn } from '@/utils'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  kind: 'pod' | 'node' | 'svc'
  phase: number
}

interface Packet {
  a: number
  b: number
  t: number
  speed: number
  hue: 'accent' | 'cyan'
}

function readVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/**
 * A living service mesh: drifting pods, edges between neighbours,
 * packets flowing along edges, and a cursor that acts like a load balancer
 * (pulls nearby pods in and routes traffic to them).
 */
export function ClusterCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    const packets: Packet[] = []
    const pointer = { x: -9999, y: -9999, active: false }
    let colors = { accent: '', cyan: '', fg: '' }
    let frame = 0
    let running = true
    let lastSpawn = 0
    const LINK = 150

    const loadColors = () => {
      colors = { accent: readVar('--accent'), cyan: readVar('--cyan'), fg: readVar('--foreground') }
    }

    const seed = () => {
      const count = Math.min(95, Math.max(28, Math.floor((width * height) / 15000)))
      nodes = Array.from({ length: count }, (_, i) => {
        const kind: Node['kind'] = i % 11 === 0 ? 'node' : i % 5 === 0 ? 'svc' : 'pod'
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: kind === 'node' ? 3.2 : kind === 'svc' ? 2.4 : 1.6,
          kind,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const neighbours = (i: number) => {
      const n = nodes[i]!
      const out: number[] = []
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue
        const m = nodes[j]!
        const dx = n.x - m.x
        const dy = n.y - m.y
        if (dx * dx + dy * dy < LINK * LINK) out.push(j)
      }
      return out
    }

    const spawnPacket = () => {
      const a = Math.floor(Math.random() * nodes.length)
      const options = neighbours(a)
      const b = options[Math.floor(Math.random() * options.length)]
      if (b === undefined) return
      packets.push({
        a,
        b,
        t: 0,
        speed: 0.008 + Math.random() * 0.012,
        hue: Math.random() > 0.35 ? 'accent' : 'cyan',
      })
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Physics
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -20) n.x = width + 20
          if (n.x > width + 20) n.x = -20
          if (n.y < -20) n.y = height + 20
          if (n.y > height + 20) n.y = -20

          if (pointer.active) {
            const dx = pointer.x - n.x
            const dy = pointer.y - n.y
            const d2 = dx * dx + dy * dy
            if (d2 < 220 * 220 && d2 > 400) {
              const f = 0.012 / Math.sqrt(d2)
              n.x += dx * f * 6
              n.y += dy * f * 6
            }
          }
        }
      }

      // Edges
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK * LINK) continue
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.16
          ctx.strokeStyle = `hsl(${colors.fg} / ${alpha})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // Cursor = ingress: route lines to nearby pods
      if (pointer.active) {
        for (const n of nodes) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > 200) continue
          ctx.strokeStyle = `hsl(${colors.accent} / ${(1 - d / 200) * 0.45})`
          ctx.setLineDash([3, 4])
          ctx.beginPath()
          ctx.moveTo(pointer.x, pointer.y)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Packets
      if (!reduced) {
        if (time - lastSpawn > 90 && packets.length < 40) {
          spawnPacket()
          lastSpawn = time
        }
        for (let k = packets.length - 1; k >= 0; k--) {
          const p = packets[k]!
          p.t += p.speed
          const a = nodes[p.a]
          const b = nodes[p.b]
          if (!a || !b || p.t >= 1) {
            packets.splice(k, 1)
            continue
          }
          const x = a.x + (b.x - a.x) * p.t
          const y = a.y + (b.y - a.y) * p.t
          const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.18)
          const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.18)
          const c = p.hue === 'accent' ? colors.accent : colors.cyan
          const grad = ctx.createLinearGradient(tx, ty, x, y)
          grad.addColorStop(0, `hsl(${c} / 0)`)
          grad.addColorStop(1, `hsl(${c} / 0.9)`)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.fillStyle = `hsl(${c})`
          ctx.beginPath()
          ctx.arc(x, y, 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.lineWidth = 1
      }

      // Nodes
      for (const n of nodes) {
        const pulse = reduced ? 1 : 0.6 + Math.sin(time / 900 + n.phase) * 0.4
        const near =
          pointer.active && Math.hypot(pointer.x - n.x, pointer.y - n.y) < 200
        if (n.kind === 'node') {
          // worker node: hollow square
          ctx.strokeStyle = `hsl(${colors.cyan} / ${0.35 + pulse * 0.4})`
          ctx.strokeRect(n.x - 4, n.y - 4, 8, 8)
          ctx.fillStyle = `hsl(${colors.cyan} / 0.12)`
          ctx.fillRect(n.x - 4, n.y - 4, 8, 8)
        } else {
          const c = n.kind === 'svc' ? colors.accent : colors.fg
          ctx.fillStyle = `hsl(${c} / ${near ? 0.95 : n.kind === 'svc' ? 0.35 + pulse * 0.4 : 0.28})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2)
          ctx.fill()
          if (near || n.kind === 'svc') {
            ctx.fillStyle = `hsl(${colors.accent} / ${near ? 0.18 : 0.06 * pulse})`
            ctx.beginPath()
            ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (running && !reduced) frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running && frame) return
      running = true
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        e.pointerType === 'mouse' &&
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height
    }
    const onLeave = () => {
      pointer.active = false
    }

    loadColors()
    resize()
    frame = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !document.hidden) start()
      else stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const mo = new MutationObserver(() => {
      loadColors()
      if (reduced) draw(0)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('h-full w-full', className)} />
}
