import type { ReactNode } from 'react';
import { Card } from '@/components';

export const ScrollbarContainer = ({ children }: { children: ReactNode }) => (
	<Card>
		<div className="flex gap-6 p-4 overflow-x-scroll scroll-fade-TODO">
			{children}
		</div>
	</Card>
);
