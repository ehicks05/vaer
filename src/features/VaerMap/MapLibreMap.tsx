import { omProtocol } from '@openmeteo/weather-map-layer';
import { addProtocol, setWorkerUrl } from 'maplibre-gl';
import MapLibre, { Layer, type MapRef, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useEffect, useRef, useState } from 'react';
import { useInterval } from 'usehooks-ts';

setWorkerUrl(workerUrl);

addProtocol('om', omProtocol);

const MAP_TILER_API_KEY = 'Z0saQSNyZmNKMPbZnckK';
const mapLight = 'dataviz-v4';
const mapStyle = `https://api.maptiler.com/maps/${mapLight}/style.json?key=${MAP_TILER_API_KEY}`;

const OM_BASE =
	'https://openmeteo.s3.amazonaws.com/data_spatial/dwd_icon/latest.json';
const OM_DEFAULTS = {
	time_step: 'current_time_1M',
	variable: 'precipitation',
	dark: 'false',
};

const DEFAULT = { zoom: 6 };

interface Props {
	coords: [number, number];
}

export function MapLibreMap({ coords: [latitude, longitude] }: Props) {
	const mapRef = useRef<MapRef>(null);
	const [t, setT] = useState(Date.now().toString());
	useInterval(() => setT(Date.now().toString()), 1000 * 60);

	const omParams = new URLSearchParams({ ...OM_DEFAULTS, t }).toString();
	const omUrl = `${OM_BASE}?${omParams}`;

	useEffect(() => {
		mapRef.current?.flyTo({ center: [longitude, latitude], zoom: DEFAULT.zoom });
	}, [latitude, longitude]);

	return (
		<MapLibre
			ref={mapRef}
			initialViewState={{ longitude, latitude, zoom: DEFAULT.zoom }}
			style={{ width: '100%', height: '100%', borderRadius: '8px' }}
			mapStyle={mapStyle}
			attributionControl={false}
		>
			<Source url={`om://${omUrl}`} type="raster" maxzoom={12}>
				<Layer
					id="omFileLayer"
					type="raster"
					source="omFileSource"
					paint={{ 'raster-opacity': 0.75 }}
				/>
			</Source>
		</MapLibre>
	);
}
