import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from '../api/axios';


function VerifyToken() {
    const location = useLocation();
    const [cookies, setCookie] = useCookies(["jwt"])
    
    const isTokenExpired = (token) => {
        try {
            // Decodieren Sie den JWT-Token, um das Ablaufdatum zu erhalten
            const decodedToken = jwtDecode(token);
            // Überprüfen Sie das Ablaufdatum
            const expirationTime = decodedToken.exp * 1000; // Umrechnung von Sekunden in Millisekunden
            const currentTime = Date.now();
            return expirationTime > currentTime; // true, wenn der Token gültig ist, andernfalls false
        } catch (error) {
            // Bei einem Fehler (z.B. ungültiger Token) wird false zurückgegeben
            return false;
        }
    };
    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        // console.log(isTokenExpired(token))
        if (token) {
            const decodedToken = jwtDecode(token);

            const expirationTime = decodedToken.exp * 1000; // Umrechnung von Sekunden in Millisekunden

            if (!isTokenExpired(token)) {
                setCookie("jwt", "", { expires: new Date(0), path: "/" }); // Löscht das Cookie
                console.log("jwt expired")
            }else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // Setzen des Tokens im Cookie mit dem Ablaufdatum des Tokens
                const expirationDate = new Date(expirationTime);
                setCookie("jwt", token, { expires: expirationDate, path: "/" });
            }
        }else{
            console.log("Kein Token gefunden")
        }
    }, [location, setCookie]);
    
    return (
        <div>
            Test
        </div>
    )
}

export default VerifyToken