import type { CanvasNodeData } from './canvasData'

interface MinimapProps {
  nodes: CanvasNodeData[]
  position: { x: number; y: number }
  zoom: number
  onNavigate: (nodeId: string) => void
}

export function Minimap({ nodes, position, zoom, onNavigate }: MinimapProps) {
  // Calculate bounds
  const padding = 100
  const minX = Math.min(...nodes.map((n) => n.x)) - padding
  const maxX = Math.max(...nodes.map((n) => n.x)) + padding
  const minY = Math.min(...nodes.map((n) => n.y)) - padding
  const maxY = Math.max(...nodes.map((n) => n.y)) + padding

  const width = maxX - minX
  const height = maxY - minY

  // Minimap dimensions
  const mapWidth = 140
  const mapHeight = (height / width) * mapWidth

  // Scale factor
  const scale = mapWidth / width

  // Viewport indicator (approximate)
  const viewportWidth = (window.innerWidth / zoom) * scale
  const viewportHeight = (window.innerHeight / zoom) * scale
  const viewportX = (-position.x / zoom - minX) * scale
  const viewportY = (-position.y / zoom - minY) * scale

  const typeColors = {
    core: '#10b981',
    layer: '#06b6d4',
    experience: '#f59e0b',
    project: '#8b5cf6',
    contact: '#9ca3af',
  }

  return (
    <div className="absolute right-4 top-4 overflow-hidden rounded border border-white/10 bg-black/50 backdrop-blur-sm">
      <div
        className="relative"
        style={{ width: mapWidth, height: mapHeight }}
      >
        {/* Nodes */}
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onNavigate(node.id)}
            className="absolute rounded-full transition-transform hover:scale-150"
            style={{
              left: (node.x - minX) * scale,
              top: (node.y - minY) * scale,
              width: node.type === 'core' ? 8 : 5,
              height: node.type === 'core' ? 8 : 5,
              backgroundColor: typeColors[node.type],
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Viewport indicator */}
        <div
          className="pointer-events-none absolute border border-white/30"
          style={{
            left: viewportX,
            top: viewportY,
            width: Math.min(viewportWidth, mapWidth),
            height: Math.min(viewportHeight, mapHeight),
          }}
        />
      </div>

      {/* Legend */}
      <div className="border-t border-white/10 px-2 py-1">
        <div className="flex gap-2 text-[8px] text-white/40">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            core
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            layer
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            exp
          </span>
        </div>
      </div>
    </div>
  )
}

