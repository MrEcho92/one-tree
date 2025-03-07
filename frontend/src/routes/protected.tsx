import { Navigate, RouteObject } from 'react-router-dom';
import { ProtectedBase } from '../components/sections';
import { DashboardPage } from '../features/dashbord/page';
import AdminPage from '../features/auth/page/AdminPage';
import { TreeRoutes } from '../features/family-tree/routes/treeRoutes';
import { RecordRoutes } from '../features/tracking/routes';
import ProfileSettings from '../features/auth/page/Settings';

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
        path: 'record/*',
        element: <RecordRoutes />,
      },
      {
        path: 'settings',
        element: <ProfileSettings />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
