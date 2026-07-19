import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/login",
        lazy: async () => {
          const module = await import("@/pages/Login/LoginPage");
          return { Component: module.default };
        },
      },
    ],
  },
]);

export default routes;
