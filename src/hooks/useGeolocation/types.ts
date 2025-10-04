export type GeolocationOptions = {
	maximumAge?: number;
	timeout?: number;
	enableHighAccuracy?: boolean;
};

export type GeolocationState = {
	loading: boolean;
	timestamp: number | null;
	coords: GeolocationCoordinates | null;
	error: Pick<GeolocationPositionError, 'code' | 'message'> | null;
};