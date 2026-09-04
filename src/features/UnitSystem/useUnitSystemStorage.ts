import { useLocalStorage } from 'usehooks-ts';
import { UNIT_SYSTEMS, type UnitSystem } from './constants';

const KEY = 'vaer-unit-system';
const DEFAULT = UNIT_SYSTEMS.IMPERIAL;

export const useUnitSystemStorage = () => {
	const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>(KEY, DEFAULT);

	return {
		unitSystem,
		toggleUnitSystem: () =>
			setUnitSystem((unit) => (unit === 'imperial' ? 'metric' : 'imperial')),
	};
};
