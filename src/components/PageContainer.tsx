import { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[];
}

export const PageContainer = ({ children }: Props) => {
	return (
		<div className={'flex max-w-screen-xl w-full px-2 sm:px-8 mx-auto flex-grow'}>
			{children}
		</div>
	);
};
