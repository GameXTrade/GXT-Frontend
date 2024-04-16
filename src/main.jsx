import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, createRoutesFromElements ,RouterProvider, Route } from "react-router-dom";

//pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import VerifyToken from './pages/VerifyToken';
import RootLayout from './components/RootLayout';


// Contextprovider
import UserContextProvider from './context/UserContextProvider';
import Status from './pages/Status';

const router = createBrowserRouter(
  createRoutesFromElements(
    // Route/RootLayout work like a wrapper
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/> 
      <Route path='sign-in'element={<SignIn/>}/> 
      <Route path='verify'element={<VerifyToken />}/> 
      <Route path='status'element={<Status />}/> 
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>

      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)
