import React, { useContext, useEffect } from 'react';
import axios from '../api/axios';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function VerifyUser() {

    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        const loginOrVerifyUser = async () => {
            try {
                const token = new URLSearchParams(location.search).get('token');
                if (token) {
                    // JWT-Token in der URL-Query vorhanden, führe loginWithToken aus
                    await loginWithToken(token);
                } else {
                    // Kein JWT-Token in der URL-Query vorhanden, führe verifyUser aus
                    await verifyUser();
                }
            } catch (error) {
                console.error('Error logging in or verifying user:', error);
            }
        };
    
        loginOrVerifyUser();
    }, [location.search, navigate, setUser]);

    async function loginWithToken(token) {
        try{
            const response = await axios.post('/user/login-user', { token });
            localStorage.setItem('user', JSON.stringify(response.data.token))
            setUser(response.data.token)
            navigate("/status", {state: {message: response.data.code}})
            console.log(response.data)
        }catch(error){
            console.error('Error logging in with token:', error);
        }
    }
    
    async function verifyUser() {
        const response = await axios.get('/user/verify-user');
        console.log('Verification response:', response.data);
        if (response.data.code === "OK"){
            localStorage.setItem('user', JSON.stringify(response.data.token))
            setUser(response.data.token)
            navigate("/status", {state: {message: response.data.code}})
        } else if(response.data.code === "NOT OK"){
            navigate("/status", {state: {message: response.data.code}})
        } else {
            navigate("/status", {state: {message: response.data.code}})
        }
    }

    return (
        <div>
            Verifying user...
        </div>
    );
}

export default VerifyUser;
