import { Debug } from './Debug';

export const Footer = () => {
	if (import.meta.env.PROD) {
		return null;
	}

	return (
		<footer className="flex items-center justify-end gap-4 p-4 max-w-7xl w-full mx-auto">
			<Debug />
		</footer>
	);
};
