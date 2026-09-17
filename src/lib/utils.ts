const FORMATS = {
	'MM-dd': { month: '2-digit', day: '2-digit' },
	'h a': { hour: 'numeric', hour12: true },
	'h:mm a': { hour: 'numeric', minute: '2-digit', hour12: true },
	'h:mm a z': {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZoneName: 'short',
	},
	EEE: { weekday: 'short' },
	'MMM dd, yyyy, h:mm a': { dateStyle: 'medium', timeStyle: 'short' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export const formatInTimeZone = (
	date: Date | string | number,
	timeZone: string,
	format: keyof typeof FORMATS,
) =>
	new Intl.DateTimeFormat(undefined, { timeZone, ...FORMATS[format] }).format(
		new Date(date),
	);
