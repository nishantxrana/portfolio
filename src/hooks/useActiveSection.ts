import { useEffect, useState } from 'react'

/**
 * Scroll-spy: returns the id of the section currently in view.
 * A section is "active" once its top crosses ~35% of the viewport.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('')
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key.split('|')

    const update = () => {
      const marker = window.innerHeight * 0.35
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= marker) current = id
      }
      // Treat the bottom of the page as the last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = sectionIds[sectionIds.length - 1] ?? current
      }
      setActive(current)
    }

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])

  return active
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
