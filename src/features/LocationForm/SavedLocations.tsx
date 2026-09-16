import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import { useSpecifiedLocation } from '@/hooks';
import type { Geoname } from '@/services/geonames';
import { geonameToLabel } from '@/services/geonames/utils';
import { useSavedLocationStorage } from './useSavedLocationStorage';

interface Props {
	geoname: Geoname;
}

const SavedLocation = ({ geoname }: Props) => {
	const [savedLocations, setSavedLocations] = useSavedLocationStorage();
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();

	const isActive = specifiedLocation?.geonameId === geoname.geonameId;

	const handleClick = () => setSpecifiedLocation(geoname);
	const handleDelete = () => {
		const remainingLocations = savedLocations.filter(
			(o) => o.geonameId !== geoname.geonameId,
		);

		// handle deleting the specified location
		if (geoname.geonameId === specifiedLocation?.geonameId) {
			setSpecifiedLocation(
				remainingLocations.length > 0 ? remainingLocations.at(-1) : undefined,
			);
		}

		setSavedLocations(remainingLocations);
	};

	return (
		<Item variant="outline" size="xs">
			<ItemContent>
				<ItemTitle>{geoname.name}</ItemTitle>
				<ItemDescription>{geonameToLabel(geoname)}</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button
					onClick={handleClick}
					variant="secondary"
					size="sm"
					className={
						isActive
							? 'bg-green-100 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-900'
							: ''
					}
				>
					{isActive ? 'Active' : 'Select'}
				</Button>

				<Button onClick={handleDelete} variant="destructive" size="icon-sm">
					<X />
				</Button>
			</ItemActions>
		</Item>
	);
};

export const SavedLocations = () => {
	const [savedLocations] = useSavedLocationStorage();

	if (savedLocations.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2">
			<div>Saved Locations</div>
			<div className="flex flex-col gap-2 w-full">
				{savedLocations.map((location) => (
					<SavedLocation key={location.geonameId} geoname={location} />
				))}
			</div>
		</div>
	);
};
