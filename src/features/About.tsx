import { CircleQuestionMarkIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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

export const About = () => {
	const [open, setOpen] = useState(false);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault();
				setOpen(!open);
			}
		},
		[open],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

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

				{LINKS.map((link) => (
					<Link key={link.url} href={link.url}>
						{link.label}
					</Link>
				))}

				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
