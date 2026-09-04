import { Button } from '@/components/ui/button';
import { UNIT_SYSTEM_LABELS } from './constants';
import { useUnitSystemToggle } from './useUnitSystemToggle';

export const UnitSystemToggle = () => {
	const { unitSystem, toggleUnitSystem } = useUnitSystemToggle();

	return (
		<Button
			variant="outline"
			className="text-muted-foreground"
			onClick={toggleUnitSystem}
		>
			{UNIT_SYSTEM_LABELS[unitSystem]}
		</Button>
	);
};
