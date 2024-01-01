import { NAV_BAR_BUTTON_STYLES } from '../../constants/classes';
import { usePreferredTempUnit } from './usePreferredTempUnit';

const PreferredTempToggle = () => {
	const { preferredTempUnit, togglePreferredTempUnit } = usePreferredTempUnit();

	return (
		<button
			type="button"
			className={NAV_BAR_BUTTON_STYLES}
			onClick={togglePreferredTempUnit}
		>
			<div className="px-2">{preferredTempUnit}</div>
		</button>
	);
};

export default PreferredTempToggle;
