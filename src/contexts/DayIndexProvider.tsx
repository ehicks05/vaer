import { type ReactNode, useState } from 'react';
import { DayIndexContext, type IDayIndexContext } from './DayIndexContext';

export const DayIndexProvider = ({ children }: { children: ReactNode }) => {
	const [dayIndex, setDayIndex] = useState<IDayIndexContext['dayIndex']>(undefined);

	return (
		<DayIndexContext.Provider value={{ dayIndex, setDayIndex }}>
			{children}
		</DayIndexContext.Provider>
	);
};
