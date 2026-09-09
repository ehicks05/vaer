import { useLocalStorage } from 'usehooks-ts';

export const UNIT_SYSTEMS = {
	IMPERIAL: 'imperial',
	METRIC: 'metric',
} as const;

export type UnitSystem = (typeof UNIT_SYSTEMS)[keyof typeof UNIT_SYSTEMS];

export const UNIT_SYSTEM_LABELS = {
	[UNIT_SYSTEMS.IMPERIAL]: 'Imperial',
	[UNIT_SYSTEMS.METRIC]: 'Metric',
} as const;

const getDefault = () => {
	const US = ['US', 'PR', 'VI', 'GU', 'MP', 'AS'];
	const MICRONESIA = ['FM', 'MH', 'PW'];
	const CARIBBEAN = ['BS', 'BZ', 'KY'];
	const IMPERIAL_REGIONS = [...US, ...MICRONESIA, ...CARIBBEAN];

	const { region } = new Intl.Locale(navigator.language);
	const isImperial = region && IMPERIAL_REGIONS.includes(region);
	return isImperial ? UNIT_SYSTEMS.IMPERIAL : UNIT_SYSTEMS.METRIC;
};

const KEY = 'vaer-unit-system';
const defaultSystem = getDefault();

export const useUnitSystemStorage = () => {
	const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>(
		KEY,
		defaultSystem,
	);

	return {
		unitSystem,
		toggleUnitSystem: () =>
			setUnitSystem((unit) => (unit === 'imperial' ? 'metric' : 'imperial')),
	};
};
