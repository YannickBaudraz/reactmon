import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './index.scss';
import './extensions';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App/>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </React.StrictMode>
);
