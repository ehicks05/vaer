export const UNIT_SYSTEMS = {
	IMPERIAL: 'imperial',
	METRIC: 'metric',
} as const;

export const UNIT_SYSTEM_LABELS = {
	[UNIT_SYSTEMS.IMPERIAL]: 'Imperial',
	[UNIT_SYSTEMS.METRIC]: 'Metric',
} as const;

export type UnitSystem = (typeof UNIT_SYSTEMS)[keyof typeof UNIT_SYSTEMS];
