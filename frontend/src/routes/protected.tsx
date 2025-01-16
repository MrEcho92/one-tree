import { Navigate, RouteObject } from 'react-router-dom';
import { ProtectedBase } from '../components/sections';

export function App() {
  return <div>App level</div>;
}

export const protectedRoutes: RouteObject[] = [
  {
    path: '/app',
    element: <ProtectedBase />,
    children: [
      {
        index: true,
        element: <div>Home page</div>,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
