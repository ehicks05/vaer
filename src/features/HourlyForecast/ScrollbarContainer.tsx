import type { ReactNode } from 'react';
import { Card } from '@/components';

export const SCROLLBAR_CLASS =
	'overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

export const ScrollbarContainer = ({ children }: { children: ReactNode }) => (
	<Card>
		<div className={`flex gap-6 overflow-auto p-4 pb-2 ${SCROLLBAR_CLASS}`}>
			{children}
		</div>
	</Card>
);
