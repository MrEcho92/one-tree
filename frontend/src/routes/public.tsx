import { RouteObject } from 'react-router-dom';
import { PublicBase } from '../components/sections';
import { LandingRoutes } from '../features/landing/routes';
import { AuthRoutes } from '../features/auth';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicBase />,
    children: [
      {
        index: true,
        element: <LandingRoutes />,
      },
    ],
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
];
