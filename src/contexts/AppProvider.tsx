import type { ReactNode } from 'react';
import { AllowPermissionRequestProvider } from './AllowPermissionRequestProvider';
import { DayIndexProvider } from './DayIndexProvider';
import { GeolocationPermissionProvider } from './GeolocationPermissionProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => (
	<DayIndexProvider>
		<GeolocationPermissionProvider>
			<AllowPermissionRequestProvider>{children}</AllowPermissionRequestProvider>
		</GeolocationPermissionProvider>
	</DayIndexProvider>
);
