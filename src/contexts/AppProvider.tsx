import type { ReactNode } from 'react';
import { DayIndexProvider } from './DayIndexProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => (
	<DayIndexProvider>{children}</DayIndexProvider>
);
