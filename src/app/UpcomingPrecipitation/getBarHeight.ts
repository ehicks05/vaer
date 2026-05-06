import { clamp } from 'es-toolkit';

const MIN_HEIGHT = 8;
const MAX_HEIGHT = 80;
const POWER = 0.8;

// examples:
// 0.01 =>   2px
// 0.1  =>  20px
// 0.3  =>  60px
// 0.5  => 100px
// 1.0  => 200px
const PIXELS_PER_INCHES_PER_HOUR = 200;

export const getBarHeight = (inchesPerHour: number) => {
	const rawPixelHeight = MIN_HEIGHT + inchesPerHour * PIXELS_PER_INCHES_PER_HOUR;
	const compressedPixelHeight = rawPixelHeight ** POWER;

	return inchesPerHour ? clamp(compressedPixelHeight, MIN_HEIGHT, MAX_HEIGHT) : 1;
};
