import { Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UNIT_SYSTEM_LABELS, useUnitSystemStorage } from './useUnitSystemStorage';

export const UnitSystemToggle = () => {
	const { unitSystem, toggleUnitSystem } = useUnitSystemStorage();

	return (
		<Button variant="outline" onClick={toggleUnitSystem}>
			<Boxes /> {UNIT_SYSTEM_LABELS[unitSystem]}
		</Button>
	);
};
