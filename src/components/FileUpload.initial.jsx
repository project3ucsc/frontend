import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import Path from "path";
import uploadFileToBlob, {
  isStorageConfigured,
} from "services/azureblob.service";

const storageConfigured = isStorageConfigured();

const FileUpload = () => {
  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // UI/form management
  const [uploading, setUploading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    setUploading(true);
    console.log(fileList);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(fileList[0]);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setUploading(false);
    // console.log(blobsInContainer);

    setFileList([]);
    setUploading(false);
    message.success("File uploaded successfully");
  };

  const uploadprops = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },

    fileList,
  };

  // display form
  const DisplayForm = () => (
    <div>
      <Upload {...uploadprops} multiple={false} maxCount={1}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );

  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h2>Container items</h2>
      <ul>
        {blobList.map((item) => {
          return (
            <li key={item}>
              <div>
                {Path.basename(item)}
                <br />
                <img src={item} alt={item} height="200" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div>
      <h1>Upload file to Azure Blob Storage</h1>
      {storageConfigured && DisplayForm()}

      <hr />
      {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default FileUpload;
