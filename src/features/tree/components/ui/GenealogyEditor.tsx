'use client'

import { BaseNodeDemo, SaveButton } from '..'
import {
	Background,
	BackgroundVariant,
	Connection,
	Controls,
	Edge,
	NodeChange,
	ReactFlow,
	Viewport,
	addEdge,
	applyNodeChanges,
	useEdgesState,
	useNodesState,
	useReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { clearNodeEdge, sendEdge, sendNode, toggleTab } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { Theme, TreeEdge, TreeNode } from '../../types'

import { ThemePane } from './ThemePane'

export default function GenealogyEditor() {
	const dispatch = useAppDispatch()
	const changedNodesRef = useRef<TreeNode[]>([])
	const { setViewport } = useReactFlow()
	const hasMovedRef = useRef(false)

	const initialNodes = useAppSelector(state => state.tree.nodes)
	const initialEdges = useAppSelector(state => state.tree.edges)
	const tab = useAppSelector(state => state.tree.tab)
	const animated = useAppSelector(state => state.tree.animated)
	const colorDefault = useAppSelector(state => state.tree.colorDefault)
	const themeState = useAppSelector(state => state.tree.theme)
	const viewport = useAppSelector(state => state.tree.viewport)

	const [nodes, setNodes] = useNodesState<any>(initialNodes || [])
	const [edges, setEdges, onEdgesChange] = useEdgesState<any>(
		initialEdges || []
	)
	const [theme, setTheme] = useState<Theme>(themeState)
	const [viewportZoom, setViewportZoom] = useState<Viewport>()

	const edgeOptions = {
		animated: animated,
		style: {
			stroke: colorDefault
		}
	}

	const onNodesChange = useCallback((changes: NodeChange[]) => {
		setNodes(prevNodes => {
			const updated = applyNodeChanges(changes, prevNodes)

			// накапливаем ноды, которые двинулись
			const moved: TreeNode[] = []
			for (const change of changes) {
				if (change.type === 'position' && change.dragging === false) {
					const updatedNode = updated.find(n => n.id === change.id)
					if (updatedNode) {
						moved.push(updatedNode)
					}
				}
			}

			// запоминаем для отправки (вынесем dispatch за пределы setState)
			changedNodesRef.current = moved

			return updated
		})
	}, [])

	useEffect(() => {
		if (changedNodesRef.current.length > 0) {
			for (const node of changedNodesRef.current) {
				dispatch(sendNode({ data: node }))
			}
			changedNodesRef.current = []
		}
	}, [nodes])

	useEffect(() => {
		if (viewport) {
			requestAnimationFrame(() => {
				setViewport(viewport)
			})
		}
	}, [viewport])

	const handleEdgeClick = useCallback(
		(_: any, edge: Edge) => {
			dispatch(sendEdge({ data: edge as TreeEdge }))
			dispatch(toggleTab({ tab: 'edge' }))
		},
		[dispatch]
	)

	const handlePaneClick = useCallback(() => {
		if (tab === 'edge') {
			dispatch(toggleTab({ tab: 'node' }))
		}
		dispatch(clearNodeEdge({}))
	}, [dispatch, tab])

	const nodeTypes = {
		baseNode: BaseNodeDemo
	}

	const handleMove = useCallback(
		(_: any, viewport: Viewport) => {
			if (hasMovedRef.current) {
				console.log(viewport)
				setViewportZoom(viewport)
			} else {
				hasMovedRef.current = true
			}
		},
		[dispatch]
	)

	const onConnect = useCallback(
		(params: Connection) => setEdges(eds => addEdge(params, eds)),
		[setEdges]
	)

	return (
		<div className='absolute right-0 flex h-lvh w-screen border-2'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				defaultEdgeOptions={edgeOptions}
				onConnect={onConnect}
				onEdgeClick={handleEdgeClick}
				onPaneClick={handlePaneClick}
				onMove={handleMove}
				nodeTypes={nodeTypes}
				// fitView
				className='intersection-flow'
				selectNodesOnDrag={false}
			>
				<Controls />
				<SaveButton
					theme={theme}
					className='absolute right-4 z-100 mt-4 bg-indigo-800'
					viewportZoom={viewportZoom}
				/>
				<ThemePane theme={theme} setTheme={setTheme} />
				<Background
					bgColor={theme === Theme.DARK ? '#1e1e1e' : '#ffffff'}
					variant={BackgroundVariant.Dots}
					gap={25}
					size={1}
				/>
			</ReactFlow>
		</div>
	)
}
