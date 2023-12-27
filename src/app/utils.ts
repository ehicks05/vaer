export const degreeToDirection = (degree: number) => {
	const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const index = Math.round(degree / 45) % DIRECTIONS.length;
	return DIRECTIONS[index];
};

export const hPaToInHg = (hpa: number) => 0.02952998057228486 * hpa;
