import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Currencies from "./features/crypto_currencies/Currencies";
import CurrencyDetails from "./features/crypto_currencies/CurrencyDetails";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="currencies" element={<Currencies />} />
          <Route path="currencies/:id" element={<CurrencyDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
