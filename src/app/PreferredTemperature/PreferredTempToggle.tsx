import { usePreferredTempUnit } from './usePreferredTempUnit';

const PreferredTempToggle = () => {
	const { preferredTempUnit, togglePreferredTempUnit } = usePreferredTempUnit();

	return (
		<button
			type="button"
			className="text-neutral-400 text-xl"
			onClick={togglePreferredTempUnit}
		>
			{preferredTempUnit}
		</button>
	);
};

export default PreferredTempToggle;
