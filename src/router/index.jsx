import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export function AppRoute() {
  return <RouterProvider router={router} />;
}
