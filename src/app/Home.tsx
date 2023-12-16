import React from "react";
import { Button } from "@/components";
import { useStopwatch } from "@/hooks";
import { BiStopwatch } from "react-icons/bi";
import { FONT_SIZES, BUTTON_SIZES } from "@/constants";
import { MdRestartAlt, MdPlayArrow, MdPause } from "react-icons/md";
import { useGeolocation } from "@uidotdev/usehooks";

export const Home = () => {
  const state = useGeolocation();

  

  return (
    <div className="font-mono flex flex-col flex-grow items-center justify-center gap-4">
      <div className="flex flex-col items-center flex-grow">
      </div>
      <div className="flex items-center gap-8">
        <pre>{ JSON.stringify(state, null, 2) }</pre>
      </div>
    </div>
  );
}
