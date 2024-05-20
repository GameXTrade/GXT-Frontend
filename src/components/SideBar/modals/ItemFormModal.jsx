// ItemFormModal.js

import {React, useState} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";

import ItemForm from '../../SideBar/AssetManagement/ItemForm';
import { Alert } from "@material-tailwind/react";



export default function ItemFormModal({ open, handleClose }) {

  const [openAlert, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

  const handleUploadStatus = (status) => {
    if (status === "OK"){
      setAlertText("Successfully UploadAsset.");
    }else{
      setAlertText("Something went wrong.");
    }
      setOpen(true); // Funktion zum Anzeigen des Alerts
  };

  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="sm" open={open} handler={handleClose}>
        <DialogHeader className="justify-end">
          <IconButton
            color="gray"
            size="sm"
            variant="text"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="">
          <Alert
              open={openAlert}
              onClose={() => setOpen(false)}
              animate={{  mount: { y: 0 },
                          unmount: { y: 100 },
                      }}
          >
              {alertText}
          </Alert>
          <ItemForm updateUploadStatus={handleUploadStatus} />
        </DialogBody>
      </Dialog>
    </section>
  );
}
