import { RouteObject } from 'react-router-dom';
import { PublicBase } from '../components/sections';
import { LandingRoutes } from '../features/landing/routes';
import { AuthRoutes } from '../features/auth';
import { CulturalRoutes } from '../features/cultural-context/routes';
import { NotFoundPage } from '../components/common/NotFoundPage';
import About from '../features/landing/page/About';
import Privacy from '../features/landing/page/Privacy';
import TermsAndConditions from '../features/landing/page/Terms';
import CookiesPolicy from '../features/landing/page/Cookies';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicBase />,
    children: [
      {
        index: true,
        element: <LandingRoutes />,
      },
      {
        path: 'hub/*',
        element: <CulturalRoutes />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/terms',
        element: <TermsAndConditions />,
      },
      {
        path: '/cookie-policy',
        element: <CookiesPolicy />,
      },
    ],
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
