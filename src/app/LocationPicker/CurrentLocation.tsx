import { Button } from '@/components';
import { useActiveLocation } from '@/hooks';
import { useCachedGeolocation } from '@/hooks/useCachedGeolocation';
import { CityOption } from './CityOption';

export const CurrentLocation = () => {
	const [activeLocation, setActiveLocation] = useActiveLocation();
	const { coords, error } = useCachedGeolocation();

	return (
		<div className="grid grid-cols-1 gap-2 w-full max-w-64">
			{coords !== null ? (
				<CityOption
					city={{ name: 'Current Location' }}
					isActive={activeLocation === undefined}
					onClick={() => setActiveLocation(undefined)}
				/>
			) : error?.code === 1 ? (
				<Button disabled>
					Geolocation permission is denied. Reset browser permissions to use current
					location.
				</Button>
			) : (
				<Button className="bg-green-700" disabled>
					Waiting for permission to be granted.
				</Button>
			)}
		</div>
	);
};
