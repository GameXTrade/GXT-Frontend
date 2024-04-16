import React, { useEffect } from 'react';
import axios from '../api/axios';

function VerifyUser() {
    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Senden Sie eine Anfrage an den Server, ohne das JWT explizit anzufügen
                const response = await axios.get('/user/verify-user');
                console.log('Verification response:', response.data);
                if (response.data.code === "OK"){
                    console.log("Alles okay")
                }else if(response.data.code === "NOT OK"){
                    console.log("already verified > redirect to home")
                }else {
                    console.log(response.data.code)
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
