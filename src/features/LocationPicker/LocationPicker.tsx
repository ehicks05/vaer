import { Settings } from 'lucide-react';
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
import { UnitSystemToggle } from '../UnitSystem';
import { LocationForm } from './LocationForm';

const KeyboardShortcut = () => (
	<div className="ml-4 -mr-1 flex items-center gap-0.5 bg-muted px-2 rounded-sm text-xs">
		<span className="text-base">⌘</span>
		<span>K</span>
	</div>
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
			<DialogTrigger
				render={
					<Button variant="outline" className="gap-0 sm:gap-4 text-muted-foreground">
						<Settings />
						<KeyboardShortcut />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				Units
				<UnitSystemToggle />
				<DialogTitle>Choose a Location</DialogTitle>
				<LocationForm />
				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
