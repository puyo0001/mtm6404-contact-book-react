import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Details } from "./pages/Details";
import { Add } from "./pages/Add";
import { UpdateContact } from "./pages/Update";

console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Add",
    element: <Add />,
  },
  {
    path: "/Details/:id",
    element: <Details />,
  },
  {
    path: "/Update/:id",
    element: <UpdateContact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
