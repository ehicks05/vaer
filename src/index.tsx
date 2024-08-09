import './index.css';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRoot } from 'react-dom/client';

import App from './MyApp';

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
	storage: window.localStorage,
	key: 'vaer-REACT_QUERY_OFFLINE_CACHE',
});

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
	<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
		<App />
	</PersistQueryClientProvider>,
);
