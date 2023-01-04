import React from 'react';
import ReactDOM from 'react-dom/client';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './index.scss';
import './extensions';
import Router from './routing/Router';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js';

const queryClient = new QueryClient();

ChartJs.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router/>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </React.StrictMode>
);
