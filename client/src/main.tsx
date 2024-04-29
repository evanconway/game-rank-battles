import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Battle, { loaderBattlePage } from "./components/Battle.tsx.tsx";
import Ranks, { loaderRankPage } from "./components/Ranks.tsx";
import About from "./components/About.tsx";
import Share, { loaderSharePage } from "./components/Share.tsx";

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
              loader: loaderBattlePage,
            },
            {
              path: "/ranks",
              element: <Ranks />,
              loader: loaderRankPage,
            },
            {
              path: "/about",
              element: <About />,
            },
            {
              path: "/share",
              element: <Share />,
              loader: loaderSharePage,
            },
          ],
        },
      ])}
    />
  </React.StrictMode>,
);
