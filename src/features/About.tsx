import { round } from 'es-toolkit';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useResolvedLatLong } from '@/hooks';

export const LINKS = [
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

const AboutContents = () => {
	const { lat, long } = useResolvedLatLong();
	const coords = lat
		? `${round(Number(lat || 0), 2)},${round(Number(long || 0), 2)}`
		: null;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col">
				Selected Coordinates: <span>{coords}</span>
			</div>
			<div className="flex flex-col">
				Links:
				{LINKS.map((link) => (
					<Link key={link.url} href={link.url}>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	);
};

export const About = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size="icon" className="text-muted-foreground">
						<CircleQuestionMarkIcon />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>About</DialogTitle>
				</DialogHeader>

				<AboutContents />

				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
