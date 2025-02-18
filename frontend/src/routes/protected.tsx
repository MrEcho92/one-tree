import { Navigate, RouteObject } from 'react-router-dom';
import { ProtectedBase } from '../components/sections';
import { DashboardPage } from '../features/dashbord/page';
import { TreeRoutes } from '../features/family-tree/routes/treeRoutes';

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
        path: 'tree/*',
        element: <TreeRoutes />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
