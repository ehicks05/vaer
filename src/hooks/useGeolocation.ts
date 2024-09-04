// adapted from @uidotdev/usehooks
// main changes:
// 1. don't request permission right away, wait for `isAllowPermissionRequests`
// 2. stick closer to web api types
import { AllowPermissionRequestContext } from '@/contexts/AllowPermissionRequestContext';
import React, { useContext } from 'react';

export type GeolocationState = {
	loading: boolean;
	timestamp: number | null;
	coords: GeolocationCoordinates | null;
	error: GeolocationPositionError | null;
};

const DEFAULT_STATE: GeolocationState = {
	loading: true,
	coords: null,
	timestamp: null,
	error: null,
};

export function useGeolocation(options = {}) {
	const { isAllowPermissionRequests } = useContext(AllowPermissionRequestContext);
	const [state, setState] = React.useState<GeolocationState>(DEFAULT_STATE);

	const optionsRef = React.useRef(options);

	React.useEffect(() => {
		if (!isAllowPermissionRequests) {
			return;
		}

		const onEvent = ({
			coords,
			timestamp,
		}: { coords: GeolocationCoordinates; timestamp: EpochTimeStamp }) => {
			setState((state) => ({
				...state,
				loading: false,
				timestamp,
				coords,
			}));
		};

		const onEventError = (error: GeolocationPositionError) => {
			setState((s) => ({
				...s,
				loading: false,
				error,
			}));
		};

		navigator.geolocation.getCurrentPosition(
			onEvent,
			onEventError,
			optionsRef.current,
		);

		const watchId = navigator.geolocation.watchPosition(
			onEvent,
			onEventError,
			optionsRef.current,
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, [isAllowPermissionRequests]);

	return state;
}
