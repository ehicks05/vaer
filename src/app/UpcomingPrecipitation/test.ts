import type { Minutely15 } from '@/services/openMeteo/types/forecast';

export const toTestData = (data: Minutely15, i: number) => ({
	...data,
	precipitation: i === 1 ? 0.0025 : i / 50,
});
