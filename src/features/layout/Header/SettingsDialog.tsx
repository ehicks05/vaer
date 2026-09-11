import { MapPin, Settings } from 'lucide-react';
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
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { LocationForm } from '../../LocationForm';
import { UnitSystemToggle } from '../../UnitSystem';

const KeyboardShortcut = () => (
	<div className="-mr-1.5 hidden sm:flex items-center gap-0.5 bg-muted px-2 rounded-sm text-xs">
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
						<span>Settings</span>
						<KeyboardShortcut />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-6 min-h-[41vh] max-h-[75vh] overflow-y-auto scrollbar-thin">
					<Tabs defaultValue="location" className="">
						<TabsList className="w-full">
							<TabsTrigger value="location">
								<MapPin />
								Location
							</TabsTrigger>
							<TabsTrigger value="general">
								<Settings />
								General
							</TabsTrigger>
						</TabsList>
						<TabsContent value="location" className="flex flex-col gap-2 pt-2">
							<DialogTitle className="flex items-center gap-1">Location</DialogTitle>
							<LocationForm />
						</TabsContent>
						<TabsContent value="general" className="flex flex-col gap-2 pt-2">
							<DialogTitle className="flex items-center gap-1">General</DialogTitle>

							<Field>
								<FieldLabel htmlFor="name">Theme</FieldLabel>
								<ModeToggle />
							</Field>
							<Field>
								<FieldLabel htmlFor="name">Unit System</FieldLabel>
								<UnitSystemToggle />
							</Field>
						</TabsContent>
					</Tabs>
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
