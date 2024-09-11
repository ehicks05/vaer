import { useQueryPermission } from '@/hooks/usePermission';
import type { ReactNode } from 'react';
import { GeolocationPermissionContext } from './GeolocationPermissionContext';

interface Props {
	children: ReactNode;
}

const name = 'geolocation';

export const GeolocationPermissionProvider = ({ children }: Props) => {
	const permission = useQueryPermission({ name });

	const { state } = permission;
	if (!state) {
		return null;
	}

	return (
		<GeolocationPermissionContext.Provider value={{ geolocationPermission: state }}>
			{children}
		</GeolocationPermissionContext.Provider>
	);
};
