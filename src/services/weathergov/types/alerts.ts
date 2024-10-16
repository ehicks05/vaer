// generated with json to ts on a sample response
export interface AlertsResponse {
	'@context': [string, Context];
	type: string;
	features: Feature[];
	title: string;
	updated: string;
}

export interface Context {
	'@version': string;
	wx: string;
	'@vocab': string;
}

export interface Feature {
	id: string;
	type: string;
	geometry: unknown;
	properties: Properties;
}

export interface Properties {
	'@id': string;
	'@type': string;
	id: string;
	areaDesc: string;
	geocode: Geocode;
	affectedZones: string[];
	references: unknown[];
	sent: string;
	effective: string;
	onset: string;
	expires: string;
	ends: string;
	status: string;
	messageType: string;
	category: string;
	severity: string;
	certainty: string;
	urgency: string;
	event: string;
	sender: string;
	senderName: string;
	headline: string;
	description: string;
	instruction: string;
	response: string;
	parameters: Parameters;
}

export interface Geocode {
	SAME: string[];
	UGC: string[];
}

export interface Parameters {
	AWIPSidentifier: string[];
	WMOidentifier: string[];
	NWSheadline: string[];
	BLOCKCHANNEL: string[];
	VTEC: string[];
	eventEndingTime: string[];
}
