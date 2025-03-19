import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SideMenu } from './SideBar';
import { AppNavBar } from './AppMenu';
import { useAuth } from '../auth/AuthProvider';
import CookieConsent from '../../features/auth/components/CookieContent';

type BaseProps = {
  children: React.ReactNode;
};

export function Base({ children }: BaseProps) {
  const handleCookieConsent = (preferences: { [key: string]: boolean }) => {
    // Set up analytics based on preferences
    if (preferences.analytics) {
      // Initialize analytics
    }
    
    // Set up marketing cookies
    if (preferences.marketing) {
      // Initialize marketing tools
    }
  };
  return (
    <Box>
      <CssBaseline />
      {children}
      <CookieConsent
        cookiePolicyUrl="/cookie-policy"
        onAccept={handleCookieConsent}
      />
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
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Base>
      <Suspense fallback={<CircularProgress />}>
        <Box display="flex">
          <SideMenu />
          <AppNavBar />
          <Box flexGrow={1}>
            <Outlet />
            <Footer />
          </Box>
        </Box>
      </Suspense>
    </Base>
  );
}
