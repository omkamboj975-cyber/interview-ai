import { createBrowserRouter } from "react-router";
import Landing from "./features/landing/pages/Landing.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Report from "./features/interview/pages/Report.jsx";
import History from "./features/interview/pages/History.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/report/:id",
    element: (
      <ProtectedRoute>
        <Report />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    ),
  },
]);
