import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import TokenProvider from "./contexts/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import Welcome from "./pages/Welcome";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import Search from "./pages/Search";
import Calendar from "./pages/Calendar";
import ActivityOverview from "./pages/ActivityOverview";
import Register from "./pages/Register";
import LogIn from "./pages/Login";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: "/activities",
        element: <Activities />
      },
      {
        path: "/activity-details/:activityId?",
        element: <ActivityDetails />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/calendar",
        element: <Calendar />
      },
      {
        path: "/activity-overview/:activityId?",
        element: <ActivityOverview />
      },
      {
        path: "/login",
        element:
          <ProtectedRoute>
            <LogIn />
          </ProtectedRoute>
      },
      {
        path: "/register",
        element:
          <ProtectedRoute >
            <Register />
          </ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);
