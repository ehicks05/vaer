import { Button } from '@/components/ui/button';
import { useSpecifiedLocation } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { CityOption } from './CityOption';

export const CurrentLocation = () => {
	const [specifiedLocation, setSpecifiedLocation] = useSpecifiedLocation();
	const { coords, error } = useGeolocation();

	return (
		<div className="grid grid-cols-1 gap-2 w-full max-w-64">
			{coords !== null ? (
				<CityOption
					city={{ name: 'Current Location' }}
					isActive={specifiedLocation === undefined}
					onClick={() => setSpecifiedLocation(undefined)}
				/>
			) : error?.code === 1 ? (
				<div>
					Geolocation permission not granted. Check browser permissions to use
					current location.
				</div>
			) : (
				<Button disabled>Waiting for permission to be granted.</Button>
			)}
		</div>
	);
};
