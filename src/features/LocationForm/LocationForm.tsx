import { useSpecifiedLocation } from '@/hooks';
import { CityOption } from './CityOption';
import { CurrentLocation } from './CurrentLocation';
import { LocationSearch } from './LocationSearch';
import { useSavedLocationStorage } from './useSavedLocationStorage';

export const SavedLocations = () => {
	const [savedLocations, setSavedLocations] = useSavedLocationStorage();
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();

	if (savedLocations.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2">
			<div>Saved Locations</div>
			<div className="flex flex-col gap-2 w-full">
				{savedLocations.map((location) => {
					const handleDelete = () => {
						const remainingLocations = savedLocations.filter(
							(o) => o.geonameId !== location.geonameId,
						);

						// handle deleting the specified location
						if (location.geonameId === specifiedLocation?.geonameId) {
							setSpecifiedLocation(
								remainingLocations.length > 0 ? remainingLocations[0] : undefined,
							);
						}

						setSavedLocations(remainingLocations);
					};
					return (
						<CityOption
							key={location.geonameId}
							city={location}
							isActive={specifiedLocation?.geonameId === location.geonameId}
							onClick={() => setSpecifiedLocation(location)}
							onDelete={handleDelete}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const LocationForm = () => {
	return (
		<div className="flex flex-col gap-6">
			<CurrentLocation />
			<SavedLocations />
			<LocationSearch />
		</div>
	);
};
