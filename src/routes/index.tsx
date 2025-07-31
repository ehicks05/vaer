import { Footer, Header } from '@/components';
import { AppProvider } from '@/contexts/AppProvider';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createFileRoute } from '@tanstack/react-router';
import { Home } from '../app/Home';

export const Route = createFileRoute('/')({
	component: Index,
	ssr: false,
});

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
	key: 'vaer-REACT_QUERY_OFFLINE_CACHE',
});

function Index() {
	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
			<AppProvider>
				<div className="flex flex-col min-h-screen bg-linear-to-r from-stone-900 to-neutral-950">
					<div className="sm:px-4">
						<Header />
					</div>
					<div className="grow flex flex-col h-full sm:px-4">
						<Home />
					</div>
					<Footer />
				</div>
			</AppProvider>
		</PersistQueryClientProvider>
	);
}
