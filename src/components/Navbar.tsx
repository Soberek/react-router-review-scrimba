import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleActiveLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active_link" : "";

  return (
    <nav>
      <NavLink to="/" className={handleActiveLink}>
        Home
      </NavLink>
      <NavLink to="currencies" className={handleActiveLink}>
        Currencies
      </NavLink>
      <NavLink to="login" className={handleActiveLink}>
        Login Page
      </NavLink>
    </nav>
  );
};

export default Navbar;
