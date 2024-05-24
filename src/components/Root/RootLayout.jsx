import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { NavLink, Outlet } from "react-router-dom";
// import defaultImage from '../assets/default.png';
import { ComplexNavbar } from "./ComplexNavbar";
import { FooterWithLogo } from "./FooterWithLogo";

import CookieConsent from "../../CookieConsent";

function RootLayout() {
  const { user } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 2) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="root-layout">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-gray-300 shadow-md bg-white/[.1]" : ""
        }`}
      >
        <ComplexNavbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <FooterWithLogo />
      </footer>
      <CookieConsent />
    </div>
  );
}

export default RootLayout;
