'use client'

import { ReactFlowProvider } from '@xyflow/react'


import TreeSidebarProvider from '@/shared/providers/SidebarProvider'
import GenealogyEditor from '@/features/tree/components/ui/GenealogyEditor'
;

export default function TreePage() {
	
	return (
		<ReactFlowProvider>
			<TreeSidebarProvider >
				<GenealogyEditor  />
			</TreeSidebarProvider>
		</ReactFlowProvider>
	)
}
