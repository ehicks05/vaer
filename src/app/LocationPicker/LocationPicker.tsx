import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { NAV_BAR_BUTTON_STYLES } from '../../constants/classes';
import { LocationForm } from './LocationForm';

const LocationButton = () => {
	return (
		<div className="flex gap-2 sm:gap-16 items-baseline">
			<div className="ml-2">Location...</div>
			<div className="flex items-center gap-0.5 bg-neutral-800 px-2 m-0.5 rounded-sm text-xs">
				<span className="text-base">⌘</span>
				<span>K</span>
			</div>
		</div>
	);
};

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
			<DialogTrigger className={NAV_BAR_BUTTON_STYLES}>
				<LocationButton />
			</DialogTrigger>
			<DialogContent className="bg-neutral-800">
				<DialogHeader>
					<DialogTitle>Choose a Location</DialogTitle>
				</DialogHeader>
				<LocationForm />
				<DialogFooter>
					<DialogClose className={NAV_BAR_BUTTON_STYLES}>
						<Button>Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
