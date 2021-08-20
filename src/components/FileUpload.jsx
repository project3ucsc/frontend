import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, SelectOutlined } from "@ant-design/icons";

import uploadFileToBlob, {
  deleteBlobFiile,
  getLearnMatUrl,
  isStorageConfigured,
} from "services/azureblob.service";

const storageConfigured = isStorageConfigured();

const FileUpload = ({ setFilename }) => {
  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState({ bool: false, filename: "" });

  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    setUploading(true);
    setFileList([
      {
        name: fileList[0].name,
        status: "uploading",
      },
    ]);
    // *** UPLOAD TO AZURE STORAGE ***
    const filename = await uploadFileToBlob(fileList[0]);

    setFilename(filename);
    setUploaded({ bool: true, filename: filename });
    setUploading(false);
    console.log({
      name: fileList[0].name,

      status: "success",
      url: getLearnMatUrl(filename),
      thumbUrl: getLearnMatUrl(filename),
    });
    setFileList([
      {
        name: fileList[0].name,
        status: "success",
        url: getLearnMatUrl(filename),
        thumbUrl: getLearnMatUrl(filename),
      },
    ]);
    // prepare UI for results
    // setBlobList(blobsInContainer);

    // reset state/form
    // setFileList([]);
    message.success("File uploaded successfully");
  };

  const uploadprops = {
    onRemove: async (file) => {
      // console.log(file);
      try {
        if (uploaded.bool) {
          await deleteBlobFiile(uploaded.filename);
          message.success("Upoloaded file deleted");
          setUploaded({ bool: false, filename: "" });
        }
        setFileList([]);
      } catch (error) {
        message.error(error.message);
      }
    },
    beforeUpload: (file) => {
      // console.log(file);
      setFileList([file]);

      return true;
    },

    fileList,
  };

  // display form
  const DisplayForm = () => (
    <div style={{ marginBottom: 16 }}>
      <Upload listType="picture" {...uploadprops} multiple={false} maxCount={1}>
        <Button type="dashed" icon={<SelectOutlined />}>
          Select File
        </Button>
      </Upload>
      <Button
        icon={<UploadOutlined />}
        type="default"
        onClick={handleUpload}
        disabled={fileList.length === 0 || uploaded.bool}
        loading={uploading}
        style={{ marginTop: 10 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );

  return <>{storageConfigured && DisplayForm()}</>;
};

export default FileUpload;
