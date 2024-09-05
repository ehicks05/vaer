import { Card } from '@/components';
import { useActiveLocation, useSavedLocations } from '@/hooks';
import { useSearch } from '@/services/geonames/geonames';
import { useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';
import { HiExclamationTriangle, HiMagnifyingGlass } from 'react-icons/hi2';
import { CityOption } from './CityOption';
import { CurrentLocation } from './CurrentLocation';

export const LocationForm = () => {
	const [savedLocations, setSavedLocations] = useSavedLocations();
	const [activeLocation, setActiveLocation] = useActiveLocation();

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedLocations.map((o) => o.geonameId);
	const locations = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex flex-col md:flex-row gap-4 h-full overflow-y-auto">
			<div className="flex flex-col gap-4">
				Search for a location
				<input
					className="p-2 rounded-lg"
					value={queryString}
					onChange={(e) => setQueryString(e.target.value)}
					placeholder="Search..."
				/>
				<div className="flex flex-col gap-2 w-full">
					{query.isLoading && (
						<div className="flex justify-center">
							<CgSpinnerAlt size={64} className="animate-spin text-neutral-500" />
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
									setActiveLocation(location);
								};
						return (
							<CityOption
								key={location.geonameId}
								city={location}
								isSaved={isSaved}
								isActive={false}
								onClick={onClick}
							/>
						);
					})}
					{!query.error && !query.isLoading && locations.length === 0 && (
						<Card className="bg-neutral-800" gradient={false}>
							<div className="flex flex-col gap-4 items-center text-neutral-500">
								<HiMagnifyingGlass size={64} />
								Search for a city
							</div>
						</Card>
					)}
					{query.error && !query.isLoading && locations.length === 0 && (
						<Card className="bg-neutral-800" gradient={false}>
							<div className="flex flex-col gap-4 items-center text-neutral-500">
								<HiExclamationTriangle size={64} className="text-red-700" />
								Something went wrong. Try again later.
							</div>
						</Card>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<CurrentLocation />

				<div className="mt-2">Saved Locations</div>
				<div className="flex flex-col gap-2 w-full">
					{savedLocations.map((location) => {
						const onClick = () => {
							setSavedLocations(
								savedLocations.filter((c) => c.geonameId !== location.geonameId),
							);
							if (location.geonameId === activeLocation?.geonameId) {
								setActiveLocation(undefined);
							}
						};
						return (
							<CityOption
								key={location.geonameId}
								city={location}
								isSaved={true}
								isActive={activeLocation?.geonameId === location.geonameId}
								onActivate={() => setActiveLocation(location)}
								onDelete={onClick}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
