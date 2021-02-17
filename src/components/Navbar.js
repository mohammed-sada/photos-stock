import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <ul className="links">
        <Link className={`${pathname === "/" && "active"}`} to="/">
          <li>Home</li>
        </Link>

        <Link
          className={`${pathname === "/Liked-photos" && "active"}`}
          to="/Liked-photos"
        >
          <li>Liked photos</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
