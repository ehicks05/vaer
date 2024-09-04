import { createContext } from 'react';

interface GeolocationPermissionContext {
	geolocationPermission: PermissionState;
}

export const GeolocationPermissionContext =
	createContext<GeolocationPermissionContext>({
		geolocationPermission: 'prompt',
	});
