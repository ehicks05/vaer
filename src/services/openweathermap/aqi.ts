// from https://github.com/RiANOl/aqi-us/blob/master/index.js
import { Components } from './types/airPollution';

const aqi_breakpoints = [
	[0, 50],
	[51, 100],
	[101, 150],
	[151, 200],
	[201, 300],
	[301, 400],
	[401, 500],
];
const co_breakpoints = [
	[0.0, 4.4],
	[4.5, 9.4],
	[0.5, 12.4],
	[12.5, 15.4],
	[15.5, 30.4],
	[30.5, 40.4],
	[40.5, 50.4],
];
const no2_breakpoints = [
	[0, 53],
	[54, 100],
	[101, 360],
	[361, 649],
	[650, 1249],
	[1250, 1649],
	[1650, 2049],
];
const o3_1hr_breakpoints = [
	null,
	null,
	[125, 164],
	[165, 204],
	[205, 404],
	[405, 504],
	[505, 604],
];
const o3_8hr_breakpoints = [
	[0, 54],
	[55, 70],
	[71, 85],
	[86, 105],
	[106, 200],
];
const pm10_breakpoints = [
	[0, 54],
	[55, 154],
	[155, 254],
	[255, 354],
	[355, 424],
	[425, 504],
	[505, 604],
];
const pm25_breakpoints = [
	[0.0, 12.0],
	[12.1, 35.4],
	[35.5, 55.4],
	[55.5, 150.4],
	[150.5, 250.4],
	[250.5, 350.4],
	[350.5, 500.4],
];
const so2_breakpoints = [
	[0, 35],
	[36, 75],
	[76, 185],
	[186, 304],
	[305, 604],
	[605, 804],
	[805, 1004],
];
const aqi_labels = [
	'Good',
	'Moderate',
	'Unhealthy for Sensitive Groups',
	'Unhealthy',
	'Very Unhealthy',
	'Hazardous',
	'Hazardous',
];
const aqi_colors = [
	'009966',
	'ffde33',
	'ff9933',
	'cc0033',
	'660099',
	'7e0023',
	'7e0023',
];

type Breakpoints = number[][];

function breakpointIndex(value: number, breakpoints: Breakpoints) {
	return breakpoints.findIndex((breakpoint) => {
		if (null === breakpoint) {
			return false;
		}
		return breakpoint[0] <= value && value <= breakpoint[1];
	});
}

function aqi(concentration: number, breakpoints: Breakpoints) {
	const index = breakpointIndex(concentration, breakpoints);

	if (-1 === index) {
		return NaN;
	}

	const i_high = aqi_breakpoints[index][1];
	const i_low = aqi_breakpoints[index][0];
	const c_high = breakpoints[index][1];
	const c_low = breakpoints[index][0];

	return Math.round(
		((i_high - i_low) / (c_high - c_low)) * (concentration - c_low) + i_low,
	);
}

const _co = (concentration: number) => {
	return aqi(Math.floor(concentration * 10) / 10, co_breakpoints);
};

// const _o3_1hr = (concentration: number) => {
// 	return aqi(Math.floor(concentration), o3_1hr_breakpoints);
// };

const _o3_8hr = (concentration: number) => {
	return aqi(Math.floor(concentration), o3_8hr_breakpoints);
};

const _no2 = (concentration: number) => {
	return aqi(Math.floor(concentration), no2_breakpoints);
};

const _pm10 = (concentration: number) => {
	return aqi(Math.floor(concentration), pm10_breakpoints);
};

const _pm25 = (concentration: number) => {
	return aqi(Math.floor(concentration * 10) / 10, pm25_breakpoints);
};

const _so2 = (concentration: number) => {
	return aqi(Math.floor(concentration), so2_breakpoints);
};

// Airnow.gov descriptions by range
const aqi_label = (aqi: number) => {
	const idx = breakpointIndex(aqi, aqi_breakpoints);
	return aqi_labels[idx];
};

// Aqi color mapping. Returns hex color code.
const aqi_color = (aqi: number) => {
	const idx = breakpointIndex(aqi, aqi_breakpoints);
	return aqi_colors[idx];
};

// TODO: μg/m3 to ppm
export const getAQI = (concentration: Components) => {
	console.log(concentration);
	const co = _co(concentration.co);
	const o3 = _o3_8hr(concentration.o3);
	const no2 = _no2(concentration.no2);
	const pm10 = _pm10(concentration.pm10);
	const pm2_5 = _pm25(concentration.pm2_5);
	const so2 = _so2(concentration.so2);

	console.log({ indices: [co, o3, no2, pm10, pm2_5, so2] });

	const aqi = Math.max(co, o3, no2, pm10, pm2_5, so2);
	const label = aqi_label(aqi);
	const color = aqi_color(aqi);

	return { aqi, label, color };
};
