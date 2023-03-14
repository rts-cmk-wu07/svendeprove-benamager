import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import TokenProvider from "./contexts/TokenContext";

// pages
import Welcome from "./pages/Welcome";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import Search from "./pages/Search";
import Calender from "./pages/Calender";
import TeamOverview from "./pages/TeamOverview";
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
        path: "/activity-details",
        element: <ActivityDetails />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/calender",
        element: <Calender />
      },
      {
        path: "/team-overview",
        element: <TeamOverview />
      },
      {
        path: "/log-in",
        element: <LogIn />
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
