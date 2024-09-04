import { type ReactNode, useContext, useState } from 'react';
import { AllowPermissionRequestContext } from './AllowPermissionRequestContext';
import { GeolocationPermissionContext } from './GeolocationPermissionContext';

interface Props {
	children: ReactNode;
}

export const AllowPermissionRequestProvider = ({ children }: Props) => {
	const { geolocationPermission: state } = useContext(GeolocationPermissionContext);
	const [isAllowPermissionRequests, setIsAllowPermissionRequests] = useState(
		state === 'granted',
	);

	return (
		<AllowPermissionRequestContext.Provider
			value={{ isAllowPermissionRequests, setIsAllowPermissionRequests }}
		>
			{children}
		</AllowPermissionRequestContext.Provider>
	);
};
