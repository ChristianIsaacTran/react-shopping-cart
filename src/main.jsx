import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routeConfig from "./route/routeConfig.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter(routeConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
