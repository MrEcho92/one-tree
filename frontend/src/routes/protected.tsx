
import { Navigate, RouteObject } from "react-router-dom";

export function App() {
  return (
    <div>
        App level
    </div>
  );
}

export const protectRoutes: RouteObject[] = [
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>Home page</div>,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
