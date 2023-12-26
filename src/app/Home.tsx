import React from 'react';
import { PreferredTempToggle, Temp } from './PreferredTemperature';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { useOpenWeatherMap, useWeatherGov } from '@/hooks';
import { getWeatherIcon } from './weather_icons';
import { Card } from '@/components';
import { WiDirectionUp, WiSunrise, WiSunset } from 'react-icons/wi';
import { format } from 'date-fns';

const CurrentConditions = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { pointQuery } = useWeatherGov();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { temp, feels_like, weather },
	} = oneCallQuery.data;
	const { id, icon, description } = weather[0];

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const friendlyLocation = city && location ? `${city}, ${state}` : '';

	const Icon = getWeatherIcon(id, icon);

	return (
		<div className="flex flex-col items-center">
			{friendlyLocation}
			<div className="text-6xl text-center">
				<Temp temp={temp} />
				<PreferredTempToggle />
				<pre className="mt-2 text-sm">
					Feels like <Temp temp={feels_like} />
				</pre>
			</div>
			<Icon className="inline" size={64} title={description} />
		</div>
	);
};

const degreeToDirection = (degree: number) => {
	const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const index = Math.round(degree / 45) % DIRECTIONS.length; 
	return DIRECTIONS[index];
}

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
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl w-full">
      Wind
      <Card>
        <div className="flex flex-col gap-4 w-full p-4">
          <WiDirectionUp size={32} style={{ transform: `rotate(${wind_deg}deg)` }} />
          <div>
            {wind_speed} mph {degreeToDirection(wind_deg)}
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

  const {
   sunrise, sunset,
  } = oneCallQuery.data.daily[0];

  return (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl w-full">
      Sunrise(set)
      <Card>
        <div className="flex flex-col gap-4 w-full p-4">
          <WiSunrise size={32}/>
          <div>{format(sunrise * 1000, "h:mm a")}</div>
        </div>
        <div className="flex flex-col gap-4 w-full p-4">
          <WiSunset size={32}/>
          <div>{format(sunset * 1000, "h:mm a")}</div>
        </div>
      </Card>
    </div>
  );
};

export const Home = () => {
	return (
		<div className="flex flex-col flex-grow items-center justify-center gap-4">
			<CurrentConditions />
			<HourlyForecast />
			<DailyForecast />
			<Wind />
			<SunriseSunset />
		</div>
	);
};
