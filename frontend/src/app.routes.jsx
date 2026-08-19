import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Report from "./features/interview/pages/Report.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";
import History from "./features/interview/pages/History.jsx";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
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
