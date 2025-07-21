'use client'

import {
	LayoutTemplate,
	MessageSquare,
	Settings,
	Share2,
	Split
} from 'lucide-react'
import { useEffect, useState } from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/shared/components'

import { NodeForm } from './NodeForm'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { toggleTab } from '../../hooks'
import { EdgeForm } from './EdgeForm'
import { TreePattern } from './TreePattern'
import { useReactFlow } from '@xyflow/react'


const tabs = [
	{ id: 'node', icon: Share2 },
	{ id: 'edge',   icon: Split },
	{ id: 'tree',  icon: LayoutTemplate },
	{ id: 'animation',  icon: MessageSquare },
	{ id: 'settings',   icon: Settings }
]


export default function SidebarWithContent() {
	const dispatch = useAppDispatch()
	const { getNodes } = useReactFlow()

	const selectedNode  = useAppSelector(state => state.tree.node)
	const edge = useAppSelector(state => state.tree.edge)
	const tab  = useAppSelector(state => state.tree.tab)
	const pens  = useAppSelector(state => state.tree.pens)
	const animated  = useAppSelector(state => state.tree.animated)
    const colorDefault = useAppSelector(state => state.tree.colorDefault)

	const [activeTab, setActiveTab] = useState(tab)
	const [edgeState, setEdgeState] = useState(edge)
	const [pensState, setPensState] = useState(!pens)
	const [animatedState, setAnimatedState] = useState(animated)

	useEffect(() => {
		setActiveTab(tab)
		setEdgeState(edge)
		setPensState(!pens)
		setAnimatedState(animated)
	}, [selectedNode, tab, edge, pens])

	return (
		<Sidebar collapsible='icon'>
			<div className='flex h-full w-full'>
				<div className='bg-muted w-14 border-r'>
					{' '}
					<SidebarMenu >
						{tabs.map(({ id, icon: Icon }) => (
							<SidebarMenuItem
								key={id}
								// isActive={activeTab === id}
							>
								<SidebarMenuButton
									onClick={() => dispatch(toggleTab({tab: id}))}
								>
									<Icon className='h-5 w-5' />
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</div>

				<SidebarContent className='bg-white'>
					{activeTab === 'node' && <NodeForm selectedNode={selectedNode} />}
					{activeTab === 'edge' && <EdgeForm edge={edgeState} setEdgeState={setEdgeState} />}

					{activeTab === 'tree' && <TreePattern colorDefault={colorDefault} animated={animatedState} pens={pensState} selectedNode={selectedNode} nodeCount={getNodes().length}/>}
					{activeTab === 'animation' && (
						<div className='p-4 text-sm'>
							Здесь появятся настройки анимаций
						</div>
					)}
					{activeTab === 'settings' && (
						<div className='p-4 text-sm'>
							Общие настройки редактора
						</div>
					)}
				</SidebarContent>
			</div>
		</Sidebar>
	)
}
