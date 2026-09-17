import { round } from 'es-toolkit';
import { FieldLabel } from '@/components/ui/field';
import { useResolvedLocation } from '@/hooks';

const LINKS = [
	{ label: 'open-meteo', url: 'https://open-meteo.com/' },
	{ label: 'github', url: 'https://www.github.com/ehicks05/vaer/' },
	{ label: 'ehicks', url: 'https://ehicks.net' },
];

interface LinkProps {
	href: string;
	children: React.ReactNode;
}
const Link = ({ href, children }: LinkProps) => (
	<a
		href={href}
		className="text-blue-500 hover:underline hover:text-blue-400"
		target="_blank"
		rel="noreferrer"
	>
		{children}
	</a>
);

export const About = () => {
	const { lat, long } = useResolvedLocation();
	const coords = lat
		? `${round(Number(lat || 0), 2)},${round(Number(long || 0), 2)}`
		: null;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col">
				<FieldLabel>Selected Coordinates</FieldLabel>
				<span>{coords}</span>
			</div>
			<div className="flex flex-col">
				<FieldLabel>Links</FieldLabel>
				{LINKS.map((link) => (
					<Link key={link.url} href={link.url}>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	);
};
