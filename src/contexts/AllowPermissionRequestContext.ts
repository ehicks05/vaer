import { createContext, type Dispatch, type SetStateAction } from 'react';

interface IAllowPermissionRequestContext {
	isAllowPermissionRequests: boolean;
	setIsAllowPermissionRequests: Dispatch<SetStateAction<boolean>>;
}

export const AllowPermissionRequestContext =
	createContext<IAllowPermissionRequestContext>({
		isAllowPermissionRequests: false,
		setIsAllowPermissionRequests: () => null,
	});
