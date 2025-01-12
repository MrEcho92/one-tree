import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

type BaseProps = {
  children: React.ReactNode;
};

export function Base({ children }: BaseProps) {
  return (
    <Box>
      <CssBaseline />
      <Header />
      {children}
    </Box>
  );
}

export function PublicBase() {
  return (
    <Base>
      <Suspense fallback={<CircularProgress />}>
        <Box sx={{ pt: 10 }}>
          <Outlet />
        </Box>
      </Suspense>
    </Base>
  );
}

export function ProtectedBase() {
  return (
    <Base>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </Base>
  );
}
