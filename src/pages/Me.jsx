import React, { useState } from 'react';
import SidebarWithLogo from '../components/SidebarWithLogo';
import NoContent from '../components/NoContent';
import ChatBubbleWindow from '../components/SideBar/ChatBubbleWindow';

import ItemForm from '../components/SideBar/AssetManagement/ItemForm';
import { ActiveTableWithStripedRows } from '../components/SideBar/AssetManagement/ActiveTableWithStripedRows';


import { Alert } from "@material-tailwind/react";

import {MaintenanceComponent} from "../components/MaintenanceSection/MaintenanceComponent"

function Me() {
    const [openComponent, setOpenComponent] = useState(null);

    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState("");

    const handleUploadStatus = (status) => {
        if (status === "OK"){
            setAlertText("Successfully UploadAsset.");
        }else{
            setAlertText("Something went wrong.");
        }
        setOpen(true); // Funktion zum Anzeigen des Alerts
    };
    const handleOpenComponent = (component) => {
        setOpenComponent(component);
    };
    // Funktion zum Übersetzen des geöffneten Strings in die entsprechende Komponente
    const getComponent = (component) => {
        switch (component) {
            case 'Analytics':
                return <MaintenanceComponent />;
            case 'Reporting':
                return <MaintenanceComponent />;
            case 'UploadAsset':
                return <ItemForm updateUploadStatus={handleUploadStatus} />;
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
                {openComponent ==='UploadAsset' &&
                
                    <Alert
                        open={open}
                        onClose={() => setOpen(false)}
                        animate={{  mount: { y: 0 },
                                    unmount: { y: 100 },
                                }}
                    >
                    {alertText}
                    </Alert>
                }
                {getComponent(openComponent)}
            </div>
        </div>
    );
}

export default Me;
