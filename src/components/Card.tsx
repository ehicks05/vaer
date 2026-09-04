import type { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[];
	className?: string;
	gradient?: boolean;
}

const gradientStyles =
	'bg-linear-to-br from-violet-100 to-indigo-200 dark:from-violet-800 dark:to-indigo-900';

const Card = ({ children, className, gradient = true }: Props) => (
	<div className={`rounded-lg ${gradient ? gradientStyles : ''} ${className}`}>
		{children}
	</div>
);

export default Card;
