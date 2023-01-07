import React from 'react';
import ReactDOM from 'react-dom/client';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient} from '@tanstack/react-query';
import './index.scss';
import './extensions';
import Router from './routing/Router';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

import('./chart-js.register').then(value => value.default());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 1 day
      staleTime: 1000 * 60 * 60 * 24 // 1 day
    }
  }
});

const persister = createSyncStoragePersister({
  storage: window.localStorage
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
        <Router/>
        <ReactQueryDevtools/>
      </PersistQueryClientProvider>
    </React.StrictMode>
);
