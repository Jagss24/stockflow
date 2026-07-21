import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ROUTE_PAGES } from "./constants/pages";
import PublicRoute from "./routes/PublicRoute/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import RootRedirect from "./routes/RootRedirect/RootRedirect";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: RootRedirect },
      {
        Component: PublicRoute,
        children: [
          {
            path: ROUTE_PAGES.login,
            lazy: async () => {
              const module = await import("@/pages/Login/LoginPage");
              return { Component: module.default };
            },
          },
        ],
      },
      {
        Component: PrivateRoute,
        children: [
          {
            path: ROUTE_PAGES.dashboard,
            lazy: async () => {
              const module = await import("@/pages/Dashboard/DashboardPage");
              return { Component: module.default };
            },
          },
          {},
        ],
      },
    ],
  },
]);

export default routes;
