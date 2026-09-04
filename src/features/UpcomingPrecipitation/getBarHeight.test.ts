import { getClampedHeight, getCompressedHeight, getRawHeight } from './getBarHeight';

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
