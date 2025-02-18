import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SideMenu } from './SideBar';
import { AppNavBar } from './AppMenu';

type BaseProps = {
  children: React.ReactNode;
};

export function Base({ children }: BaseProps) {
  return (
    <Box>
      <CssBaseline />
      {children}
    </Box>
  );
}

export function PublicBase() {
  return (
    <Base>
      <Suspense fallback={<CircularProgress />}>
        <Header />
        <Box>
          <Outlet />
        </Box>
        <Footer />
      </Suspense>
    </Base>
  );
}

export function ProtectedBase() {
  return (
    <Base>
      <Suspense fallback={<CircularProgress />}>
        <Box display="flex">
          <SideMenu />
          <AppNavBar />
          <Box flexGrow={1}>
            <Outlet />
          </Box>
        </Box>
      </Suspense>
    </Base>
  );
}
