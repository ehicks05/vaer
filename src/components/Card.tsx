import { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[];
	className?: string;
	gradient?: boolean;
}

const gradientStyles = 'bg-gradient-to-br from-violet-800 to-indigo-900';

const Card = ({ children, className, gradient = true }: Props) => (
	<div className={`rounded-lg ${gradient ? gradientStyles : ''} ${className}`}>
		{children}
	</div>
);

export default Card;
