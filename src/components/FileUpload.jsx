import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import uploadFileToBlob, {
  isStorageConfigured,
} from "services/azureblob.service";

const storageConfigured = isStorageConfigured();

const FileUpload = ({ setFilename }) => {
  // all blobs in container
  // const [blobList, setBlobList] = useState([]);

  // UI/form management
  const [uploading, setUploading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    setUploading(true);
    console.log(fileList);

    // *** UPLOAD TO AZURE STORAGE ***
    const filename = await uploadFileToBlob(fileList[0]);
    setFilename(filename);
    // prepare UI for results
    // setBlobList(blobsInContainer);

    // reset state/form
    setUploading(false);
    setFileList([]);
    message.success("File uploaded successfully");
  };

  const uploadprops = {
    onRemove: (file) => {
      console.log(file);
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

  return <>{storageConfigured && DisplayForm()}</>;
};

export default FileUpload;
