import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'


const UserContextProvider= ({children}) =>{
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider