import { Button, Card, Dialog } from '@/components';
import { SearchResultGeoname } from '@/services/geonames/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { CgSpinnerAlt } from 'react-icons/cg';
import { useSearch } from '@/services/geonames/geonames';

interface CityOptionProps {
	city: SearchResultGeoname;
	isSaved: boolean;
	isActive: boolean;
	onClick?: () => void;
	onActivate?: () => void;
	onDelete?: () => void;
}

const CityOption = ({
	city,
	isSaved,
	isActive,
	onClick,
	onActivate,
	onDelete,
}: CityOptionProps) => {
	return (
		<Button onClick={onClick}>
			<div className="w-full flex justify-between items-center gap-4 sm:gap-8 p-2 sm:p-4">
				<div>
					{city.name}, {city.adminCode1}, {city.countryCode}
				</div>
				<div className="flex items-center gap-2">
					{isSaved && (
						<>
							<HiOutlineCheckCircle
								size={24}
								onClick={onActivate}
								className={isActive ? 'text-green-500' : 'text-neutral-500'}
							/>
							<HiOutlineXCircle
								onClick={onDelete}
								size={24}
								className={'text-red-500'}
							/>
						</>
					)}
				</div>
			</div>
		</Button>
	);
};

const LocationModal = () => {
	const [savedCities, setSavedCities] = useLocalStorage<SearchResultGeoname[]>(
		'vaer-saved-cities',
		[],
	);
	const [activeCity, setActiveCity] = useLocalStorage<
		SearchResultGeoname | undefined
	>('vaer-active-city', undefined);

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedCities.map((o) => o.geonameId);
	const cities = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-4">
				<input
					className="p-2 rounded-lg"
					value={queryString}
					onChange={(e) => setQueryString(e.target.value)}
					placeholder="Search..."
				/>
				<div className="grid grid-cols-1 gap-2 w-full">
					{query.isLoading && (
						// <div className="">
						<CgSpinnerAlt size={32} className="animate-spin" />
						// </div>
					)}
					{cities.map((city) => {
						const isSaved = savedCities.some((c) => c.geonameId === city.geonameId);
						const onClick = isSaved
							? () =>
									setSavedCities(
										savedCities.filter((c) => c.geonameId !== city.geonameId),
									)
							: () => setSavedCities([...savedCities, city]);
						return (
							<CityOption
								key={city.geonameId}
								city={city}
								isSaved={isSaved}
								isActive={false}
								onClick={onClick}
							/>
						);
					})}
					{/* {cities.length === 0 && (
						<Card className="bg-neutral-800" gradient={false}>
							<div className="flex flex-col gap-4 items-center text-neutral-500">
								<HiMagnifyingGlass size={96} />
								Search for a city
							</div>
						</Card>
					)} */}
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<div className="p-2 rounded-lg">Saved Cities</div>
				<div className="grid grid-cols-1 gap-2 w-full">
					{savedCities.map((city) => {
						const isSaved = savedCities.some((c) => c.geonameId === city.geonameId);
						const onClick = isSaved
							? () =>
									setSavedCities(
										savedCities.filter((c) => c.geonameId !== city.geonameId),
									)
							: () => setSavedCities([...savedCities, city]);
						return (
							<CityOption
								key={city.geonameId}
								city={city}
								isSaved={isSaved}
								isActive={activeCity?.geonameId === city.geonameId}
								onActivate={() => setActiveCity(city)}
								onDelete={onClick}
							/>
						);
					})}
					{savedCities.length === 0 && (
						<Card className="bg-neutral-800" gradient={false}>
							<div className="flex flex-col gap-4 items-center text-neutral-500">
								<HiMagnifyingGlass size={64} />
								Search for a city
							</div>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export const SearchButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<button
			type="button"
			onClick={() => setIsOpen(true)}
			className="px-0.5 py-0.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-all"
		>
			<div className="flex gap-16 items-baseline">
				<div className="ml-2">Location...</div>
				<div className="flex items-center gap-0.5 bg-neutral-800 px-2 m-0.5 rounded text-xs">
					<span className="text-base">⌘</span>
					<span>K</span>
				</div>
			</div>
			<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<LocationModal />
			</Dialog>
		</button>
	);
};
