import { round } from 'es-toolkit';
import { fToC, hPaToInHg, inchToMm, mphToKmh } from './conversions';
import { useUnitSystemToggle } from './useUnitSystemToggle';

export const useUnitSystem = () => {
	const { unitSystem } = useUnitSystemToggle();
	const isMetric = unitSystem === 'metric';

	const getLength = (inches: number) => {
		const inPreferredUnit = isMetric ? inchToMm(inches) : inches;
		const precision = isMetric ? 1 : 2;
		const rounded = round(inPreferredUnit, precision);
		// logic: both zeroes and truthy rounded values are fine,
		// but if a non-zero value rounds to zero, show a '<' sign.
		const display = rounded
			? rounded
			: !inches
				? 0
				: `< .${'0'.repeat(precision - 1)}1`;

		const unit = isMetric ? 'mm' : 'in';
		return `${display} ${unit}`;
	};
	
	const getPressure = (hpa: number) => {
		const inPreferredUnit = isMetric ? hpa : hPaToInHg(hpa);
		const unit = isMetric ? 'hPa' : 'inHg';
		return `${round(inPreferredUnit, 2)} ${unit}`;
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


	return {
		getLength,
		getPressure,
		getRate,
		getSpeed,
		getTemp,
	};
};
