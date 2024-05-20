import React, { useEffect, useState } from 'react';
import SidebarWithLogo from '../components/SidebarWithLogo';
import ChatBubbleWindow from '../components/SideBar/ChatBubbleWindow';
import { useLocation } from 'react-router-dom';

import { ActiveTableWithStripedRows } from '../components/SideBar/AssetManagement/ActiveTableWithStripedRows';

import {MaintenanceComponent} from "../components/MaintenanceSection/MaintenanceComponent"

function Me() {
    const [openComponent, setOpenComponent] = useState(null);

    const location = useLocation();

    const component = location.state?.openComponent;
    

    const handleOpenComponent = (component) => {
        setOpenComponent(component);
    };

    useEffect(()=>{
        if (component){
            handleOpenComponent(component);
            // setOpenComponent(null);
        }
    },[])
    // Funktion zum Übersetzen des geöffneten Strings in die entsprechende Komponente
    const getComponent = (component) => {
        switch (component) {
            case 'Analytics':
                return <MaintenanceComponent />;
            case 'Reporting':
                return <MaintenanceComponent />;
            // case 'UploadAsset':
            //     return <ItemForm updateUploadStatus={handleUploadStatus} />;
            case 'EditAssets':
                return <ActiveTableWithStripedRows/>;
            case 'Inbox':
                return <ChatBubbleWindow />;
            case 'Settings':
                return <MaintenanceComponent />;
            default:
                return null;
        }
    };
    return (
        <div className="flex">
            <title>GameXTrade | Me</title>
            <SidebarWithLogo openComponent={handleOpenComponent} />
            <div className='w-full p-3 '>
                {/* Hier wird die aktuell geöffnete Komponente gerendert */}
                {getComponent(openComponent)}
                {/* {!openComponent && <div>Keine Komponente ausgewählt: Hier könnte was hinkommen.</div>} */}
            </div>
        </div>
    );
}

export default Me;
