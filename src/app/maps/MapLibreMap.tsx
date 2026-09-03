import { omProtocol } from '@openmeteo/weather-map-layer';
import { addProtocol, setWorkerUrl } from 'maplibre-gl';
import MapLibre, { Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

setWorkerUrl(workerUrl);

addProtocol('om', omProtocol);
const omUrl =
	'https://openmeteo.s3.amazonaws.com/data_spatial/dwd_icon/latest.json?time_step=current_time_1H&variable=precipitation&dark=true';

const MAP_TILER_API_KEY = 'Z0saQSNyZmNKMPbZnckK';
const mapStyle = `https://api.maptiler.com/maps/dataviz-v4-dark/style.json?key=${MAP_TILER_API_KEY}`;

interface Props {
	coords: [number, number];
}

export function MapLibreMap({ coords: [latitude, longitude] }: Props) {
	return (
		<MapLibre
			initialViewState={{
				longitude,
				latitude,
				zoom: 6,
			}}
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
