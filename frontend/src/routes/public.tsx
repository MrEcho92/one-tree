import { RouteObject } from 'react-router-dom';
import { PublicBase } from '../components/sections';
import { LandingRoutes } from '../features/landing/routes';
import { AuthRoutes } from '../features/auth';
import { CulturalRoutes } from '../features/cultural-context/routes';
import { NotFoundPage } from '../components/common/NotFoundPage';
import About from '../features/landing/page/About';

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
