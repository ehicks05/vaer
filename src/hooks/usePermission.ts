// adapted from https://github.com/djkepa/custom-react-hooks/blob/main/packages/use-permission/src/index.tsx
import { useEffect, useState } from 'react';

export interface PermissionState {
	state: PermissionStatus['state'];
	isLoading: boolean;
	error: string | null;
}

/**
 * `usePermission` is a hook for querying permission status for various browser APIs.
 * It supports querying permissions like geolocation, notifications, camera, microphone, etc.
 *
 * @param permissionName - The name of the permission to query.
 * @return - An object containing the permission state, loading status, and error information.
 */

const useQueryPermission = ({ name }: { name: PermissionName }): PermissionState => {
	const [permission, setPermission] = useState<PermissionState>({
		state: 'prompt',
		isLoading: false,
		error: null,
	});

	useEffect(() => {
		if (typeof navigator === 'undefined' || !navigator.permissions) {
			setPermission({
				state: 'denied',
				isLoading: false,
				error: 'Permissions API is not supported',
			});
			return;
		}

		const queryPermission = async () => {
			setPermission((prev) => ({ ...prev, isLoading: true }));

			try {
				const permissionStatus = await navigator.permissions.query({
					name,
				});
				setPermission({
					state: permissionStatus.state,
					isLoading: false,
					error: null,
				});

				permissionStatus.onchange = () => {
					setPermission({
						state: permissionStatus.state,
						isLoading: false,
						error: null,
					});
				};
			} catch (error) {
				setPermission({
					state: 'denied',
					isLoading: false,
					error:
						error instanceof Error
							? `Error querying ${name} permission: ${error.message}`
							: 'Unknown error',
				});
			}
		};

		queryPermission();
	}, [name]);

	return permission;
};

export { useQueryPermission };
