export const meterFmt = Intl.NumberFormat('en-US', {
	unit: 'meter',
	notation: 'compact',
	maximumSignificantDigits: 2,
});

export const weekdayShort = Intl.DateTimeFormat('en-US', { weekday: 'short' });
export const weekdayLong = Intl.DateTimeFormat('en-US', { weekday: 'long' });

export const hour = Intl.DateTimeFormat('en-US', { hour: 'numeric' });

export const alertFmt = Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
	timeStyle: 'short',
});
export const timeShort = Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
export const dateShort = Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
