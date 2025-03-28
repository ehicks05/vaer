import { useLocalStorage } from '@uidotdev/usehooks';

type UnitSystem = 'imperial' | 'metric';

export const UNIT_SYSTEMS = {
	IMPERIAL: 'imperial',
	METRIC: 'metric',
} as const;

export const UNIT_SYSTEM_LABELS = {
	[UNIT_SYSTEMS.IMPERIAL]: 'Imperial',
	[UNIT_SYSTEMS.METRIC]: 'Metric',
} as const;

export const useUnitSystem = () => {
	const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>(
		'vaer-unit-system',
		'imperial',
	);

	return {
		unitSystem,
		toggleUnitSystem: () =>
			setUnitSystem((unit) => (unit === 'imperial' ? 'metric' : 'imperial')),
	};
};
