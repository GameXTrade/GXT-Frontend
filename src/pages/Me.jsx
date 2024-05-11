import React, { useState } from 'react';
import SidebarWithLogo from '../components/SidebarWithLogo';
import NoContent from '../components/NoContent';
import ChatBubbleWindow from '../components/SideBar/ChatBubbleWindow';

import ItemForm from '../components/SideBar/AssetManagement/ItemForm';
import { ActiveTableWithStripedRows } from '../components/SideBar/AssetManagement/ActiveTableWithStripedRows';


function Me() {
    const [openComponent, setOpenComponent] = useState(null);

    const handleOpenComponent = (component) => {
        setOpenComponent(component);
    };
    // Funktion zum Übersetzen des geöffneten Strings in die entsprechende Komponente
    const getComponent = (component) => {
        switch (component) {
            case 'Analytics':
                return <NoContent />;
            case 'Reporting':
                return <NoContent />;
            case 'UploadAsset':
                return <ItemForm />;
            case 'EditAssets':
                return <ActiveTableWithStripedRows/>;
            case 'Inbox':
                return <ChatBubbleWindow />;
            case 'Settings':
                return <NoContent />;
            default:
                return null;
        }
    };
    return (
        <div className="flex">
            <title>GameXTrade | Me</title>
            <SidebarWithLogo openComponent={handleOpenComponent} />
            <div className='w-full p-3'>
                {/* Hier wird die aktuell geöffnete Komponente gerendert */}
                {getComponent(openComponent)}
            </div>
        </div>
    );
}

export default Me;
