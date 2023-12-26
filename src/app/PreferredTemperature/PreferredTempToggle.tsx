import { usePreferredTempUnit } from './usePreferredTempUnit';

const PreferredTempToggle = () => {
	const { preferredTempUnit, togglePreferredTempUnit } = usePreferredTempUnit();

	return (
		<button
			type="button"
			className="underline underline-offset-4 decoration-4"
			onClick={togglePreferredTempUnit}
		>
			{preferredTempUnit}
		</button>
	);
};

export default PreferredTempToggle;
