import { RouteObject } from 'react-router-dom';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>Base layout</div>,
    children: [
      {
        index: true,
        element: <div>Landing page</div>,
      },
    ],
  },
  {
    path: '/auth/*',
    element: <div>Auth</div>,
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
];
