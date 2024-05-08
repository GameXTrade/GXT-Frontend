import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { NavLink, Outlet } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
// import defaultImage from '../assets/default.png';
import { ComplexNavbar } from './ComplexNavbar';


function RootLayout() {
  const { user } = useContext(UserContext);
  return (
    <div className="root-layout">
      <ComplexNavbar/>
  
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
