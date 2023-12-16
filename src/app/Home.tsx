import React from "react";
import { Card } from "@/components";
import { WiDayCloudy, WiDayRain, WiDaySnow, WiDaySunny, WiNightClear, WiNightCloudy, WiNightPartlyCloudy, WiNightRain } from "react-icons/wi";
import { useGeolocation } from "@uidotdev/usehooks";
import { useGetHourlyForecast, useGetPoint } from "@/services/weather";
import { format, isAfter } from "date-fns";
import { GrStatusPlaceholder } from "react-icons/gr";

const useWeather = () => {
  const geolocation = useGeolocation();
  const { latitude: lat, longitude: long } = geolocation;

  const pointQuery = useGetPoint({
    lat, long
  });

  const hourlyForecastQuery = useGetHourlyForecast({
    url: pointQuery.data?.properties.forecastHourly
  });

  return { geolocation, pointQuery, hourlyForecastQuery };
}

const getIcon = ({ shortForecast, isDay }: { shortForecast: string; isDay: boolean }) => {
  if (shortForecast.includes('Sunny') || shortForecast.includes('Clear')) {
    return isDay ? WiDaySunny : WiNightClear ;
  }

  if (shortForecast.includes('Cloud')) {
    return isDay ? WiDayCloudy : WiNightCloudy;
  }
  if (shortForecast.includes('Rain') || shortForecast.includes('Drizzle')) {
    return isDay ? WiDayRain : WiNightRain;
  }

  return GrStatusPlaceholder;
}

const HourlyForecast = () => {
  const { hourlyForecastQuery } = useWeather();
  const { periods } = hourlyForecastQuery.data?.properties || {};
  return <div>
    Hourly Forecast
    <Card>
      <div className="flex gap-4 max-w-screen-sm overflow-auto">

        {periods?.filter(p => isAfter(new Date(p.endTime), new Date()))?.slice(0, 24).map(period =>
        {
          const Icon = getIcon({shortForecast: period.shortForecast, isDay: period.isDaytime});
          return <div className="flex flex-col items-center text-center gap-1" key={period.startTime}>
            <div>
              {period.temperature || ''}&deg;
            </div>
            <div className="flex flex-col gap-1 items-center">
              {Icon && <Icon size={24} />}
            </div>
            <div>
              {format(new Date(period.startTime), 'h a')}
            </div>
            <div>
              {period.shortForecast}
            </div>
          </div>}
        )}
      </div>
    </Card>
  </div>
}

export const Home = () => {
  const {pointQuery } = useWeather();
  const { city, state } = pointQuery.data?.properties.relativeLocation.properties || {};

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        {city}, {state}
        <WiDaySnow size={32} />
      </div>
      <HourlyForecast />
    </div>
  );
}
