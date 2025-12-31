import { useEffect, useState } from 'react'
import type { CommandOutput } from './commands'

interface TerminalLineProps {
  command: string
  output: CommandOutput
}

export function TerminalLine({ command, output }: TerminalLineProps) {
  const [displayedContent, setDisplayedContent] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Typing effect for output
  useEffect(() => {
    if (output.type === 'link' && output.url) {
      // Open link immediately
      window.open(output.url, '_blank')
    }

    const content = output.content
    let index = 0
    const speed = output.type === 'ascii' ? 2 : 5 // Faster for ASCII art

    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [output])

  return (
    <div className="mb-4">
      {/* Command line */}
      {command && (
        <div className="flex items-start gap-2">
          <span className="text-[#28ca41]">nishant@portfolio</span>
          <span className="text-[#666]">:</span>
          <span className="text-[#5c78ff]">~</span>
          <span className="text-[#666]">$</span>
          <span className="ml-1 text-[#e0e0e0]">{command}</span>
        </div>
      )}

      {/* Output */}
      <div
        className={`mt-1 whitespace-pre-wrap ${
          output.type === 'error'
            ? 'text-[#ff5f57]'
            : output.type === 'ascii'
              ? 'text-[#28ca41]'
              : 'text-[#a0a0a0]'
        }`}
      >
        {displayedContent}
        {isTyping && <span className="animate-pulse text-[#28ca41]">▊</span>}
      </div>

      {/* List items */}
      {output.items && !isTyping && (
        <div className="mt-2 space-y-1 pl-2">
          {output.items.map((item, i) => (
            <div key={i} className="text-[#a0a0a0]">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

