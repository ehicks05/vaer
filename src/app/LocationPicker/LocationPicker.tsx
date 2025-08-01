import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useActiveLocation } from '@/hooks';
import { useQueryPermission } from '@/hooks/usePermission';
import { NAV_BAR_BUTTON_STYLES } from '../../constants/classes';
import { LocationForm } from './LocationForm';

const LocationButton = () => {
	const geoPermission = useQueryPermission({ name: 'geolocation' });
	const [activeLocation] = useActiveLocation();

	const shouldPickLocation =
		!geoPermission.isLoading && geoPermission.state === 'prompt' && !activeLocation;

	return (
		<div
			className={`flex gap-2 sm:gap-16 items-baseline ${shouldPickLocation ? 'animate-pulse' : ''}`}
		>
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
			<DialogPortal>
				<DialogOverlay />
				<DialogContent className="bg-neutral-800">
					<DialogHeader>
						<DialogTitle>Choose a Location</DialogTitle>
						<DialogDescription className="hidden">
							Choose a location
						</DialogDescription>
					</DialogHeader>
					<LocationForm />
					<div className="flex">
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};
