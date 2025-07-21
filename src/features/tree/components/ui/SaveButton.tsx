'use client'

import { Viewport, useReactFlow } from '@xyflow/react'
import React, { useCallback } from 'react'

import { Button } from '@/shared/components'

import { sendTree } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'
import { Theme, TreeEdge, TreeNode } from '../../types'

interface Props {
	className?: string
	theme: Theme,
	viewportZoom?: Viewport
}

export const SaveButton: React.FC<Props> = ({ className, theme, viewportZoom }) => {
	const { getEdges, getNodes, getViewport } = useReactFlow()
	const dispatch = useAppDispatch()


	const handlerSaveTree = useCallback(() => {
		const nodes = getNodes() as TreeNode[]
		const edges = getEdges() as TreeEdge[]

		dispatch(sendTree({ data: { nodes, edges, theme, viewport: viewportZoom } }))
	}, [dispatch, getEdges, getNodes, theme, viewportZoom ])

	return (
		<Button onClick={handlerSaveTree} className={className}>
			Сохранить дерево
		</Button>
	)
}
