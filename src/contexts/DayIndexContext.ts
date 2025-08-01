import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface IDayIndexContext {
	dayIndex: number | undefined;
	setDayIndex: Dispatch<SetStateAction<number | undefined>>;
}

export const DayIndexContext = createContext<IDayIndexContext>({
	dayIndex: undefined,
	setDayIndex: () => undefined,
});
