import { omProtocol } from '@openmeteo/weather-map-layer';
import { addProtocol, setWorkerUrl } from 'maplibre-gl';
import MapLibre, {
	Layer,
	type MapRef,
	Source,
	type ViewStateChangeEvent,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useQuery } from '@tanstack/react-query';
import { range, round } from 'es-toolkit';
import { Locate, LocateFixed, PauseCircle, PlayCircle } from 'lucide-react';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { Button } from '@/components/ui/button';

setWorkerUrl(workerUrl);

addProtocol('om', omProtocol);

const mapStyle = 'https://tiles.openfreemap.org/styles/positron';

const OM_BASE =
	'https://openmeteo.s3.amazonaws.com/data_spatial/dwd_icon/latest.json';

interface OmJson {
	last_modified_time: string;
	reference_time: string;
	valid_times: string[];
	variables: string[];
}

const DEFAULT = { zoom: 6 };

interface Props {
	coords: [number, number];
	tz?: string;
}

export function MapLibreMap({ coords: [latitude, longitude], tz }: Props) {
	const mapRef = useRef<MapRef>(null);
	const meta = useQuery({
		queryKey: ['foo2'],
		queryFn: async () => {
			const res = await fetch(OM_BASE);
			const json: OmJson = await res.json();
			return json;
		},
		staleTime: 1000 * 60,
	});

	// console.log(meta.data?.valid_times.slice(0, 12));

	const handleGoToCoords = () => {
		mapRef.current?.flyTo({ center: [longitude, latitude], zoom: DEFAULT.zoom });
		setIsFixed(true);
	};

	useEffect(() => {
		mapRef.current?.flyTo({ center: [longitude, latitude], zoom: DEFAULT.zoom });
	}, [latitude, longitude]);

	const firstTimeStepIndex =
		meta.data?.valid_times.findIndex((o) => new Date(o).getTime() > Date.now()) || 0;
	const timeSteps = range(5).map((o) => o + firstTimeStepIndex);
	const layers = timeSteps.map((timeStep) => ({
		id: timeStep,
		url: `om://${OM_BASE}?${new URLSearchParams({ time_step: `valid_times_${timeStep}`, variable: 'precipitation' })}`,
	}));
	const [activeLayerIndex, setActiveLayerIndex] = useState(0);

	const [interval, setInterval] = useState<IntervalDelay>(null);
	const toggleInterval = () => {
		setInterval((interval) => (interval ? null : 2000));
		setActiveLayerIndex(0);
	};

	useInterval(() => setActiveLayerIndex((i) => (i + 1) % layers.length), interval);

	const activeLayer = layers[activeLayerIndex];

	const [isFixed, setIsFixed] = useState(true);

	const handleMove = useCallback(
		({ viewState }: ViewStateChangeEvent) => {
			setIsFixed(
				round(viewState.latitude, 2) === round(latitude, 2) &&
					round(viewState.longitude, 2) === round(longitude, 2),
			);
		},
		[latitude, longitude],
	);

	if (!meta.data) {
		return 'foo';
	}

	return (
		<div className="relative w-full h-full">
			<MapLibre
				ref={mapRef}
				initialViewState={{ longitude, latitude, zoom: DEFAULT.zoom }}
				style={{ width: '100%', height: '100%', borderRadius: '8px' }}
				mapStyle={mapStyle}
				attributionControl={false}
				onMove={handleMove}
			>
				{layers.map((layer) => {
					return (
						<Source
							key={layer.id}
							id={String(layer.id)}
							url={layer.url}
							type="raster"
							maxzoom={12}
						>
							<Layer
								id={String(layer.id)}
								type="raster"
								source="omFileSource"
								paint={{ 'raster-opacity': layer.id === activeLayer.id ? 0.75 : 0 }}
							/>
						</Source>
					);
				})}

				<Controls
					activeLayerId={activeLayer.id}
					validTimes={meta.data.valid_times}
					tz={tz}
					interval={interval}
					toggleInterval={toggleInterval}
					isFixed={isFixed}
					handleGoToCoords={handleGoToCoords}
				/>
			</MapLibre>
		</div>
	);
}

type IntervalDelay = 2000 | null;

export const Controls = ({
	activeLayerId,
	validTimes,
	tz,
	interval,
	toggleInterval,
	isFixed,
	handleGoToCoords,
}: {
	activeLayerId: number;
	validTimes: string[];
	tz?: string;
	interval: IntervalDelay;
	toggleInterval: () => void;
	isFixed: boolean;
	handleGoToCoords: () => void;
}) => {
	return (
		<>
			<div className="absolute bottom-2 left-2 flex items-center gap-2 shadow-xl rounded-lg bg-muted">
				<Button variant="secondary" size="icon-sm" onClick={toggleInterval}>
					{interval ? <PauseCircle /> : <PlayCircle />}
				</Button>
				<div className="pr-2">
					{new Date(validTimes[activeLayerId]).toLocaleTimeString('en-US', {
						hour: 'numeric',
						timeZone: tz,
						timeZoneName: 'short',
					})}
				</div>
			</div>
			<div className="absolute bottom-2 right-2 shadow-xl">
				<Button variant="secondary" size="icon-sm" onClick={handleGoToCoords}>
					{isFixed ? <LocateFixed /> : <Locate />}
				</Button>
			</div>
		</>
	);
};
