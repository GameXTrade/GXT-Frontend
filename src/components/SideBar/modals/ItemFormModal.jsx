// ItemFormModal.js

import {React,useEffect} from "react";
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

export default function ItemFormModal({ open, handleClose }) {

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
  // useEffect(()=>{
  //     if (component){
  //         handleOpenComponent(component);
  //         // setOpenComponent(null);
  //     }
  // },[])
  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="sm" open={open} handler={handleClose}>
        <DialogHeader className="justify-end">
          {/* <img
            src="https://www.material-tailwind.com/image/exclamation.svg"
            alt="exclamation"
            className="w-10 h-10"
          /> */}
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
          <ItemForm updateUploadStatus={handleUploadStatus} />
        </DialogBody>
      </Dialog>
    </section>
  );
}
