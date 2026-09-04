import { clamp } from 'es-toolkit';

const MIN_HEIGHT = 6;
const MAX_HEIGHT = 80;
const POWER = 0.88;
const PIXELS_PER_INCHES_PER_HOUR = 200;

const getRawHeight = (inchesPerHour: number) =>
	MIN_HEIGHT + inchesPerHour * PIXELS_PER_INCHES_PER_HOUR;

const getCompressedHeight = (rawHeight: number) => Math.round(rawHeight ** POWER);

const getClampedHeight = (inchesPerHour: number, compressedHeight: number) =>
	inchesPerHour ? clamp(compressedHeight, MIN_HEIGHT, MAX_HEIGHT) : 1;

export const getBarHeight = (inchesPerHour: number) => {
	const rawPixelHeight = getRawHeight(inchesPerHour);
	const compressedPixelHeight = getCompressedHeight(rawPixelHeight);
	return getClampedHeight(inchesPerHour, compressedPixelHeight);
};

if (import.meta.env.DEV) {
	const TEST_DATA = [0, 0.01, 0.1, 0.3, 0.5, 1];

	const test = () => {
		console.table(
			TEST_DATA.map((inchesPerHour) => ({
				inchesPerHour,
				rawHeight: getRawHeight(inchesPerHour),
				compressedHeight: getCompressedHeight(getRawHeight(inchesPerHour)),
				clampedHeight: getClampedHeight(
					inchesPerHour,
					getCompressedHeight(getRawHeight(inchesPerHour)),
				),
			})),
		);
	};

	test();
}
