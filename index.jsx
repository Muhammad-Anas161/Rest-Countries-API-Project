import {createRoot} from "react-dom/client";
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CountryDetail from "./components/CountryDetail";
import Home from "./components/Home";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
        path: "/",
        element: <Home />,
        },
        {
        path: "/:country",
        element: <CountryDetail />,
        }
      ],
    },
  ]);
const root = createRoot(document.querySelector('#root'))
root.render(<RouterProvider router={router} />)