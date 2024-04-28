import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, createRoutesFromElements ,RouterProvider, Route } from "react-router-dom";

//pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyToken from './pages/VerifyToken';
import RootLayout from './components/RootLayout';

import ProtectedRoutes from './utils/ProtectedRoutes';

// Contextprovider
import UserContextProvider from './context/UserContextProvider';
import Status from './pages/Status';

import ChatBubbleWindow from './components/ChatBubbleWindow';
import Me from './pages/Me';

const router = createBrowserRouter(
  createRoutesFromElements(
    // Route/RootLayout work like a wrapper
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/> 
      <Route path='verify'element={<VerifyToken />}/> 
      <Route path='sign-up'element={<SignUp/>}/> 
      <Route path='sign-in'element={<SignIn/>}/> 

      {/* <Route element={<ProtectedRoutes/>}> */}
        <Route path='chat'element={<ChatBubbleWindow/>}/> 
        <Route path='status'element={<Status />}/> 
        <Route path='me' element={<Me />}/>
      {/* </Route> */}
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>

      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
