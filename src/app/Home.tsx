import React from "react";
import { Card } from "@/components";
import { WiDaySnow } from "react-icons/wi";
import { useGeolocation } from "@uidotdev/usehooks";
import { useGetForecast, useGetPoint } from "@/services/weather";

export const Home = () => {
  const {latitude: lat, longitude: long} = useGeolocation();

  const pointQuery = useGetPoint({
    lat, long
  });
  const forecastQuery = useGetForecast({
    url: pointQuery.data?.properties.forecast
  });

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4">
      <div className="flex flex-col items-center flex-grow">
        {pointQuery.data?.properties.relativeLocation.properties.city},{" "}
        {pointQuery.data?.properties.relativeLocation.properties.state}
        <WiDaySnow size={32} />
      </div>
      <Card className="bg-sky-950">
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(forecastQuery.data?.properties.periods?.[0], null, 2)}
        </pre>
      </Card>
    </div>
  );
}
