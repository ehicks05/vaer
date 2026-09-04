import { Button } from '@/components/ui/button';
import { UNIT_SYSTEM_LABELS } from './constants';
import { useUnitSystemStorage } from './useUnitSystemStorage';

export const UnitSystemToggle = () => {
	const { unitSystem, toggleUnitSystem } = useUnitSystemStorage();

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
