import { useState, useRef, useCallback, useEffect } from 'react'
import { CanvasNode } from './CanvasNode'
import { NodeConnector } from './NodeConnector'
import { DetailPanel } from './DetailPanel'
import { Minimap } from './Minimap'
import { canvasNodes, nodeConnections, type CanvasNodeData } from './canvasData'

const INITIAL_ZOOM = 0.8
const MIN_ZOOM = 0.3
const MAX_ZOOM = 2
const ZOOM_SENSITIVITY = 0.001

export function SpatialCanvas() {
  // Canvas state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedNode, setSelectedNode] = useState<CanvasNodeData | null>(null)
  const [showHint, setShowHint] = useState(true)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const positionStart = useRef({ x: 0, y: 0 })

  // Center canvas on load
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: rect.width / 2,
        y: rect.height / 2,
      })
    }
  }, [])

  // Hide hint after interaction
  useEffect(() => {
    if (isDragging && showHint) {
      setShowHint(false)
    }
  }, [isDragging, showHint])

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // Left click only
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    positionStart.current = { ...position }
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPosition({
      x: positionStart.current.x + dx,
      y: positionStart.current.y + dy,
    })
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Zoom handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY * ZOOM_SENSITIVITY
    setZoom((prev) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)))
  }, [])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]!
      setIsDragging(true)
      dragStart.current = { x: touch.clientX, y: touch.clientY }
      positionStart.current = { ...position }
    }
  }, [position])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const touch = e.touches[0]!
    const dx = touch.clientX - dragStart.current.x
    const dy = touch.clientY - dragStart.current.y
    setPosition({
      x: positionStart.current.x + dx,
      y: positionStart.current.y + dy,
    })
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Node click handler
  const handleNodeClick = useCallback((node: CanvasNodeData) => {
    setSelectedNode(node)
    setShowHint(false)
  }, [])

  // Close detail panel
  const handleClosePanel = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Navigate to node
  const navigateToNode = useCallback((nodeId: string) => {
    const node = canvasNodes.find((n) => n.id === nodeId)
    if (node && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: rect.width / 2 - node.x * zoom,
        y: rect.height / 2 - node.y * zoom,
      })
    }
  }, [zoom])

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Grid background */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(16, 185, 129, 0.03) 0%, transparent 70%),
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: `100% 100%, ${40 * zoom}px ${40 * zoom}px, ${40 * zoom}px ${40 * zoom}px`,
          backgroundPosition: `center, ${position.x}px ${position.y}px, ${position.x}px ${position.y}px`,
        }}
      />

      {/* Canvas content */}
      <div
        className="absolute origin-center"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
        }}
      >
        {/* Node connectors (SVG lines) */}
        <svg
          className="pointer-events-none absolute"
          style={{
            left: '-2000px',
            top: '-2000px',
            width: '4000px',
            height: '4000px',
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
            </linearGradient>
          </defs>
          {nodeConnections.map((conn, i) => (
            <NodeConnector
              key={i}
              from={canvasNodes.find((n) => n.id === conn.from)!}
              to={canvasNodes.find((n) => n.id === conn.to)!}
            />
          ))}
        </svg>

        {/* Nodes */}
        {canvasNodes.map((node) => (
          <CanvasNode
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            onClick={() => handleNodeClick(node)}
          />
        ))}
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          onClose={handleClosePanel}
          zoom={zoom}
          canvasPosition={position}
        />
      )}

      {/* Minimap */}
      <Minimap
        nodes={canvasNodes}
        position={position}
        zoom={zoom}
        onNavigate={navigateToNode}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.2))}
          className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-black/50 text-sm text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.2))}
          className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-black/50 text-sm text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
        >
          −
        </button>
        <div className="mt-1 text-center font-mono text-xs text-white/30">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Hint overlay */}
      {showHint && (
        <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center">
          <div className="rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-white/50 backdrop-blur-sm">
            drag to pan · scroll to zoom · click nodes to explore
          </div>
        </div>
      )}

      {/* Title */}
      <div className="absolute left-4 top-4 font-mono text-xs text-white/30">
        nishant.system.map
      </div>
    </div>
  )
}

