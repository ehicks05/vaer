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
import { AllowPermissionRequestContext } from '@/contexts/AllowPermissionRequestContext';
import { GeolocationPermissionContext } from '@/contexts/GeolocationPermissionContext';
import { useActiveLocation, useSavedLocations } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useSearch } from '@/services/geonames/geonames';
import type { SearchResultGeoname } from '@/services/geonames/types';
import { useCallback, useContext, useEffect, useState } from 'react';
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
			<div className="w-full flex justify-between items-center gap-4 md:gap-8 p-2 text-sm md:text-base bg-neutral-700 rounded-lg">
				<div className="flex items-center gap-4">
					{isSaved && (
						<HiOutlineCheckCircle
							size={28}
							onClick={onActivate}
							className={
								isActive
									? 'flex-shrink-0 cursor-pointer text-green-500 hover:text-green-400'
									: 'flex-shrink-0 cursor-pointer text-neutral-500 hover:text-neutral-400'
							}
						/>
					)}
					<div className="text-sm">{geonameToLabel(city)}</div>
				</div>
				<div className="flex items-center gap-2">
					{!isSaved && (
						<HiOutlinePlusCircle
							onClick={onClick}
							size={28}
							className={
								'flex-shrink-0 cursor-pointer text-green-500 hover:text-green-400'
							}
						/>
					)}
					{isSaved && (
						<HiOutlineXCircle
							onClick={onDelete}
							size={28}
							className={
								onDelete
									? 'flex-shrink-0 cursor-pointer text-red-500 hover:text-red-400'
									: 'invisible'
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const CurrentLocation = () => {
	const { isAllowPermissionRequests, setIsAllowPermissionRequests } = useContext(
		AllowPermissionRequestContext,
	);
	const { geolocationPermission } = useContext(GeolocationPermissionContext);
	const [activeLocation, setActiveLocation] = useActiveLocation();
	const { latitude } = useGeolocation().coords || {};

	return (
		<>
			<div>Current Location</div>
			<div className="grid grid-cols-1 gap-2 w-full">
				{geolocationPermission === 'denied' ? (
					<Button disabled>
						Geolocation permission is denied. Reset browser permissions to use
						current location.
					</Button>
				) : geolocationPermission === 'granted' || latitude !== undefined ? (
					<CityOption
						city={{ name: 'Current Location' }}
						isSaved={true}
						isActive={activeLocation === undefined}
						onActivate={() => setActiveLocation(undefined)}
					/>
				) : geolocationPermission === 'prompt' && !isAllowPermissionRequests ? (
					<Button
						onClick={() => setIsAllowPermissionRequests(true)}
						className="bg-green-700 hover:bg-green-600"
					>
						Allow Vær to request current location
					</Button>
				) : (
					<Button className="bg-green-700" disabled>
						Waiting for permission to be granted.
					</Button>
				)}
			</div>
		</>
	);
};

const LocationForm = () => {
	const [savedLocations, setSavedLocations] = useSavedLocations();
	const [activeLocation, setActiveLocation] = useActiveLocation();

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedLocations.map((o) => o.geonameId);
	const locations = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex flex-col md:flex-row gap-4">
			<div className="flex flex-col gap-4">
				Search for a location
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
				<CurrentLocation />

				<div className="mt-2">Saved Locations</div>
				<div className="grid grid-cols-1 gap-2 w-full">
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
	const { geolocationPermission } = useContext(GeolocationPermissionContext);
	const [activeLocation] = useActiveLocation();
	const [open, setOpen] = useState(
		geolocationPermission !== 'granted' && activeLocation === undefined,
	);

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
					<LocationForm />
					<div className="flex">
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};
