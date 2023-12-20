import { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[];
	className?: string;
}

const gradient = 'bg-gradient-to-br from-violet-800 to-indigo-900';

const Card = ({ children, className }: Props) => (
	<div className={`rounded-lg ${gradient} ${className}`}>{children}</div>
);

export default Card;
