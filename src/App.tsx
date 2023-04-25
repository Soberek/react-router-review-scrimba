import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Currencies from "./pages/Currencies/Currencies";
import CurrencyDetails from "./pages/Currencies/CurrencyDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ErrorElements from "./components/ErrorElements";
import LoginPage from "./pages/Login/LoginPage";

// *loaders
import { currenciesLoader } from "./pages/Currencies/loaders";
import { currencyDetailsLoader } from "./pages/Currencies/loaders";

// *action
import { action as LoginPageAction } from "./pages/Login/action";

// *mock
import { requireAuth } from "./utils/auth";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        loader: ({ request }): string | null => {
          return new URL(request.url).searchParams.get("message");
        },
        action: LoginPageAction,
      },
      {
        path: "/",
        element: <Home />,
        loader: ({ request }) => {
          return requireAuth(request.url);
        },
      },
      {
        path: "currencies",
        element: <Currencies />,
        loader: currenciesLoader,
      },
      {
        path: "currencies/:id",
        element: <CurrencyDetails />,
        loader: currencyDetailsLoader,
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
