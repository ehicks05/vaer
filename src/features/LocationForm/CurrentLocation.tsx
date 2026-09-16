import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item';
import { useSpecifiedLocation } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { LocationPermissionSwitch } from './LocationPermission';

const CurrentLocationOption = () => {
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();

	const isActive = specifiedLocation === undefined;
	const handleClick = () => setSpecifiedLocation(undefined);

	return (
		<Item variant="outline" size="xs">
			<ItemContent>
				<ItemTitle>Current Location</ItemTitle>
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
			</ItemActions>
		</Item>
	);
};

export const CurrentLocationSection = () => {
	const { coords } = useGeolocation();

	return (
		<div className="flex flex-col gap-2">
			<LocationPermissionSwitch />

			{coords !== null && <CurrentLocationOption />}
		</div>
	);
};
