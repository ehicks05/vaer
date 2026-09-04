import { round } from 'es-toolkit';
import { About } from '@/features/About';
import { useResolvedLatLong } from '@/hooks';

export const Footer = () => {
	const { lat, long } = useResolvedLatLong();
	const coords = lat
		? `${round(Number(lat || 0), 2)},${round(Number(long || 0), 2)}`
		: null;

	return (
		<footer className="flex items-center justify-end gap-4 px-2 py-4 max-w-7xl mx-auto w-full">
			<span className="text-sm text-muted-foreground">{coords}</span>
			<About />
		</footer>
	);
};
