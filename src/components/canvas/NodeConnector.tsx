import type { CanvasNodeData } from './canvasData'

interface NodeConnectorProps {
  from: CanvasNodeData
  to: CanvasNodeData
}

export function NodeConnector({ from, to }: NodeConnectorProps) {
  // Offset for SVG coordinate space (centered at 2000, 2000)
  const offset = 2000

  const x1 = from.x + offset
  const y1 = from.y + offset
  const x2 = to.x + offset
  const y2 = to.y + offset

  // Calculate control points for curved lines
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2

  // Slight curve based on distance
  const dx = x2 - x1
  const dy = y2 - y1
  const distance = Math.sqrt(dx * dx + dy * dy)
  const curvature = distance * 0.1

  // Perpendicular offset for curve
  const nx = -dy / distance
  const ny = dx / distance
  const cx = midX + nx * curvature * 0.3
  const cy = midY + ny * curvature * 0.3

  return (
    <g>
      {/* Main line */}
      <path
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        fill="none"
        stroke="rgba(16, 185, 129, 0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      
      {/* Glow effect */}
      <path
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        fill="none"
        stroke="rgba(16, 185, 129, 0.05)"
        strokeWidth="4"
      />

      {/* End dot */}
      <circle
        cx={x2}
        cy={y2}
        r="3"
        fill="rgba(16, 185, 129, 0.3)"
      />
    </g>
  )
}

