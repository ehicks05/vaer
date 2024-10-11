import type { IconType } from 'react-icons';
import { GrStatusPlaceholder } from 'react-icons/gr';
import {
	WiCloudy,
	WiCloudyGusts,
	WiDayCloudy,
	WiDayFog,
	WiDayHail,
	WiDayHaze,
	WiDayLightning,
	WiDayRain,
	WiDayRainMix,
	WiDayShowers,
	WiDaySleet,
	WiDaySnow,
	WiDaySprinkle,
	WiDayStormShowers,
	WiDaySunny,
	WiDaySunnyOvercast,
	WiDayThunderstorm,
	WiDust,
	WiFog,
	WiHail,
	WiHot,
	WiHurricane,
	WiLightning,
	WiNightAltCloudy,
	WiNightAltHail,
	WiNightAltLightning,
	WiNightAltPartlyCloudy,
	WiNightAltRain,
	WiNightAltRainMix,
	WiNightAltShowers,
	WiNightAltSleet,
	WiNightAltSnow,
	WiNightAltSprinkle,
	WiNightAltStormShowers,
	WiNightAltThunderstorm,
	WiNightClear,
	WiNightFog,
	WiRain,
	WiRainMix,
	WiShowers,
	WiSleet,
	WiSmoke,
	WiSnow,
	WiSnowflakeCold,
	WiSprinkle,
	WiStormShowers,
	WiStrongWind,
	WiThunderstorm,
	WiTornado,
	WiWindy,
} from 'react-icons/wi';

