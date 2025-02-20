import { RouteObject } from 'react-router-dom';
import { PublicBase } from '../components/sections';
import { LandingRoutes } from '../features/landing/routes';
import { AuthRoutes } from '../features/auth';
import { CulturalRoutes } from '../features/cultural-context/routes';
import { NotFoundPage } from '../components/common/NotFoundPage';

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
        element: <div>About us</div>,
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
