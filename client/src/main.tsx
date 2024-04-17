import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Battle from "./components/Battle.tsx.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "/",
              element: <Battle />,
            },
            {
              path: "/ranks",
              element: <div>Ranks</div>,
            },
            {
              path: "/about",
              element: <div>About</div>,
            },
          ],
        },
      ])}
    />
  </React.StrictMode>,
);
