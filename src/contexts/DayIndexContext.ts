import { type Dispatch, type SetStateAction, createContext } from 'react';

export interface IDayIndexContext {
	dayIndex: number | undefined;
	setDayIndex: Dispatch<SetStateAction<number | undefined>>;
}

export const DayIndexContext = createContext<IDayIndexContext>({
	dayIndex: undefined,
	setDayIndex: () => undefined,
});
