import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet context={{ some_data: { name: "Joe" } }} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
