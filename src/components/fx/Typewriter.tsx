import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/smoothScroll'

interface TypewriterProps {
  words: readonly string[]
  className?: string
  start?: boolean
}

/** Types, holds, deletes, and cycles through words — with a block caret. */
export function Typewriter({ words, className, start = true }: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setText(words[0] ?? '')
      return
    }
    const word = words[index % words.length] ?? ''
    let timeout: number

    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    } else {
      const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      timeout = window.setTimeout(() => setText(next), deleting ? 28 : 55 + Math.random() * 45)
    }
    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, words, start])

  return (
    <span className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
    </span>
  )
}
