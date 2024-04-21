import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';

export default function Status() {
    const location = useLocation();
    const message = location.state ? location.state.message : "Keine Nachricht vorhanden";
    let content;
    if (message==="NOT OK"){
        content = <h1 className='flex flex-col items-center'>
                    <div>Verifizierungslink ungültig.</div>
                    <div>User ist schon verifiziert</div>
                </h1>
    }else if (message==="OK"){
        content = <h1 className='flex flex-col items-center'>
                    <div>Erfolgreich verifiziert.</div>
                </h1>
    }else{
        content = <h1 className='flex flex-col items-center'>
                    {message}
                </h1>
    }
    return (
        <div className='flex justify-center items-center text-xl' style={{ height: "calc(100dvh - 64px)" }}>
            
            {content}
        </div>

    )
}
