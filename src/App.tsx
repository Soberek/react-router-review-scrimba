import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Currencies from "./features/crypto_currencies/Currencies";
import CurrencyDetails from "./features/crypto_currencies/CurrencyDetails";
import PageNotFound from "./components/PageNotFound";

// apis
import { loader as CurrenciesLoader } from "./features/crypto_currencies/Currencies";
import { loader as CurrencyDetailsLoader } from "./features/crypto_currencies/CurrencyDetails";
import ErrorElements from "./components/ErrorElements";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "currencies",
        element: <Currencies />,
        loader: CurrenciesLoader,
      },
      {
        path: "currencies/:id",
        element: <CurrencyDetails />,
        loader: CurrencyDetailsLoader,
        errorElement: <ErrorElements />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
