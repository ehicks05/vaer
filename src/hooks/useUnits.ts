import { round } from 'lodash-es';
import { usePreferredTempUnit } from './usePreferredTempUnit';

export const cToF = (c: number) => (9 / 5) * c + 32;
export const fToC = (f: number) => (5 / 9) * (f - 32);

const inchToMm = (inch: number) => 25.4 * inch;

const mphToKmh = (mph: number) => 1.60934 * mph;

export const useUnits = () => {
	const { preferredTempUnit } = usePreferredTempUnit();

	return {
		getLength: (inches: number) => {
			const inPreferredUnit = preferredTempUnit === 'C' ? inchToMm(inches) : inches;
			const rounded = round(inPreferredUnit, preferredTempUnit === 'C' ? 1 : 2);
			const display = rounded ? rounded : !inches ? 0 : '< .01';

			const unit = preferredTempUnit === 'C' ? 'mm' : 'in';
			return `${display} ${unit}`;
		},
		getSpeed: (mph: number) => {
			const inPreferredUnit = preferredTempUnit === 'C' ? mphToKmh(mph) : mph;
			const unit = preferredTempUnit === 'C' ? 'km/h' : 'mph';
			return `${Math.round(inPreferredUnit)} ${unit}`;
		},
		getTemp: (f: number) => {
			const inPreferredUnit = preferredTempUnit === 'C' ? fToC(f) : f;
			return `${Math.round(inPreferredUnit)}\u00B0`;
		},
	};
};
