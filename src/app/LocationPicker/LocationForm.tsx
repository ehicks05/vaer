import { useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';
import { HiExclamationTriangle, HiMagnifyingGlass } from 'react-icons/hi2';
import { Card } from '@/components';
import { useSavedLocations, useSpecifiedLocation } from '@/hooks';
import { useSearch } from '@/services/geonames/geonames';
import { CityOption } from './CityOption';
import { CurrentLocation } from './CurrentLocation';

export const LocationForm = () => {
	const [savedLocations, setSavedLocations] = useSavedLocations();
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedLocations.map((o) => o.geonameId);
	const locations = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex flex-col gap-6 h-full overflow-y-auto">
			<div className="flex flex-col gap-2">
				Search for a location
				<input
					className="p-2 rounded-lg outline-hidden"
					value={queryString}
					onChange={(e) => setQueryString(e.target.value)}
					placeholder="Search..."
				/>
				<div className="flex flex-col gap-2 w-full">
					{!query.error && locations.length === 0 && (
						<Card className="bg-neutral-800" gradient={false}>
							<div className="flex flex-col items-center p-4 text-neutral-500">
								{query.isFetching ? (
									<CgSpinnerAlt size={48} className="animate-spin" />
								) : (
									<HiMagnifyingGlass size={48} />
								)}
								Search for a city
							</div>
						</Card>
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
				<div>Saved Locations</div>
				<div className="flex flex-col gap-2 w-full">
					<CurrentLocation />
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
		</div>
	);
};
