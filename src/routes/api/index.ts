// import { createAPIFileRoute } from '@tanstack/react-start/api';
// import httpProxy from 'http-proxy';
// import { IncomingMessage } from 'node:http';

// const API_PROXY_URL = 'https://api.openweathermap.org';

// export const APIRoute = createAPIFileRoute('/api/hello')({
// 	GET: async ({ request }) => {
// 		const req = new Request(request.url, {
// 			headers: request.headers,
// 			method: request.method,
// 			body: request.body,
// 		});

// 		new IncomingMessage(request);

// 		console.log(req.method); // GET
// 		console.log(req.headers.get('User-Agent'));

// 		const res = new Response();

// 		new Promise((resolve, reject) => {
// 			const proxy: httpProxy = httpProxy.createProxy({
// 				target: API_PROXY_URL,
// 				changeOrigin: true,
// 				xfwd: true,
// 			});

// 			proxy.once('proxyReq', (proxyReq, req, res, options) => {
// 				proxyReq.path = proxyReq.path.replace('/api', '');
// 				proxyReq.path = proxyReq.path.replace(
// 					'appid=',
// 					`appid=${process.env.OWM_API_KEY}`,
// 				);
// 				proxyReq.setHeader('x-forwarded-port', '443');
// 				proxyReq.setHeader('x-forwarded-proto', 'https');
// 				console.log(proxyReq.path);
// 			});
// 			proxy.once('proxyRes', resolve);
// 			proxy.once('error', reject);
// 			proxy.web(req, res);
// 		});

// 		return res;
// 	},
// });
