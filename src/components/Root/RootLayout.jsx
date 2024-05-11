import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { NavLink, Outlet } from 'react-router-dom';
// import defaultImage from '../assets/default.png';
import { ComplexNavbar } from './ComplexNavbar';
import { FooterWithLogo } from './FooterWithLogo';


function RootLayout() {
  const { user } = useContext(UserContext);
  return (
    <div className="root-layout">
      <header>
        <ComplexNavbar/>
      </header>
  
      <main>
        <Outlet />
      </main>

      <footer>
        <FooterWithLogo />
      </footer>
    </div>
  );
}

export default RootLayout;
