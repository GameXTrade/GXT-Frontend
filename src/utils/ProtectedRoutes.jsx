import {Outlet, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext';

function ProtectedRoutes() {
    const { user } = useContext(UserContext);
    console.log(user)
    // const user = null
    return user ? <Outlet/>:<Navigate to="sign-in"/>
}

export default ProtectedRoutes