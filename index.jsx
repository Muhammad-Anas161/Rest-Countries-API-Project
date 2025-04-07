import { createRoot } from "react-dom/client";
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CountryDetail from "./components/CountryDetail";
import Home from "./components/Home";

// Create the router with paths and components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // This will be shown at the root of App
      },
      {
        path: "/:country", // This will match any country name dynamically
        element: <CountryDetail />,
      },
    ],
  },
]);

// Initialize ReactDOM with the router provider
const root = createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={router} />);
