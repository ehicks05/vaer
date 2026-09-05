import { MapPin, Ruler, Settings } from 'lucide-react';
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
import { LocationForm } from '../../LocationForm';
import { UnitSystemToggle } from '../../UnitSystem';

const KeyboardShortcut = () => (
	<div className="-mr-1.5 flex items-center gap-0.5 bg-muted px-2 rounded-sm text-xs">
		<span className="text-base">⌘</span>
		<span>K</span>
	</div>
);

export const SettingsDialog = () => {
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
					<Button variant="outline" className="gap-2 text-muted-foreground">
						<Settings className="sm:hidden" />
						<span className="hidden sm:inline">Settings</span>
						<KeyboardShortcut />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto no-scrollbar">
					<DialogTitle className="flex items-center gap-1">
						<MapPin />
						Location
					</DialogTitle>
					<LocationForm />

					<div className="flex flex-col gap-6">
						<DialogTitle className="flex items-center gap-1">
							<Ruler />
							Units
						</DialogTitle>
						<UnitSystemToggle />
					</div>
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
