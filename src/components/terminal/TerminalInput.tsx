import { forwardRef, type KeyboardEvent } from 'react'

interface TerminalInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ value, onChange, onKeyDown }, ref) => {
    return (
      <div className="flex items-start gap-2">
        <span className="text-[#28ca41]">nishant@portfolio</span>
        <span className="text-[#666]">:</span>
        <span className="text-[#5c78ff]">~</span>
        <span className="text-[#666]">$</span>
        <div className="relative ml-1 flex-1">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent text-[#e0e0e0] outline-none"
          />
          {/* Blinking cursor at end of input */}
          <span
            className="pointer-events-none absolute animate-pulse text-[#28ca41]"
            style={{ left: `${value.length}ch` }}
          >
            ▊
          </span>
        </div>
      </div>
    )
  }
)

TerminalInput.displayName = 'TerminalInput'

