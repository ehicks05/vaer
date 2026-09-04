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
import { LocationForm } from './LocationForm';

const KeyboardShortcut = () => (
	<div className="ml-4 -mr-1 flex items-center gap-0.5 bg-muted px-2 rounded-sm text-xs">
		<span className="text-base">⌘</span>
		<span>K</span>
	</div>
);

const LocationButton = () => (
	<Button variant="outline" className="gap-2 sm:gap-10 text-muted-foreground">
		Location...
		<KeyboardShortcut />
	</Button>
);

export const LocationPicker = () => {
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
			<DialogTrigger>
				<LocationButton />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Choose a Location</DialogTitle>
				</DialogHeader>
				<LocationForm />
				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
