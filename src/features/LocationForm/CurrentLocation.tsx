import { useSpecifiedLocation } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { CityOption } from './CityOption';
import { LocationPermissionSwitch } from './LocationPermission';

export const CurrentLocation = () => {
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();
	const { coords } = useGeolocation();

	return (
		<div className="flex flex-col gap-2">
			<LocationPermissionSwitch />

			{coords !== null && (
				<CityOption
					city={{ name: 'Current Location' }}
					isActive={specifiedLocation === undefined}
					onClick={() => setSpecifiedLocation(undefined)}
				/>
			)}
		</div>
	);
};
