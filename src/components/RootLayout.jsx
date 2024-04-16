import React, { useContext } from 'react'
import { NavLink,Outlet } from "react-router-dom";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import UserContext from '../context/UserContext';

function RootLayout() {
  const {user} = useContext(UserContext)
  return (
    <div className="root-layout">
      
      <header>
        <nav>
          <div className="flex  w-full h-full justify-between items-center p-3 bg-slate-50 drop-shadow-sm">
            <div className="text-4xl text-indigo-900 font-bold">
              <NavLink to={`/`}>GXTrade</NavLink>
            </div>
            {user?.name}
            <div className='flex items-center'>
              <div className='mx-2 p-1 bg-slate-50 hover:drop-shadow-md rounded-full drop-shadow-none'>
                <NavLink to={`/chat`}>
                  <ChatBubbleIcon sx={{color:"#DFDFDF","&:hover":{color: "#EDEDED"}}}/>
                </NavLink>
              </div>
              <NavLink to={`/sign-in`} className='font-medium text-gray-800 hover:text-gray-300'>
                  Sign In&nbsp;<span aria-hidden="true">&rarr;</span>
              </NavLink>  
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout