import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";

import ReportForm from "../Report/ReportForm";

export default function ReportModal({ open, handleClose }) {
  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="sm" open={open} handler={handleClose}>
        <DialogHeader className="justify-between">
          <Typography className="pl-2" variant="h5" color="black">
            Report
          </Typography>
          <div>
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
          </div>
        </DialogHeader>
        <DialogBody>
          <ReportForm />
        </DialogBody>
      </Dialog>
    </section>
  );
}
