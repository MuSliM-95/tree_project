import { useReactFlow } from '@xyflow/react'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { Button, Card, Checkbox, Input, Label } from '@/shared/components'

import { sendEdge } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'
import { TreeEdge } from '../../types'

interface Props {
	edge: TreeEdge | null
	setEdgeState: Dispatch<SetStateAction<TreeEdge | null>>
}

export const EdgeForm: React.FC<Props> = ({ edge, setEdgeState }) => {
	const { setEdges } = useReactFlow()
	const dispatch = useAppDispatch()

	const handleDeleteClick = () => {
		setEdges(edges => edges.filter(edg => edg.id !== edge?.id))
	}

	const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!edge) return

		const updatedEdge = {
			...edge,
			style: { ...edge.style, stroke: e.target.value }
		}

		setEdgeState(updatedEdge)
		setEdges(edges =>
			edges.map(edg => (edg.id === edge?.id ? updatedEdge : edg))
		)
	}

	const handleUpdateClick = () => {
		setEdges(edges =>
			edges.map(edg =>
				edg.id === edge?.id
					? {
							...edge,
							animated: !edg.animated,
							style: { ...edge.style, stroke: edge.style?.stroke }
						}
					: edg
			)
		)
		if (edge) {
			dispatch(
				sendEdge({
					data: {
						...edge,
						animated: !edge.animated,
						style: { ...edge.style, stroke: edge.style?.stroke! }
					}
				})
			)
		}
	}

	return (
		<>
			<Card className='w-full space-y-4 p-6'>
				<h2 className='text-lg font-semibold'>Настройки ветки</h2>
				<div className='flex items-center gap-4'>
					<Label htmlFor='name'>ID ветки</Label>
					<div className='p-1'>{edge?.id.slice(0, 10)}</div>
				</div>
				<div className='flex items-center gap-4'>
					<Label htmlFor='name'>source</Label>
					<div className='p-1'>{edge?.source}</div>
				</div>
				<div className='flex items-center gap-4'>
					<Label htmlFor='name'>target</Label>
					<div className='p-1'>{edge?.target}</div>
				</div>
				<div className='flex items-center gap-4'>
					<Label htmlFor='name'>Цвет</Label>
					<Input
						type='color'
						disabled={!edge}
						value={edge?.style?.stroke}
						onChange={onChangeColor}
						className='p-1'
					/>
				</div>
				<div className='flex items-center gap-4'>
					<Label htmlFor='name'>Анимация</Label>
					<Checkbox
						disabled={!edge}
						onClick={handleUpdateClick}
						checked={edge?.animated}
					/>
				</div>
				<Button
					onClick={handleDeleteClick}
					disabled={!edge}
					className='w-full bg-red-600'
				>
					Удалить ветку
				</Button>
			</Card>
		</>
	)
}
