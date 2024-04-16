import React, { useContext, useEffect } from 'react';
import axios from '../api/axios';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function VerifyUser() {

    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Senden Sie eine Anfrage an den Server, ohne das JWT explizit anzufügen
                const response = await axios.get('/user/verify-user');
                console.log('Verification response:', response.data);
                if (response.data.code === "OK"){
                    localStorage.setItem('user', JSON.stringify(response.data.token))
                    setUser(response.data.token)
                    navigate("/status", {state: {message: response.data.code}})
                }else if(response.data.code === "NOT OK"){
                    navigate("/status", {state: {message: response.data.code}})
                }else {
                    navigate("/status", {state: {message: response.data.code}})
                }
            } catch (error) {
                console.error('Error verifying user:', error);
            }
        };

        verifyUser();
    }, []);

    return (
        <div>
            Verifying user...
        </div>
    );
}

export default VerifyUser;
