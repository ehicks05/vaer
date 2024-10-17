const AQI_TO_LABEL: Record<number, string> = {
	50: 'Good',
	100: 'Moderate',
	150: 'Unhealthy for sensitive groups',
	200: 'Unhealthy',
	300: 'Very unhealthy',
	500: 'Hazardous',
};

export const findAqiLabel = (aqi: number) =>
	Object.entries(AQI_TO_LABEL).find(([key]) => aqi <= Number(key))?.[1];
