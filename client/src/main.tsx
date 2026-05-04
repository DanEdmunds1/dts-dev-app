import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import App from "./App";
import './index.css';

// Components
import Home from "./components/Home";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Login from "./components/Login";

// Actions
import { loginAction } from "./utils/helpers/actions";
import { singleTaskLoader } from "./utils/loaders";

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
      },
      {
        path: "edit-task/:id",
        element: <EditTask />,
        loader: async ({ params }) => singleTaskLoader(params.id || '')
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction
      }
    ]
  }
]

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);