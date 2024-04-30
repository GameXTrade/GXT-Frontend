import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import UserContext from '../context/UserContext';
import defaultImage from '../assets/default.png';

function RootLayout() {
  const { user } = useContext(UserContext);
  // console.log(user.image)
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
                <div className="relative">
                  <NavLink to={`/me`}>

                    <img
                      className="w-9 h-9 rounded-full"
                      src={user?.image || defaultImage}

                      alt=""
                    />
                    <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </NavLink>
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
