import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import App from "./App";
import './index.css';

// Cmponents
import Home from "./components/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);