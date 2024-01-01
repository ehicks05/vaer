import React, { useState } from 'react';
import { Temp } from './PreferredTemperature';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { useActiveLocation, useOpenWeatherMap, useWeatherGov } from '@/hooks';
import { getWeatherIcon } from '../constants/weather_icons';
import { Button, Card } from '@/components';
import {
	WiBarometer,
	WiDirectionUp,
	WiHumidity,
	WiSunrise,
	WiSunset,
} from 'react-icons/wi';
import { MdOutlineVisibility } from 'react-icons/md';
import { format } from 'date-fns';
import { degreeToDirection, hPaToInHg } from './utils';
import { round } from 'lodash';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

const CurrentConditions = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { pointQuery } = useWeatherGov();
	const { data } = oneCallQuery;

	const [activeLocation] = useActiveLocation();

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { temp, feels_like, weather },
	} = oneCallQuery.data;
	const { id, icon, description } = weather[0];

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const friendlyLocation = activeLocation
		? `${activeLocation.name}${
				activeLocation.adminCode1 ? `, ${activeLocation.adminCode1}` : ''
		  }`
		: city && location
		  ? `${city}, ${state}`
		  : '';

	const Icon = getWeatherIcon(id, icon);

	return (
		<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
			{friendlyLocation}
			<div className="flex gap-2 items-center text-6xl text-center">
				<Temp temp={temp} />
				<div>
					<Icon className="inline" size={64} title={description} />
				</div>
			</div>
			feels like <Temp temp={feels_like} /> &middot; {description}
		</div>
	);
};

const Wind = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { wind_deg, wind_speed },
	} = oneCallQuery.data;

	return (
		<div className="h-full flex flex-col">
			Wind
			<Card className="h-full">
				<div className="flex items-center gap-2 w-full p-4">
					<WiDirectionUp
						size={32}
						title={`${wind_deg}\u00B0`}
						style={{ transform: `rotate(${wind_deg}deg)` }}
					/>
					<div>
						{Math.round(wind_speed)} mph {degreeToDirection(wind_deg)}
					</div>
				</div>
			</Card>
		</div>
	);
};

const Humidity = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { humidity },
	} = oneCallQuery.data;

	return (
		<div>
			Humidity
			<Card>
				<div className="flex items-center gap-2 w-full p-4">
					<WiHumidity size={32} />
					<div>{Math.round(humidity)}</div>
				</div>
			</Card>
		</div>
	);
};

const getPressureDescription = (inHg: number) => {
	if (inHg < 29.8) return 'Low';
	if (inHg > 30.2) return 'High';
	return 'Normal';
};

const Pressure = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { pressure },
	} = oneCallQuery.data;
	const inHg = hPaToInHg(pressure);
	const description = getPressureDescription(inHg);

	return (
		<div>
			Pressure
			<Card>
				<div className="flex items-center gap-2 w-full p-4">
					<WiBarometer size={32} />
					<div>
						{round(inHg, 1)}: {description}
					</div>
				</div>
			</Card>
		</div>
	);
};

const fmt = Intl.NumberFormat('en-US', {
	unit: 'meter',
	notation: 'compact',
	maximumSignificantDigits: 2,
});

const Visibility = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { visibility },
	} = oneCallQuery.data;

	return (
		<div>
			Visibility
			<Card>
				<div className="flex items-center gap-2 w-full p-4">
					<MdOutlineVisibility size={24} />
					<div>{fmt.format(visibility)}m</div>
				</div>
			</Card>
		</div>
	);
};

const AQI_DISPLAY_NAMES: Record<number, string> = {
	1: 'Good',
	2: 'Fair',
	3: 'Moderate',
	4: 'Poor',
	5: 'Very Poor',
};

const AirPollution = () => {
	const { airPollutionQuery } = useOpenWeatherMap();
	const { data } = airPollutionQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { list },
	} = airPollutionQuery.data;
	const { aqi } = list[0].main;

	return (
		<div>
			Air Quality
			<Card>
				<div className="flex items-center gap-2 w-full p-4">
					<div>
						{aqi}: {AQI_DISPLAY_NAMES[aqi]}
					</div>
				</div>
			</Card>
		</div>
	);
};

const SunriseSunset = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const { sunrise, sunset } = oneCallQuery.data.daily[0];

	return (
		<div className="">
			Sunrise / Sunset
			<Card>
				<div className="flex flex-col gap-2 p-4">
					<div className="flex items-center gap-2 w-full">
						<WiSunrise size={32} />
						<div>{format(sunrise, 'h:mm a')}</div>
					</div>
					<div className="flex items-center gap-2 w-full">
						<WiSunset size={32} />
						<div>{format(sunset, 'h:mm a')}</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

const Alert = () => {
	const [showDescription, setShowDescription] = useState(false);
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const alert = data.alerts?.[0];
	if (!alert) {
		return null;
	}
	const fmt = 'MMM dd h:mma';

	return (
		<Card gradient={false} className="col-span-full p-4 bg-slate-800">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-2xl">
					<HiOutlineExclamationTriangle className="text-red-500" />
					{alert.event}
				</div>
				<Button
					onClick={() => setShowDescription((showDescription) => !showDescription)}
				>
					{showDescription ? 'Hide' : 'Show'} details
				</Button>
				{showDescription && (
					<>
						<div className="text-sm">
							{format(alert.start, fmt)} to {format(alert.end, fmt)}
						</div>
						<div className="text-sm">{alert.sender_name}</div>
						<div className="text-sm">{alert.description}</div>
					</>
				)}
			</div>
		</Card>
	);
};

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState<number | undefined>();

	const currentConditions = (
		<div className="col-span-2">
			Currently
			<CurrentConditions />
		</div>
	);

	return (
		<div className="p-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-4">
			<Alert />
			<div className="md:hidden">{currentConditions}</div>
			<div className="h-full">
				<DailyForecast
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4 xl:col-span-2">
				<div className="col-span-2 hidden md:block">
					Currently
					<CurrentConditions />
				</div>
				<div className="col-span-2">
					<HourlyForecast />
				</div>
				<div className="col-span-1 h-full">
					<Wind />
				</div>
				<div className="col-span-1 h-full">
					<SunriseSunset />
				</div>
				<div className="col-span-1 h-full">
					<Humidity />
				</div>
				<div className="col-span-1 h-full">
					<Pressure />
				</div>
				<div className="col-span-1 h-full">
					<Visibility />
				</div>
				<div className="col-span-1 h-full">
					<AirPollution />
				</div>
			</div>
		</div>
	);
};