export const OWM_TO_ICON: Record<string, IconType> = {
	'wi-owm-200': WiThunderstorm,
	'wi-owm-201': WiThunderstorm,
	'wi-owm-202': WiThunderstorm,
	'wi-owm-210': WiLightning,
	'wi-owm-211': WiLightning,
	'wi-owm-212': WiLightning,
	'wi-owm-221': WiLightning,
	'wi-owm-230': WiThunderstorm,
	'wi-owm-231': WiThunderstorm,
	'wi-owm-232': WiThunderstorm,
	'wi-owm-300': WiSprinkle,
	'wi-owm-301': WiSprinkle,
	'wi-owm-302': WiRain,
	'wi-owm-310': WiRainMix,
	'wi-owm-311': WiRain,
	'wi-owm-312': WiRain,
	'wi-owm-313': WiShowers,
	'wi-owm-314': WiRain,
	'wi-owm-321': WiSprinkle,
	'wi-owm-500': WiSprinkle,
	'wi-owm-501': WiRain,
	'wi-owm-502': WiRain,
	'wi-owm-503': WiRain,
	'wi-owm-504': WiRain,
	'wi-owm-511': WiRainMix,
	'wi-owm-520': WiShowers,
	'wi-owm-521': WiShowers,
	'wi-owm-522': WiShowers,
	'wi-owm-531': WiStormShowers,
	'wi-owm-600': WiSnow,
	'wi-owm-601': WiSnow,
	'wi-owm-602': WiSleet,
	'wi-owm-611': WiRainMix,
	'wi-owm-612': WiRainMix,
	'wi-owm-615': WiRainMix,
	'wi-owm-616': WiRainMix,
	'wi-owm-620': WiRainMix,
	'wi-owm-621': WiSnow,
	'wi-owm-622': WiSnow,
	'wi-owm-701': WiShowers,
	'wi-owm-711': WiSmoke,
	'wi-owm-721': WiDayHaze,
	'wi-owm-731': WiDust,
	'wi-owm-741': WiFog,
	'wi-owm-761': WiDust,
	'wi-owm-762': WiDust,
	'wi-owm-771': WiCloudyGusts,
	'wi-owm-781': WiTornado,
	'wi-owm-800': WiDaySunny,
	'wi-owm-801': WiCloudy,
	'wi-owm-802': WiCloudy,
	'wi-owm-803': WiCloudy,
	'wi-owm-804': WiCloudy,
	'wi-owm-900': WiTornado,
	'wi-owm-901': WiStormShowers,
	'wi-owm-902': WiHurricane,
	'wi-owm-903': WiSnowflakeCold,
	'wi-owm-904': WiHot,
	'wi-owm-905': WiWindy,
	'wi-owm-906': WiHail,
	'wi-owm-957': WiStrongWind,
	'wi-owm-day-200': WiDayThunderstorm,
	'wi-owm-day-201': WiDayThunderstorm,
	'wi-owm-day-202': WiDayThunderstorm,
	'wi-owm-day-210': WiDayLightning,
	'wi-owm-day-211': WiDayLightning,
	'wi-owm-day-212': WiDayLightning,
	'wi-owm-day-221': WiDayLightning,
	'wi-owm-day-230': WiDayThunderstorm,
	'wi-owm-day-231': WiDayThunderstorm,
	'wi-owm-day-232': WiDayThunderstorm,
	'wi-owm-day-300': WiDaySprinkle,
	'wi-owm-day-301': WiDaySprinkle,
	'wi-owm-day-302': WiDayRain,
	'wi-owm-day-310': WiDayRain,
	'wi-owm-day-311': WiDayRain,
	'wi-owm-day-312': WiDayRain,
	'wi-owm-day-313': WiDayRain,
	'wi-owm-day-314': WiDayRain,
	'wi-owm-day-321': WiDaySprinkle,
	'wi-owm-day-500': WiDaySprinkle,
	'wi-owm-day-501': WiDayRain,
	'wi-owm-day-502': WiDayRain,
	'wi-owm-day-503': WiDayRain,
	'wi-owm-day-504': WiDayRain,
	'wi-owm-day-511': WiDayRainMix,
	'wi-owm-day-520': WiDayShowers,
	'wi-owm-day-521': WiDayShowers,
	'wi-owm-day-522': WiDayShowers,
	'wi-owm-day-531': WiDayStormShowers,
	'wi-owm-day-600': WiDaySnow,
	'wi-owm-day-601': WiDaySleet,
	'wi-owm-day-602': WiDaySnow,
	'wi-owm-day-611': WiDayRainMix,
	'wi-owm-day-612': WiDayRainMix,
	'wi-owm-day-615': WiDayRainMix,
	'wi-owm-day-616': WiDayRainMix,
	'wi-owm-day-620': WiDayRainMix,
	'wi-owm-day-621': WiDaySnow,
	'wi-owm-day-622': WiDaySnow,
	'wi-owm-day-701': WiDayShowers,
	'wi-owm-day-711': WiSmoke,
	'wi-owm-day-721': WiDayHaze,
	'wi-owm-day-731': WiDust,
	'wi-owm-day-741': WiDayFog,
	'wi-owm-day-761': WiDust,
	'wi-owm-day-762': WiDust,
	'wi-owm-day-781': WiTornado,
	'wi-owm-day-800': WiDaySunny,
	'wi-owm-day-801': WiDaySunnyOvercast,
	'wi-owm-day-802': WiDaySunnyOvercast,
	'wi-owm-day-803': WiDayCloudy,
	'wi-owm-day-804': WiDayCloudy,
	'wi-owm-day-900': WiTornado,
	'wi-owm-day-902': WiHurricane,
	'wi-owm-day-903': WiSnowflakeCold,
	'wi-owm-day-904': WiHot,
	'wi-owm-day-906': WiDayHail,
	'wi-owm-day-957': WiStrongWind,
	'wi-owm-night-200': WiNightAltThunderstorm,
	'wi-owm-night-201': WiNightAltThunderstorm,
	'wi-owm-night-202': WiNightAltThunderstorm,
	'wi-owm-night-210': WiNightAltLightning,
	'wi-owm-night-211': WiNightAltLightning,
	'wi-owm-night-212': WiNightAltLightning,
	'wi-owm-night-221': WiNightAltLightning,
	'wi-owm-night-230': WiNightAltThunderstorm,
	'wi-owm-night-231': WiNightAltThunderstorm,
	'wi-owm-night-232': WiNightAltThunderstorm,
	'wi-owm-night-300': WiNightAltSprinkle,
	'wi-owm-night-301': WiNightAltSprinkle,
	'wi-owm-night-302': WiNightAltRain,
	'wi-owm-night-310': WiNightAltRain,
	'wi-owm-night-311': WiNightAltRain,
	'wi-owm-night-312': WiNightAltRain,
	'wi-owm-night-313': WiNightAltRain,
	'wi-owm-night-314': WiNightAltRain,
	'wi-owm-night-321': WiNightAltSprinkle,
	'wi-owm-night-500': WiNightAltSprinkle,
	'wi-owm-night-501': WiNightAltRain,
	'wi-owm-night-502': WiNightAltRain,
	'wi-owm-night-503': WiNightAltRain,
	'wi-owm-night-504': WiNightAltRain,
	'wi-owm-night-511': WiNightAltRainMix,
	'wi-owm-night-520': WiNightAltShowers,
	'wi-owm-night-521': WiNightAltShowers,
	'wi-owm-night-522': WiNightAltShowers,
	'wi-owm-night-531': WiNightAltStormShowers,
	'wi-owm-night-600': WiNightAltSnow,
	'wi-owm-night-601': WiNightAltSleet,
	'wi-owm-night-602': WiNightAltSnow,
	'wi-owm-night-611': WiNightAltRainMix,
	'wi-owm-night-612': WiNightAltRainMix,
	'wi-owm-night-615': WiNightAltRainMix,
	'wi-owm-night-616': WiNightAltRainMix,
	'wi-owm-night-620': WiNightAltRainMix,
	'wi-owm-night-621': WiNightAltSnow,
	'wi-owm-night-622': WiNightAltSnow,
	'wi-owm-night-701': WiNightAltShowers,
	'wi-owm-night-711': WiSmoke,
	'wi-owm-night-721': WiDayHaze,
	'wi-owm-night-731': WiDust,
	'wi-owm-night-741': WiNightFog,
	'wi-owm-night-761': WiDust,
	'wi-owm-night-762': WiDust,
	'wi-owm-night-781': WiTornado,
	'wi-owm-night-800': WiNightClear,
	'wi-owm-night-801': WiNightAltPartlyCloudy,
	'wi-owm-night-802': WiNightAltPartlyCloudy,
	'wi-owm-night-803': WiNightAltCloudy,
	'wi-owm-night-804': WiNightAltCloudy,
	'wi-owm-night-900': WiTornado,
	'wi-owm-night-902': WiHurricane,
	'wi-owm-night-903': WiSnowflakeCold,
	'wi-owm-night-904': WiHot,
	'wi-owm-night-906': WiNightAltHail,
	'wi-owm-night-957': WiStrongWind,
};

export const getWeatherIcon = (weatherCode: number, icon: string) => {
	const mode = icon.endsWith('d') ? '-day' : icon.endsWith('n') ? '-night' : '';
	const key = `wi-owm${mode}-${weatherCode}`;
	return OWM_TO_ICON[key] || GrStatusPlaceholder;
};

const WMO_CODE_TO_ICON: Record<string, IconType> = {
	'0-day': WiDaySunny,
	'0-night': WiNightClear,
};

export const getWmoWeatherIcon = (weatherCode: number, isDay: boolean) => {
	const dayNight = isDay ? 'day' : 'night';
	const key = `${weatherCode}-${dayNight}`;
	return WMO_CODE_TO_ICON[key] || GrStatusPlaceholder;
};
