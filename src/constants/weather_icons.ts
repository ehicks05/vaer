import type { IconType } from 'react-icons';
import { GrStatusPlaceholder } from 'react-icons/gr';
import {
	WiDayFog,
	WiDayRain,
	WiDayRainMix,
	WiDayShowers,
	WiDaySnow,
	WiDaySprinkle,
	WiDaySunny,
	WiDaySunnyOvercast,
	WiDayThunderstorm,
	WiNightAltCloudy,
	WiNightAltPartlyCloudy,
	WiNightAltRain,
	WiNightAltRainMix,
	WiNightAltShowers,
	WiNightAltSnow,
	WiNightAltSprinkle,
	WiNightAltThunderstorm,
	WiNightClear,
	WiNightFog,
} from 'react-icons/wi';

const WMO_CODE_TO_ICON: Record<string, IconType> = {
	'0-day': WiDaySunny,
	'0-night': WiNightClear,

	'1-day': WiDaySunnyOvercast,
	'1-night': WiNightAltPartlyCloudy,
	'2-day': WiDaySunnyOvercast,
	'2-night': WiNightAltPartlyCloudy,
	'3-day': WiDaySunnyOvercast,
	'3-night': WiNightAltCloudy,

	'45-day': WiDayFog,
	'45-night': WiNightFog,
	'48-day': WiDayFog,
	'48-night': WiNightFog,

	'51-day': WiDaySprinkle,
	'51-night': WiNightAltSprinkle,
	'53-day': WiDaySprinkle,
	'53-night': WiNightAltSprinkle,
	'55-day': WiDaySprinkle,
	'55-night': WiNightAltSprinkle,

	'56-day': WiDayRainMix,
	'56-night': WiNightAltRainMix,
	'57-day': WiDayRainMix,
	'57-night': WiNightAltRainMix,

	'61-day': WiDayRain,
	'61-night': WiNightAltRain,
	'63-day': WiDayRain,
	'63-night': WiNightAltRain,
	'65-day': WiDayRain,
	'65-night': WiNightAltRain,

	'66-day': WiDayRainMix,
	'66-night': WiNightAltRainMix,
	'67-day': WiDayRainMix,
	'67-night': WiNightAltRainMix,

	'71-day': WiDaySnow,
	'71-night': WiNightAltSnow,
	'73-day': WiDaySnow,
	'73-night': WiNightAltSnow,
	'75-day': WiDaySnow,
	'75-night': WiNightAltSnow,

	'77-day': WiDaySnow,
	'77-night': WiNightAltSnow,

	'80-day': WiDayShowers,
	'80-night': WiNightAltShowers,
	'81-day': WiDayShowers,
	'81-night': WiNightAltShowers,
	'82-day': WiDayShowers,
	'82-night': WiNightAltShowers,

	'85-day': WiDaySnow,
	'85-night': WiNightAltSnow,
	'86-day': WiDaySnow,
	'86-night': WiNightAltSnow,

	'95-day': WiDayThunderstorm,
	'95-night': WiNightAltThunderstorm,

	'96-day': WiDayThunderstorm,
	'96-night': WiNightAltThunderstorm,
	'99-day': WiDayThunderstorm,
	'99-night': WiNightAltThunderstorm,
};

export const getWmoWeatherIcon = (weatherCode: number, isDay: boolean) => {
	const dayNight = isDay ? 'day' : 'night';
	const key = `${weatherCode}-${dayNight}`;
	return WMO_CODE_TO_ICON[key] || GrStatusPlaceholder;
};
