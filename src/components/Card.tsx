import { cn } from 'cn';
import type { ReactNode } from 'react';

interface Props {
	children?: ReactNode | ReactNode[];
	className?: string;
	gradient?: boolean;
}

export const Card = ({ children, className, gradient = true }: Props) => (
	<div
		className={cn(
			'rounded-lg',
			`${gradient ? 'bg-white dark:bg-linear-to-br dark:from-violet-800 dark:to-indigo-900' : 'bg-muted'}`,
			className,
		)}
	>
		{children}
	</div>
);
