import { CurrentLocationSection } from './CurrentLocation';
import { LocationSearch } from './LocationSearch';
import { SavedLocations } from './SavedLocations';

export const LocationForm = () => {
	return (
		<div className="flex flex-col gap-6">
			<CurrentLocationSection />
			<SavedLocations />
			<LocationSearch />
		</div>
	);
};
