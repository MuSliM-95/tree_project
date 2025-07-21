import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

import { Theme, TreeEdge, TreeNode } from '../types/tree.types'
import { Viewport } from '@xyflow/react'


export interface IInitialState {
	node: TreeNode | null
	edge: TreeEdge | null
	tab: string
	nodes: TreeNode[]
	edges: TreeEdge[]
	pens: boolean
	animated: boolean
	colorDefault: string
	theme: Theme
	viewport?: Viewport
}

const initialState: IInitialState = {
	node: null,
	edge: null,
	tab: 'tree',
	nodes: [],
	edges: [],
	pens: false,
	animated: false,
	colorDefault: 'grey',
	theme: Theme.LIGHT,
	viewport: undefined
}

const treeReducer = createSlice({
	name: 'tree',
	initialState,
	reducers: {
		sendNode(state, action: PayloadAction<{ data: TreeNode }>) {
			state.node = action.payload.data
		},

		sendEdge(state, action: PayloadAction<{ data: TreeEdge }>) {
			state.edge = action.payload.data
		},

		togglePens(state, action: PayloadAction<{ data: boolean }>) {
			state.pens = action.payload.data
		},

		toggleAnimated(state, action: PayloadAction<{ data: boolean }>) {
			state.animated = action.payload.data
		},

		toggleDefaultColor(state, action: PayloadAction<{ data: string }>) {
			state.colorDefault = action.payload.data
		},

		clearNodeEdge(state, action) {
			state.node = null
			state.edge = null
		},

		sendTree(state, action: PayloadAction<{ data: {nodes: TreeNode[], edges: TreeEdge[], theme: Theme, viewport?: Viewport} }>) {		
	          state.nodes = action.payload.data.nodes
	          state.edges = action.payload.data.edges
			  state.theme = action.payload.data.theme			  
			  state.viewport = action.payload.data.viewport
	
		},

		toggleTab(state, action: PayloadAction<{ tab: string }>) {
			state.tab = action.payload.tab
		}
	}
})

export const {
	sendNode,
	clearNodeEdge,
	sendTree,
	toggleTab,
	sendEdge,
	togglePens,
	toggleAnimated,
	toggleDefaultColor
} = treeReducer.actions
export default treeReducer.reducer
