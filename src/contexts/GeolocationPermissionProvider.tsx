import type { ReactNode } from 'react';
import { useQueryPermission } from '@/hooks/usePermission';
import { GeolocationPermissionContext } from './GeolocationPermissionContext';

interface Props {
	children: ReactNode;
}

const name = 'geolocation';

export const GeolocationPermissionProvider = ({ children }: Props) => {
	const permission = useQueryPermission({ name });

	const { isLoading, state } = permission;
	if (isLoading) {
		return null;
	}

	return (
		<GeolocationPermissionContext.Provider value={{ geolocationPermission: state }}>
			{children}
		</GeolocationPermissionContext.Provider>
	);
};
