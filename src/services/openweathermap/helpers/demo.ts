import type { OneCallResponse } from '../types/oneCall';

export const DEMO_ALERT: OneCallResponse['alerts'][number] = {
	sender_name: 'sender_name',
	event: 'event',
	start: new Date('2024-01-01').getTime(),
	end: new Date('2024-02-01').getTime(),
	description: 'description',
	tags: ['tag1', 'tag2'],
};
