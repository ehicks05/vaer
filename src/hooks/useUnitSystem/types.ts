import type { UNIT_SYSTEMS } from "./constants";

export type UnitSystem = typeof UNIT_SYSTEMS[keyof typeof UNIT_SYSTEMS];