import { Button } from '@/components';
import { AllowPermissionRequestContext } from '@/contexts/AllowPermissionRequestContext';
import { GeolocationPermissionContext } from '@/contexts/GeolocationPermissionContext';
import { useActiveLocation } from '@/hooks';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useContext } from 'react';
import { CityOption } from './CityOption';

export const CurrentLocation = () => {
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
