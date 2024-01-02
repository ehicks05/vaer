import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from 'react-modal-hook';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import App from './MyApp';

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
	storage: window.localStorage,
	key: 'vaer-REACT_QUERY_OFFLINE_CACHE',
});

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
	<ModalProvider>
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
			<App />
		</PersistQueryClientProvider>
	</ModalProvider>,
);
