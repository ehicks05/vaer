import { createAPIFileRoute } from '@tanstack/react-start/api';

const API_PROXY_URL = 'api.openweathermap.org';

const OWM_API_KEY = process.env.OWM_API_KEY || 'test';

export const APIRoute = createAPIFileRoute('/api/$')({
	GET: async ({ request }) => {
		const proxyUrl = new URL(request.url);
		proxyUrl.protocol = 'https';
		proxyUrl.host = API_PROXY_URL;
		proxyUrl.port = '443';
		proxyUrl.pathname = proxyUrl.pathname.replace('/api', '');
		proxyUrl.searchParams.set('appid', OWM_API_KEY);

		const headers = {
			...request.headers,
			'x-forwarded-port': '443',
			'x-forwarded-proto': 'https',
		};

		console.log({ requestUrl: request.url, proxyUrl, headers });

		const proxyRes = await fetch(proxyUrl, { headers });

		return proxyRes;
	},
});
