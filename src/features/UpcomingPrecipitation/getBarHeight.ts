import { clamp } from 'es-toolkit';

const MIN_HEIGHT = 6;
const MAX_HEIGHT = 80;
const POWER = 0.88;
const PIXELS_PER_INCHES_PER_HOUR = 200;

export const getRawHeight = (inchesPerHour: number) =>
	MIN_HEIGHT + inchesPerHour * PIXELS_PER_INCHES_PER_HOUR;

export const getCompressedHeight = (rawHeight: number) =>
	Math.round(rawHeight ** POWER);

export const getClampedHeight = (inchesPerHour: number, compressedHeight: number) =>
	inchesPerHour ? clamp(compressedHeight, MIN_HEIGHT, MAX_HEIGHT) : 1;

export const getBarHeight = (inchesPerHour: number) => {
	const rawPixelHeight = getRawHeight(inchesPerHour);
	const compressedPixelHeight = getCompressedHeight(rawPixelHeight);
	return getClampedHeight(inchesPerHour, compressedPixelHeight);
};
