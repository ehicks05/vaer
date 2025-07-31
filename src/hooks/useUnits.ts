import { round } from 'es-toolkit';
import { useUnitSystem } from '../components/UnitSystemToggle/useUnitSystem';

export const cToF = (c: number) => (9 / 5) * c + 32;
export const fToC = (f: number) => (5 / 9) * (f - 32);

const inchToMm = (inch: number) => 25.4 * inch;

const mphToKmh = (mph: number) => 1.60934 * mph;

const hPaToInHg = (hpa: number) => 0.02952998057228 * hpa;

export const useUnits = () => {
	const { unitSystem } = useUnitSystem();
	const isMetric = unitSystem === 'metric';

	const getLength = (inches: number) => {
		const inPreferredUnit = isMetric ? inchToMm(inches) : inches;
		const precision = isMetric ? 1 : 2;
		const rounded = round(inPreferredUnit, precision);
		// logic: both zeroes and truthy rounded values are fine,
		// but if our rounding turns a non-zero into zero, show a '<' sign.
		const display = rounded
			? rounded
			: !inches
				? 0
				: `< .${'0'.repeat(precision - 1)}1`;

		const unit = isMetric ? 'mm' : 'in';
		return `${display} ${unit}`;
	};

	const getRate = (inPerHour: number) => {
		return `${getLength(inPerHour)}/h`;
	};
	const getSpeed = (mph: number) => {
		const inPreferredUnit = isMetric ? mphToKmh(mph) : mph;
		const unit = isMetric ? 'kmh' : 'mph';
		return `${Math.round(inPreferredUnit)} ${unit}`;
	};
	const getTemp = (f: number) => {
		const inPreferredUnit = isMetric ? fToC(f) : f;
		return `${Math.round(inPreferredUnit)}\u00B0`;
	};
	const getPressure = (hpa: number) => {
		const inPreferredUnit = isMetric ? hpa : hPaToInHg(hpa);
		const unit = isMetric ? 'hPa' : 'inHg';
		return `${round(inPreferredUnit, 2)} ${unit}`;
	};

	return {
		getLength,
		getRate,
		getSpeed,
		getTemp,
		getPressure,
	};
};
