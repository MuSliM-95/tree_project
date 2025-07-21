'use client'

import { memo, useEffect, useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	BaseHandle,
	BaseNode,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	NodeHeader,
	NodeHeaderActions,
	NodeHeaderIcon,
	NodeHeaderMenuAction,
	NodeHeaderTitle
} from '@/shared/components'

import { sendNode, toggleTab } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { IProps, TreeNode } from '../../types/tree.types'

export const BaseNodeDemo = memo(
	({
		selected,
		id,
		data,
		type,
		positionAbsoluteX,
		positionAbsoluteY,
		sourcePosition,
		targetPosition
	}: IProps) => {
		const dispatch = useAppDispatch()
		const pens = useAppSelector(state => state.tree.pens)

		const [pensState, setPensState] = useState(pens)

		useEffect(() => {
			setPensState(pens)
		}, [pens])

		const newNode: TreeNode = {
			id,
			type,
			data,
			position: { x: positionAbsoluteX, y: positionAbsoluteY },
			sourcePosition,
			targetPosition
		}

		const handleNodeClick = () => {
			dispatch(sendNode({ data: newNode }))
			dispatch(toggleTab({ tab: 'node' }))
		}

		return (
			<BaseNode selected={selected} onClick={handleNodeClick}>
				<div>
					<BaseHandle
						id={id}
						type='target'
						position={targetPosition!}
						style={{ visibility: pensState ? 'hidden' : undefined}}
					/>
					<BaseHandle
						id={id}
						type='source'
						position={sourcePosition!}
						style={{ visibility: pensState ? 'hidden' : undefined}}
					/>
				</div>

				<NodeHeader className='-mx-3 -mt-2'>
					<NodeHeaderIcon>
						<Avatar>
							<AvatarImage
								src={
									'https://cdn-icons-png.flaticon.com/512/149/149452.png'
								}
							/>
							<AvatarFallback>
								{data.label?.slice(0, 1) || ''}
							</AvatarFallback>
						</Avatar>
					</NodeHeaderIcon>
					<NodeHeaderTitle className='text-[8px]'>
						{data.label}
					</NodeHeaderTitle>
					<NodeHeaderActions>
						<NodeHeaderMenuAction label='Expand account options'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
						</NodeHeaderMenuAction>
					</NodeHeaderActions>
				</NodeHeader>
			</BaseNode>
		)
	}
)
