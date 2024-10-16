import { dateShort } from '@/constants/fmt';

// no longer used, remove after a bit
export const degreeToDirection = (degree: number) => {
	const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const index = Math.round(degree / 45) % DIRECTIONS.length;
	return DIRECTIONS[index];
};

export const isToday = (date: Date) =>
	dateShort.format(date) === dateShort.format(new Date());

export const mmToInch = (mm?: number) => (mm ? mm / 25.4 : 0);

export const addHours = (date: Date, i: number) => {
	date.setHours(date.getHours() + i);
	return date;
};

export const addDays = (date: Date, i: number) => {
	date.setDate(date.getDate() + i);
	return date;
};

export const formatHours = (date: Date) =>
	Intl.DateTimeFormat('en-US', { hour: 'numeric' }).format(date);

const FORMAT_KEYS: Record<string, Intl.DateTimeFormatOptions> = {
	'MM-dd': { month: '2-digit', day: '2-digit' },
	'h a': { hour: 'numeric', hour12: true },
	'h:mm a': { hour: 'numeric', minute: '2-digit', hour12: true },
	EEE: { weekday: 'short' },
} as const;

export const formatInTimeZone = (
	date: Date | string | number,
	timeZone: string,
	format: keyof typeof FORMAT_KEYS,
) => {
	return Intl.DateTimeFormat('en-US', {
		timeZone: timeZone || undefined,
		...FORMAT_KEYS[format],
	}).format(new Date(date));
};
