import { createFileRoute, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Home,
	loader: async () => ({ im: 'cool' }),
});

function Home() {
	const router = useRouter();
	const state = Route.useLoaderData();

	return <div>{state.im}</div>;
}
