'use client'
import { useRef, useState, useCallback } from 'react'
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva'
import Konva from 'konva'
import { CanvasElement, CanvasDocument, CANVAS_WIDTH, CANVAS_HEIGHT, removeElement, updateElement, getElement, normalizeTransform, renderElement, isText } from '@/lib/canvas-types'
import ElementToolbar from './element-toolbar'
import PropertiesPanel from './properties-panel'

interface EditorProps { canvas: CanvasDocument; onUpdate: (canvas: CanvasDocument) => void; selectedId: string | null; onSelectElement: (id: string | null) => void }

export default function CanvasEditor({ canvas, onUpdate, selectedId, onSelectElement }: EditorProps) {
  const stageRef = useRef<Konva.Stage | null>(null)
  const transformerRef = useRef<Konva.Transformer | null>(null)
  const selectedRef = useRef<Konva.Node | null>(null)

  const handleAddElement = (type: 'rectangle' | 'circle' | 'text') => {
    const newElement = renderElement({ id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, x: 80 + canvas.elements.length * 18, y: 80 + canvas.elements.length * 18, width: type === 'circle' ? 120 : type === 'text' ? 260 : 220, height: type === 'circle' ? 120 : type === 'text' ? 48 : 130, rotation: 0, fill: type === 'text' ? '#172033' : type === 'circle' ? '#e7a77b' : '#8ea8c3', ...(type === 'text' && { text: 'Double click to edit', fontSize: 24 }) })
    const updated = { ...canvas, elements: [...canvas.elements, newElement] }
    onUpdate(updated)
    onSelectElement(newElement.id)
  }

  const handleSelectElement = (id: string | null) => {
    onSelectElement(id)
    if (id && stageRef.current) {
      const node = stageRef.current.findOne(`#${id}`)
      if (node) { selectedRef.current = node; if (transformerRef.current) { transformerRef.current.nodes([node]); transformerRef.current.getLayer()?.batchDraw() } }
    }
  }

  const handleUpdateElement = (id: string, patch: Partial<CanvasElement>) => {
    const updated = { ...canvas, elements: updateElement(canvas.elements, id, patch) }
    onUpdate(updated)
  }

  const handleDeleteSelected = () => {
    if (!selectedId) return
    const updated = { ...canvas, elements: removeElement(canvas.elements, selectedId) }
    onUpdate(updated)
    onSelectElement(null)
  }

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) onSelectElement(null)
  }

  const handleDragEnd = (elementId: string, e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target
    handleUpdateElement(elementId, { x: node.x(), y: node.y() })
  }

  const handleTransformEnd = (elementId: string) => {
    const node = selectedRef.current
    if (!node) return
    const element = getElement(canvas.elements, elementId)
    if (!element) return
    const normalized = normalizeTransform(element, { x: () => node.x(), y: () => node.y(), rotation: () => node.rotation(), scaleX: () => node.scaleX(), scaleY: () => node.scaleY() })
    node.scaleX(1)
    node.scaleY(1)
    handleUpdateElement(elementId, normalized)
  }

  const handleTextDblClick = (elementId: string) => {
    const element = getElement(canvas.elements, elementId)
    if (!element || !isText(element)) return
    const stage = stageRef.current
    if (!stage) return
    const node = stage.findOne(`#${elementId}`)
    if (!(node instanceof Konva.Text)) return
    const textNode = node
    const textarea = document.createElement('textarea')
    Object.assign(textarea.style, { position: 'absolute', top: `${stage.container().offsetTop + textNode.absolutePosition().y}px`, left: `${stage.container().offsetLeft + textNode.absolutePosition().x}px`, width: `${textNode.width() * stage.scaleX()}px`, height: `${textNode.height() * stage.scaleY()}px`, fontSize: `${textNode.fontSize()}px`, fontFamily: textNode.fontFamily(), border: '1px solid #c9754d', padding: '0', margin: '0', resize: 'none', boxSizing: 'border-box', zIndex: '1000' })
    textarea.value = element.text ?? ''
    stage.container().appendChild(textarea)
    textarea.focus()
    textarea.select()
    const save = () => { handleUpdateElement(elementId, { text: textarea.value }); textarea.remove() }
    textarea.addEventListener('blur', save)
    textarea.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save() } })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) { e.preventDefault(); handleDeleteSelected() }
  }

  return (
    <div className="flex flex-col gap-4 h-full" onKeyDown={handleKeyDown} tabIndex={0} role="application" aria-label="Design canvas editor">
      <ElementToolbar onAdd={handleAddElement} onDelete={handleDeleteSelected} canDelete={Boolean(selectedId)} />
      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
            <Stage ref={stageRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onClick={handleStageClick} style={{ cursor: selectedId ? 'default' : 'pointer' }}>
              <Layer>
                {canvas.elements.map((element) => {
                  const isSelected = element.id === selectedId
                  const commonProps = { id: element.id, x: element.x, y: element.y, rotation: element.rotation, fill: element.fill, draggable: true, onDragEnd: (e: any) => handleDragEnd(element.id, e), onClick: () => handleSelectElement(element.id), stroke: isSelected ? '#c9754d' : undefined, strokeWidth: isSelected ? 2 : 0 }
                  if (element.type === 'rectangle') return <Rect key={element.id} {...commonProps} width={element.width} height={element.height} />
                  if (element.type === 'circle') return <Circle key={element.id} {...commonProps} radius={(element.width ?? 60) / 2} />
                  if (element.type === 'text') return <Text key={element.id} {...commonProps} text={element.text} fontSize={element.fontSize ?? 24} width={element.width} height={element.height} onDblClick={() => handleTextDblClick(element.id)} />
                  return null
                })}
                {selectedId && <Transformer ref={transformerRef} onTransformEnd={() => handleTransformEnd(selectedId)} padding={8} anchorSize={8} borderStroke="#c9754d" />}
              </Layer>
            </Stage>
          </div>
        </div>
        <PropertiesPanel element={getElement(canvas.elements, selectedId)} onUpdate={(patch) => selectedId && handleUpdateElement(selectedId, patch)} />
      </div>
    </div>
  )
}
