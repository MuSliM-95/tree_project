import { useReactFlow } from '@xyflow/react'
import React, { useState } from 'react'

import { Button, Card, Checkbox, Input, Label } from '@/shared/components'

import { toggleAnimated, toggleDefaultColor, togglePens } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'
import { TreeNode } from '../../types'

interface Props {
	selectedNode: TreeNode | null
	className?: string
	nodeCount?: number
	pens: boolean
	animated: boolean
	colorDefault: string
}

export const TreePattern: React.FC<Props> = ({
	selectedNode,
	className,
	nodeCount = 0,
	pens,
	animated,
	colorDefault
}) => {
	const { setEdges } = useReactFlow()
	const dispatch = useAppDispatch()

	const [edgeColor, setEdgeColor] = useState(colorDefault)
	const [showHandles, setShowHandles] = useState(pens)
	const [isAnimated, setIsAnimated] = useState(animated)

	const handlerUpdate = () => {
		setEdges(edges =>
			edges.map(edge => ({
				...edge,
				style: { ...edge.style, stroke: edgeColor },
				markerStart: '',
				markerEnd: '',
				animated: isAnimated
			}))
		)
		dispatch(togglePens({ data: !showHandles }))
		dispatch(toggleAnimated({ data: isAnimated }))
		dispatch(toggleDefaultColor({ data: edgeColor }))
	}

	return (
		<Card className={`space-y-6 p-6 ${className}`}>
			{/* Информация о дереве */}
			<section className='space-y-1'>
				<h2 className='text-xl font-bold'>Ваше дерево</h2>
				<p className='text-muted-foreground text-sm'>
					Количество узлов:{' '}
					<span className='font-medium'>{nodeCount}</span>
				</p>
			</section>

			{/* Ключевые моменты */}
			<section className='space-y-2'>
				<h3 className='text-lg font-semibold'>Ключевые моменты</h3>
				<ul className='text-muted-foreground list-inside list-disc text-sm'>
					<li>Гибкая и наглядная структура</li>
					<li>Автоматическое построение связей</li>
					<li>Лёгкое редактирование узлов</li>
				</ul>
			</section>

			{/* Вид */}
			<section className='space-y-4'>
				<h3 className='text-lg font-semibold'>Вид</h3>

				{/* Цвет ветки */}
				<div className='space-y-1'>
					<Label htmlFor='edge-color'>Цвет ветки</Label>
					<Input
						id='edge-color'
						type='color'
						value={edgeColor}
						onChange={e => setEdgeColor(e.target.value)}
						className='h-10 w-full p-1'
					/>
				</div>

				{/* Ручки */}
				<div className='flex items-center gap-2'>
					<Checkbox
						id='handles'
						checked={showHandles}
						onCheckedChange={checked =>
							setShowHandles(Boolean(checked))
						}
					/>
					<Label htmlFor='handles'>Показать ручки</Label>
				</div>

				{/* Анимация */}
				<div className='flex items-center gap-2'>
					<Checkbox
						id='animation'
						checked={isAnimated}
						onCheckedChange={checked =>
							setIsAnimated(Boolean(checked))
						}
					/>
					<Label htmlFor='animation'>Анимировать ветки</Label>
				</div>
				<Button onClick={handlerUpdate}>Применить изменения</Button>
			</section>

			{/* Шаблоны */}
			<section className='space-y-2'>
				<h3 className='text-lg font-semibold'>Шаблоны</h3>
				<ul className='text-muted-foreground list-inside list-disc text-sm'>
					<li>Классическое вертикальное дерево</li>
					<li>Горизонтальная временная шкала</li>
					<li>Центральный предок — радиальная схема</li>
				</ul>
			</section>
		</Card>
	)
}
