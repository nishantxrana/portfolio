import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(resetAfter = 1800) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), resetAfter)
        return true
      } catch {
        return false
      }
    },
    [resetAfter]
  )

  return { copied, copy }
}
