import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Currencies from "./features/crypto_currencies/Currencies";
import CurrencyDetails from "./features/crypto_currencies/CurrencyDetails";
import PageNotFound from "./components/PageNotFound";
import ErrorElements from "./components/ErrorElements";
import LoginPage from "./components/LoginPage";

// *loaders
import { loader as CurrenciesLoader } from "./features/crypto_currencies/Currencies";
import { loader as CurrencyDetailsLoader } from "./features/crypto_currencies/CurrencyDetails";

// *action
import { action as LoginPageAction } from "./components/LoginPage";

// *Protect route, przekieruj na /login i na tym login wyświetl wiadomość
// *Wymagania:
// - użyj do tego loadera
// - oraz outletu

// każdy route

function requireAuth() {
  const is_logged = localStorage.getItem("login");
  if (!is_logged) {
    return redirect("/login?message=You must be logged in!");
  }

  return null;
}

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
        loader: () => {
          return requireAuth();
        },
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
