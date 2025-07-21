'use client'

import { Position, useReactFlow } from '@xyflow/react'
import { useEffect, useState } from 'react'

import { Button, Card, Input, Label } from '@/shared/components'

import { clearNodeEdge, togglePens } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { TreeNode } from '../../types'

type Props = {
	selectedNode: TreeNode | null
}
export function NodeForm({ selectedNode }: Props) {
	const dispatch = useAppDispatch()


	const { addNodes, setNodes, setEdges, getNodes } = useReactFlow()

	const [label, setLabel] = useState(selectedNode?.data.label || '')
	const [x, setX] = useState(String(selectedNode?.position.x ?? 0))
	const [y, setY] = useState(String(selectedNode?.position.y ?? 0))
	const [type, setType] = useState(selectedNode?.type || 'baseNode')
	const [handlePosition, setHandlePosition] = useState({
		source: selectedNode?.sourcePosition,
		target: selectedNode?.targetPosition
	})

	useEffect(() => {
		if (selectedNode) {
			setLabel(selectedNode.data.label)
			setX(selectedNode.position.x.toString())
			setY(selectedNode.position.y.toString())
			setHandlePosition({
				source: selectedNode.sourcePosition,
				target: selectedNode.targetPosition
			})
		} else {
			setLabel('default-node')
			setX('0')
			setY('0')
			setHandlePosition({
				source: Position.Bottom,
				target: Position.Top
			})
		}
	}, [selectedNode])

	const handleSubmit = () => {
		const node = {
			id: selectedNode ? selectedNode.id : Date.now().toString(),
			data: { label },
			position: { x: Number(x), y: Number(y) },
			type,
			sourcePosition: handlePosition.source,
			targetPosition: handlePosition.target
		}
		dispatch(togglePens({data: false}))
		addNodes(node)
	}

	const handleDeleteClick = () => {
		if (selectedNode) {
			setNodes(nodes => nodes.filter(node => node.id !== selectedNode.id))
			setEdges(edges =>
				edges.filter(
					edge =>
						edge.source !== selectedNode.id &&
						edge.target !== selectedNode.id
				)
			)
			dispatch(clearNodeEdge({}))
		}
	}
	return (
		<>
			<Card className='w-full space-y-4 p-6'>
				<h2 className='text-lg font-semibold'>Настройки узла</h2>

				<div className='space-y-2'>
					<Label htmlFor='name'>Название узла</Label>
					<Input
						id='name'
						placeholder='Введите имя узла'
						value={label}
						onChange={e => setLabel(e.target.value)}
					/>
				</div>

				<div className='flex gap-2'>
					<div className='flex-1'>
						<Label htmlFor='pos-x'>Позиция X</Label>
						<Input
							id='pos-x'
							value={x}
							onChange={e => setX(e.target.value)}
						/>
					</div>
					<div className='flex-1'>
						<Label htmlFor='pos-y'>Позиция Y</Label>
						<Input
							id='pos-y'
							value={y}
							onChange={e => setY(e.target.value)}
						/>
					</div>
				</div>
				<Button onClick={handleSubmit} className='mt-2 mb-0 w-full'>
					{selectedNode ? 'Применить изменения' : '+ Добавить узел'}
				</Button>
				<Button
					onClick={handleDeleteClick}
					disabled={!selectedNode}
					className='w-full bg-red-600'
				>
					Удалить узел
				</Button>
			</Card>
		</>
	)
}
