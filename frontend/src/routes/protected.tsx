import { Navigate, RouteObject } from 'react-router-dom';
import { ProtectedBase } from '../components/sections';
import { DashboardPage } from '../features/dashbord/page';

export const protectedRoutes: RouteObject[] = [
  {
    path: '/app',
    element: <ProtectedBase />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
