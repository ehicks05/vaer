import { Ghost, Loader2, Search, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useSpecifiedLocation } from '@/hooks';
import { useSearch } from '@/services/geonames/geonames';
import { CityOption } from './CityOption';
import { CurrentLocation } from './CurrentLocation';
import { useSavedLocationStorage } from './useSavedLocationStorage';

export const LocationSearcher = () => {
	const [savedLocations, setSavedLocations] = useSavedLocationStorage();
	const [_, setSpecifiedLocation] = useSpecifiedLocation();

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedLocations.map((o) => o.geonameId);
	const locations = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex flex-col gap-2">
			Search for a location
			<input
				className="p-2 rounded-lg outline-hidden"
				value={queryString}
				onChange={(e) => setQueryString(e.target.value)}
				placeholder="Search..."
			/>
			<div className="flex flex-col gap-2 w-full">
				{locations.length === 0 && (
					<div className="flex flex-col items-center p-4 text-muted-foreground rounded-lg border">
						{query.isFetching ? (
							<>
								<Loader2 size={48} className="animate-spin" />
								Searching...
							</>
						) : query.isError ? (
							<>
								<TriangleAlert size={48} className="text-red-600" />
								Something went wrong. Try again later.
							</>
						) : query.isSuccess && locations.length === 0 ? (
							<>
								<Ghost size={48} />
								Nothing was found
							</>
						) : (
							<>
								<Search size={48} />
								Search for a city
							</>
						)}
					</div>
				)}
				{locations.map((location) => {
					const isSaved = savedLocations.some(
						(c) => c.geonameId === location.geonameId,
					);
					const onClick = isSaved
						? () =>
								setSavedLocations(
									savedLocations.filter((c) => c.geonameId !== location.geonameId),
								)
						: () => {
								setSavedLocations([...savedLocations, location]);
								setSpecifiedLocation(location);
							};
					return (
						<CityOption
							key={location.geonameId}
							city={location}
							isActive={false}
							onClick={onClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const SavedLocations = () => {
	const [savedLocations, setSavedLocations] = useSavedLocationStorage();
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();

	return (
		<div className="flex flex-col gap-2">
			<div>Saved Locations</div>
			<div className="flex flex-col gap-2 w-full">
				{savedLocations.map((location) => {
					const onClick = () => {
						setSavedLocations(
							savedLocations.filter((c) => c.geonameId !== location.geonameId),
						);
						if (location.geonameId === specifiedLocation?.geonameId) {
							setSpecifiedLocation(undefined);
						}
					};
					return (
						<CityOption
							key={location.geonameId}
							city={location}
							isActive={specifiedLocation?.geonameId === location.geonameId}
							onClick={() => setSpecifiedLocation(location)}
							onDelete={onClick}
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
			<LocationSearcher />
			<SavedLocations />
			<CurrentLocation />
		</div>
	);
};
