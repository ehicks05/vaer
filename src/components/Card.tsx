import type { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[];
	className?: string;
	gradient?: boolean;
}

const gradientStyles =
	'bg-white dark:bg-linear-to-br dark:from-violet-800 dark:to-indigo-900';

export const Card = ({ children, className, gradient = true }: Props) => (
	<div
		className={`rounded-lg ${gradient ? gradientStyles : 'bg-muted'} ${className}`}
	>
		{children}
	</div>
);
