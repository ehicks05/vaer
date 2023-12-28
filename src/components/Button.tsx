import clsx from 'clsx';
import React, { MouseEvent } from 'react';

interface Props {
	className?: string;
	disabled?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}

const Button = ({ className, disabled, onClick, children }: Props) => (
	<button
		type="button"
		disabled={disabled}
		onClick={onClick}
		className={clsx(
			'px-3 py-1.5 border rounded-lg',
			'border-gray-800 text-white bg-indigo-900',
			{ 'opacity-50 cursor-default': disabled },
			{ 'hover:bg-indigo-800': !disabled },
			className,
		)}
	>
		{children}
	</button>
);

export default Button;
