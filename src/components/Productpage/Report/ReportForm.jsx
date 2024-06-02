import React, { useState } from "react";

import {
  Select,
  Option,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    reason: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };
  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      reason: value,
    }));
  };

  const handleTextareaChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      message: e.target.value,
    }));
  };

  return (
    <div className="p-2 select-none">
      <Select
        className="select-none"
        label="Choose a Reason"
        name="type"
        value={formData.reason}
        onChange={handleSelectChange}
      >
        <Option value="1">Inappropriate Content</Option>
        <Option value="2">Copyright Violation</Option>
        <Option value="3">Misleading Information</Option>
        <Option value="4">Spam or Irrelevant Content</Option>
        <Option value="5">Other</Option>
      </Select>
      <div className="mt-5">
        <Textarea
          color="gray"
          label="Message"
          value={formData.message}
          onChange={handleTextareaChange}
          disabled={!formData.reason}
        />
        <div className="flex w-full justify-end py-1.5">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="rounded-md"
              onClick={handleSubmit}
              disabled={!formData.reason}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
