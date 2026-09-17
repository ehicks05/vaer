import { Bug } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useResolvedLocation, useSpecifiedLocation } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeatherGov } from '@/services/weathergov';
import { useSavedLocationStorage } from '../../LocationForm/useSavedLocationStorage';

const Content = () => {
	const [savedLocations] = useSavedLocationStorage();
	const [specifiedLocation] = useSpecifiedLocation();
	const resolvedLocation = useResolvedLocation();
	const geolocation = useGeolocation();
	const { alertsQuery } = useWeatherGov();

	return (
		<div className="grid grid-cols-2">
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
						geolocation,
					},
					null,
					2,
				)}
			</pre>
			<pre className="whitespace-pre-wrap text-xs">
				{JSON.stringify({ alertsQuery: alertsQuery.data }, null, 2)}
			</pre>
		</div>
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
				Debug
				<div className="overflow-y-auto max-h-[50vh]">
					<Content />
				</div>
			</DialogContent>
		</Dialog>
	);
};
