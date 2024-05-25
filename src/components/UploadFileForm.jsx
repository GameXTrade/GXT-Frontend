import { useState } from "react";

import { uploadFile } from "../services/api";

export default function UploadFileForm() {
  const [file, setFile] = useState(null);
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file_upload", file);

    try {
      const response = uploadFile(formData);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">Upload</button>
      </form>
      {file && <p>{file.name}</p>}
    </div>
  );
}
