import { useLocalStorage } from '@uidotdev/usehooks';
import { UNIT_SYSTEMS } from './constants';
import type { UnitSystem } from './types';

const KEY = 'vaer-unit-system';
const DEFAULT = UNIT_SYSTEMS.IMPERIAL

export const useUnitSystemToggle = () => {
	const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>(KEY, DEFAULT);

	return {
		unitSystem,
		toggleUnitSystem: () =>
			setUnitSystem((unit) => (unit === 'imperial' ? 'metric' : 'imperial')),
	};
};
