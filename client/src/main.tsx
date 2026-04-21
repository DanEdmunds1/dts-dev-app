import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import App from "./App";
import './index.css';

// Components
import Home from "./components/Home";
import CreateTask from "./components/CreateTask";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "create-task",
        element: <CreateTask />
      }
    ]
  }
]

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);