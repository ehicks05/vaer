import { NAV_BAR_BUTTON_STYLES } from '../constants/classes';
import { UNIT_SYSTEM_LABELS, useUnitSystem } from '../hooks/useUnitSystem';

const UnitSystemToggle = () => {
	const { unitSystem, toggleUnitSystem } = useUnitSystem();

	return (
		<button
			type="button"
			className={NAV_BAR_BUTTON_STYLES}
			onClick={toggleUnitSystem}
		>
			<div className="px-2 py-0.5">{UNIT_SYSTEM_LABELS[unitSystem]}</div>
		</button>
	);
};

export { UnitSystemToggle };
