import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import UserContext from '../context/UserContext';

function RootLayout() {
  const { user } = useContext(UserContext);

  return (
    <div className="root-layout">
      <header>
        <nav>
          <div className="flex w-full h-full justify-between items-center p-3 bg-slate-50 drop-shadow-sm">
            <div className="text-4xl text-indigo-900 font-bold">
              <NavLink to={`/`}>GXTrade</NavLink>
            </div>
            {user ? (
              <div className="flex items-center">
                <div className="mx-2 p-1 bg-slate-50 hover:drop-shadow-md rounded-full drop-shadow-none">
                  <NavLink to={`/chat`}>
                    <ChatBubbleIcon sx={{ color: '#DFDFDF', '&:hover': { color: '#EDEDED' } }} />
                  </NavLink>
                </div>
                <div className="relative cursor-pointer">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt=""
                  />
                  <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </div>
            ) : (
              <NavLink to={`/sign-up`} className="font-medium text-gray-800 hover:text-gray-300">
                Sign Up&nbsp;<span aria-hidden="true">&rarr;</span>
              </NavLink>
            )}
            
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
