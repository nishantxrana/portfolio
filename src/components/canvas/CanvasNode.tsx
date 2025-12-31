import type { CanvasNodeData } from './canvasData'

interface CanvasNodeProps {
  node: CanvasNodeData
  isSelected: boolean
  onClick: () => void
}

export function CanvasNode({ node, isSelected, onClick }: CanvasNodeProps) {
  const sizeClasses = {
    core: 'w-48 h-48',
    layer: 'w-40 h-32',
    experience: 'w-44 h-36',
    project: 'w-40 h-32',
    contact: 'w-36 h-28',
  }

  const colorClasses = {
    core: 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20',
    layer: 'border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/15',
    experience: 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15',
    project: 'border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/15',
    contact: 'border-white/20 bg-white/5 hover:bg-white/10',
  }

  const accentColors = {
    core: 'text-emerald-400',
    layer: 'text-cyan-400',
    experience: 'text-amber-400',
    project: 'text-violet-400',
    contact: 'text-white/70',
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`
        absolute flex flex-col items-center justify-center rounded-lg border
        font-mono transition-all duration-200 ease-out
        ${sizeClasses[node.type]}
        ${colorClasses[node.type]}
        ${isSelected ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-transparent' : ''}
      `}
      style={{
        left: node.x,
        top: node.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Node type indicator */}
      {node.type === 'core' && (
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
        </div>
      )}

      {/* Sublabel */}
      {node.sublabel && (
        <span className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
          {node.sublabel}
        </span>
      )}

      {/* Label */}
      <span className={`text-sm font-medium ${accentColors[node.type]}`}>
        {node.label}
      </span>

      {/* Items preview */}
      {node.items && node.type !== 'core' && (
        <div className="mt-2 flex flex-wrap justify-center gap-1 px-2">
          {node.items.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40"
            >
              {item}
            </span>
          ))}
          {node.items.length > 3 && (
            <span className="text-[9px] text-white/30">
              +{node.items.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Core node special content */}
      {node.type === 'core' && (
        <div className="mt-3 text-center">
          <div className="text-[10px] text-white/50">click to explore</div>
        </div>
      )}

      {/* Status indicator for experience */}
      {node.meta?.status === 'Current' && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] text-emerald-400">
          active
        </div>
      )}
    </button>
  )
}

