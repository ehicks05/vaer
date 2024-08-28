import { Button, Card } from '@/components';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useActiveLocation, useSavedLocations } from '@/hooks';
import { useSearch } from '@/services/geonames/geonames';
import type { SearchResultGeoname } from '@/services/geonames/types';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';
import {
	HiExclamationTriangle,
	HiMagnifyingGlass,
	HiOutlineCheckCircle,
	HiOutlinePlusCircle,
	HiOutlineXCircle,
} from 'react-icons/hi2';
import { NAV_BAR_BUTTON_STYLES } from '../constants/classes';
import { geonameToLabel } from './utils';
const currentLocation = {
	geonameId: -1,
	countryCode: 'US',
	name: 'Current Location',
};

interface CityOptionProps {
	city: Partial<SearchResultGeoname>;
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
		<div>
			<div className="w-full flex justify-between items-center gap-4 sm:gap-8 p-2 text-sm sm:text-base bg-neutral-700 rounded-lg">
				<div>{geonameToLabel(city)}</div>
				<div className="flex items-center gap-2">
					{!isSaved && (
						<HiOutlinePlusCircle
							onClick={onClick}
							size={28}
							className={'cursor-pointer text-green-500 hover:text-green-400'}
						/>
					)}
					{isSaved && (
						<>
							<HiOutlineCheckCircle
								size={28}
								onClick={onActivate}
								className={
									isActive
										? 'cursor-pointer text-green-500 hover:text-green-400'
										: 'cursor-pointer text-neutral-500 hover:text-neutral-400'
								}
							/>
							<HiOutlineXCircle
								onClick={onDelete}
								size={28}
								className={
									onDelete
										? 'cursor-pointer text-red-500 hover:text-red-400'
										: 'text-neutral-500 opacity-0'
								}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const LocationModal = () => {
	const [savedLocations, setSavedLocations] = useSavedLocations();
	const [activeLocation, setActiveLocation] = useActiveLocation();

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedLocations.map((o) => o.geonameId);
	const locations = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex flex-col sm:flex-row gap-4">
			<div className="flex flex-col gap-4">
				<input
					className="p-2 rounded-lg"
					value={queryString}
					onChange={(e) => setQueryString(e.target.value)}
					placeholder="Search..."
				/>
				<div className="grid grid-cols-1 gap-2 w-full">
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
				<div className="p-2 rounded-lg">Saved Cities</div>
				<div className="grid grid-cols-1 gap-2 w-full">
					<CityOption
						key={'currentLocation'}
						city={currentLocation}
						isSaved={true}
						isActive={activeLocation === undefined}
						onActivate={() => setActiveLocation(undefined)}
					/>

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

const LocationButton = () => (
	<div className="flex gap-16 items-baseline">
		<div className="ml-2">Location...</div>
		<div className="flex items-center gap-0.5 bg-neutral-800 px-2 m-0.5 rounded text-xs">
			<span className="text-base">⌘</span>
			<span>K</span>
		</div>
	</div>
);

export const LocationDialog = () => {
	const [open, setOpen] = useState(false);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault();
				setOpen(!open);
			}
		},
		[open],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={NAV_BAR_BUTTON_STYLES}>
				<LocationButton />
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay />
				<DialogContent className="bg-neutral-800">
					<DialogHeader>
						<DialogTitle>Choose a Location</DialogTitle>
						<DialogDescription className="hidden">
							Choose a location
						</DialogDescription>
					</DialogHeader>
					<LocationModal />
					<DialogClose asChild>
						<Button className="place-self-start bg-neutral-700">Close</Button>
					</DialogClose>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};
