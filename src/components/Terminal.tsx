import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { commands, type CommandOutput } from './terminal/commands'
import { TerminalLine } from './terminal/TerminalLine'
import { TerminalInput } from './terminal/TerminalInput'
import { QuickCommands } from './terminal/QuickCommands'

interface HistoryEntry {
  id: number
  command: string
  output: CommandOutput
}

const WELCOME_MESSAGE: CommandOutput = {
  type: 'ascii',
  content: `
 ███╗   ██╗██████╗ 
 ████╗  ██║██╔══██╗
 ██╔██╗ ██║██████╔╝
 ██║╚██╗██║██╔══██╗
 ██║ ╚████║██║  ██║
 ╚═╝  ╚═══╝╚═╝  ╚═╝

 Nishant Rana | Software Engineer
 
 Type 'help' to see available commands.
 Tab to autocomplete. ↑↓ for history.
`,
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: 0, command: '', output: WELCOME_MESSAGE },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const idCounter = useRef(1)

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Execute command
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    
    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    const output = commands[trimmed] || {
      type: 'error' as const,
      content: `Command not found: ${cmd}\nType 'help' for available commands.`,
    }

    setHistory((prev) => [
      ...prev,
      { id: idCounter.current++, command: cmd, output },
    ])
    
    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed])
    }
    
    setInput('')
    setHistoryIndex(-1)
  }

  // Handle key events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 
          ? historyIndex + 1 
          : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple autocomplete
      const matches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      )
      if (matches.length === 1) {
        setInput(matches[0]!)
      }
    }
  }

  // Quick command handler
  const handleQuickCommand = (cmd: string) => {
    executeCommand(cmd)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Terminal window */}
      <div className="flex-1 p-2 sm:p-4 lg:p-8">
        <div className="mx-auto max-w-4xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-[#333] bg-[#1a1a1a] px-4 py-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28ca41]" />
            </div>
            <span className="ml-2 text-xs text-[#666]">
              nishant@portfolio — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={containerRef}
            onClick={focusInput}
            className="h-[70vh] cursor-text overflow-y-auto rounded-b-lg border border-[#333] bg-[#0d0d0d] p-4 sm:h-[75vh]"
          >
            {/* History */}
            {history.map((entry) => (
              <TerminalLine
                key={entry.id}
                command={entry.command}
                output={entry.output}
              />
            ))}

            {/* Input line */}
            <TerminalInput
              ref={inputRef}
              value={input}
              onChange={setInput}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      {/* Quick commands for mobile */}
      <QuickCommands onCommand={handleQuickCommand} />
    </div>
  )
}

