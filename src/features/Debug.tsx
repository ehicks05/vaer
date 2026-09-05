import { Bug } from 'lucide-react';
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
import { useResolvedLatLong, useSpecifiedLocation } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useResolvedLocation } from '@/hooks/useResolvedLocation';
import { useSavedLocationStorage } from './LocationForm/useSavedLocationStorage';

const Content = () => {
	const [savedLocations] = useSavedLocationStorage();
	const [specifiedLocation] = useSpecifiedLocation();
	const resolvedLocation = useResolvedLocation();
	const resolvedLatLong = useResolvedLatLong();
	const geolocation = useGeolocation();

	return (
		<pre className="whitespace-pre-wrap text-xs">
			{JSON.stringify(
				{
					savedLocations: savedLocations.map((o) => ({
						...o,
						alternateNames: undefined,
						bbox: undefined,
					})),
					specifiedLocation: {
						...specifiedLocation,
						alternateNames: undefined,
						bbox: undefined,
					},
					resolvedLocation,
					resolvedLatLong,
					geolocation,
				},
				null,
				2,
			)}
		</pre>
	);
};

export const Debug = () => {
	const [open, setOpen] = useState(false);

	if (import.meta.env.PROD) {
		return null;
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size="icon" className="text-muted-foreground">
						<Bug />
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-4xl">
				<DialogHeader>
					<DialogTitle>Debug</DialogTitle>
				</DialogHeader>

				<div className="overflow-auto h-260">
					<Content />
				</div>

				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
