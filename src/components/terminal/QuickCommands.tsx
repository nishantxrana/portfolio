interface QuickCommandsProps {
  onCommand: (cmd: string) => void
}

const quickCommands = [
  { label: 'whoami', cmd: 'whoami' },
  { label: 'experience', cmd: 'experience' },
  { label: 'projects', cmd: 'projects' },
  { label: 'skills', cmd: 'skills' },
  { label: 'connect', cmd: 'connect' },
  { label: 'resume', cmd: 'resume' },
]

export function QuickCommands({ onCommand }: QuickCommandsProps) {
  return (
    <div className="border-t border-[#333] bg-[#0d0d0d] p-3 sm:p-4">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-xs text-[#666]">Quick commands:</p>
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((item) => (
            <button
              key={item.cmd}
              onClick={() => onCommand(item.cmd)}
              className="rounded border border-[#333] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#a0a0a0] transition-colors hover:border-[#28ca41] hover:text-[#28ca41]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

