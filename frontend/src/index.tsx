import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { HelmetProvider } from 'react-helmet-async';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import queryClient from './core/http/react-query';
import './index.scss';
import App from './App';
import { theme } from './core/theme/theme';
import { ModalProvider } from './components/common/modal/ModalContext';
import { AuthProvider } from './components/auth/AuthProvider';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <AuthProvider>
                  <ModalProvider>
                    <App />
                  </ModalProvider>
                </AuthProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
