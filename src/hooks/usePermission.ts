import { useEffect, useState } from 'react';

/** WARNING: NOT REACTIVE */
export const useQueryPermission = ({ name }: { name: PermissionName }) => {
	const [status, setStatus] = useState<PermissionStatus>();

	useEffect(() => {
		const doIt = async () => {
			const result = await navigator.permissions.query({ name });
			setStatus(result);
		};

		doIt();
	}, [name]);

	return { status };
};
