import Lenis from 'lenis'

let lenis: Lenis | null = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Inertial smooth scrolling. Returns a cleanup fn. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  })

  let frame = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)

  // Route in-page anchor links through Lenis
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.button !== 0) return
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
    if (!link || link.dataset.native !== undefined) return
    event.preventDefault()
    scrollToTarget(link.getAttribute('href')!.slice(1))
  }
  document.addEventListener('click', onClick)

  return () => {
    cancelAnimationFrame(frame)
    document.removeEventListener('click', onClick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(id: string) {
  const el = id ? document.getElementById(id) : null
  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: el ? -72 : 0, duration: 1.4 })
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  history.replaceState(null, '', id ? `#${id}` : window.location.pathname)
}

/** Pause smooth scrolling while overlays are open. */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
