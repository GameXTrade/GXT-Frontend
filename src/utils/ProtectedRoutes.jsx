import {Outlet, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext';

function ProtectedRoutes() {
    const { user, isLoading  } = useContext(UserContext);
    if (isLoading){
        return <div>Lädt...</div>
    }
    return user ? <Outlet/>:<Navigate to="sign-in"/>
}

export default ProtectedRoutes