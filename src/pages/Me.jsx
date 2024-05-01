import React,{ useContext, useState } from 'react'
import UserContext from '../context/UserContext';
import ItemForm from '../components/ItemForm';

import SidebarWithLogo from '../components/SidebarWithLogo';

function Me() {
    const { user } = useContext(UserContext);
    console.log(user)
    return (
        <div className='flex'>
            <title>GameXTrade | Me</title>
            <SidebarWithLogo />
        </div>
    )
}

export default Me