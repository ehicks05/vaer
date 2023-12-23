import { fToC } from './temp_conversion';
import { usePreferredTempUnit } from './usePreferredTempUnit';

const Temp = ({ temp }: { temp: number }) => {
	const { preferredTempUnit } = usePreferredTempUnit();
	const inPreferredUnit = preferredTempUnit === 'C' ? fToC(temp) : temp;
	return `${Math.round(inPreferredUnit)}\u00B0`;
};

export default Temp;
