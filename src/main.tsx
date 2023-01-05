import React from 'react';
import ReactDOM from 'react-dom/client';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './index.scss';
import './extensions';
import Router from './routing/Router';
import chartJsRegister from './chart-js.register';

chartJsRegister();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router/>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </React.StrictMode>
);
