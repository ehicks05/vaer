import { usePreferredTempUnit } from './usePreferredTempUnit';

const PreferredTempToggle = () => {
	const { preferredTempUnit, togglePreferredTempUnit } = usePreferredTempUnit();

	return (
		<button type="button" className="underline" onClick={togglePreferredTempUnit}>
			{preferredTempUnit}
		</button>
	);
};

export default PreferredTempToggle;
