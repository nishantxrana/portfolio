import type { CanvasNodeData } from './canvasData'

interface DetailPanelProps {
  node: CanvasNodeData
  onClose: () => void
  zoom: number
  canvasPosition: { x: number; y: number }
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  const typeColors = {
    core: 'border-emerald-500/30',
    layer: 'border-cyan-500/30',
    experience: 'border-amber-500/30',
    project: 'border-violet-500/30',
    contact: 'border-white/20',
  }

  const accentColors = {
    core: 'text-emerald-400',
    layer: 'text-cyan-400',
    experience: 'text-amber-400',
    project: 'text-violet-400',
    contact: 'text-white/70',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-lg rounded-lg border bg-[#0a0a0c]/95 p-6 backdrop-blur-md
          font-mono shadow-2xl
          ${typeColors[node.type]}
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/30 transition-colors hover:text-white/60"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4 border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            {node.sublabel || node.type}
          </span>
          <h2 className={`mt-1 text-xl font-medium ${accentColors[node.type]}`}>
            {node.label}
          </h2>
        </div>

        {/* Description */}
        {node.description && (
          <p className="mb-4 text-sm leading-relaxed text-white/60">
            {node.description}
          </p>
        )}

        {/* Meta info */}
        {node.meta && (
          <div className="mb-4 flex flex-wrap gap-3">
            {Object.entries(node.meta).map(([key, value]) => (
              <div key={key} className="rounded bg-white/5 px-2 py-1">
                <span className="text-[10px] uppercase text-white/30">{key}: </span>
                <span className="text-xs text-white/70">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        {node.highlights && (
          <div className="mb-4">
            <span className="mb-2 block text-[10px] uppercase tracking-wider text-white/30">
              highlights
            </span>
            <ul className="space-y-2">
              {node.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/60">
                  <span className={accentColors[node.type]}>→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Items/Stack */}
        {node.items && (
          <div className="mb-4">
            <span className="mb-2 block text-[10px] uppercase tracking-wider text-white/30">
              {node.type === 'project' ? 'stack' : 'technologies'}
            </span>
            <div className="flex flex-wrap gap-2">
              {node.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {node.links && (
          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {node.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs
                  transition-colors
                  ${typeColors[node.type]} ${accentColors[node.type]}
                  hover:bg-white/5
                `}
              >
                {link.label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        )}

        {/* Keyboard hint */}
        <div className="mt-4 text-center text-[10px] text-white/20">
          press <kbd className="rounded bg-white/10 px-1">esc</kbd> or click outside to close
        </div>
      </div>
    </>
  )
}

