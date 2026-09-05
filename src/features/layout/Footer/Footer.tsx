import { About } from './About';
import { Debug } from './Debug';

export const Footer = () => (
	<footer className="flex items-center justify-end gap-4 p-4 max-w-7xl w-full mx-auto">
		<About />
		<Debug />
	</footer>
);
