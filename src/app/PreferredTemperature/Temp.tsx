import { cToF } from './cToF';
import { usePreferredTempUnit } from './usePreferredTempUnit';

const Temp = ({ temp }: { temp: number }) => {
	const { preferredTempUnit } = usePreferredTempUnit();
	const inPreferredUnit = preferredTempUnit === 'F' ? cToF(temp) : temp;
	return `${Math.round(inPreferredUnit)}\u00B0`;
};

export default Temp;
