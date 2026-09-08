import { MapPin, MapPinPlus } from 'lucide-react';
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
import { LocationForm } from '../LocationForm';

export const LocationDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" className="gap-2">
						Location
						<MapPinPlus />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-1">
						<MapPin />
						Location
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto no-scrollbar">
					<LocationForm />
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
