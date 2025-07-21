import { HandleType, NodeProps, Position } from '@xyflow/react'

export type TreeNode = {
	id: string
	data: {
		label: string
	}
	position: PositionType
	type?: string
	sourcePosition?: Position
	targetPosition?: Position
}

export type TreeEdge = {
	id: string
	source: string
	target: string
	style?: {
		stroke: string
	}
	animated: boolean
}

export type PositionType = {
	x: number
	y: number
}

export interface IProps extends NodeProps {
	data: {
		label: string
	}
	type: HandleType
}

export enum Theme {
	'LIGHT' = 'light',
	'DARK' = 'dark'
}
