import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, SelectOutlined } from "@ant-design/icons";

import uploadFileToBlob, {
  containers,
  deleteBlobFiile,
  getFileUrl,
  isStorageConfigured,
} from "services/azureblob.service";
import assmntservice from "services/passmnt.service";
import { enum_submissionStatus } from "utils/common";

const storageConfigured = isStorageConfigured();

const PAttachUpload = ({
  file,
  container,
  dbid,
  setSubmissionStaus,
  duedate,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(file);
  const showname = file.filename.split("-nm-")[1];
  const [fileList, setFileList] = useState(
    file.bool
      ? [
          {
            name: showname,
            status: "success",
            url: getFileUrl(file.filename, container),
            thumbUrl: getFileUrl(file.filename, container),
          },
        ]
      : []
  );

  const handleUpload = async () => {
    try {
      setUploading(true);
      setFileList([
        {
          name: fileList[0].name,
          status: "uploading",
        },
      ]);
      // *** UPLOAD TO AZURE STORAGE ***
      const filename = await uploadFileToBlob(fileList[0], container);
      if (container === containers.attachments)
        await assmntservice.updateAssmnt(dbid, "filename", filename);
      if (container === containers.submissions) {
        await assmntservice.upsertSubmission(dbid, filename);

        // update ui
        const today = new Date();
        const st =
          duedate > today
            ? enum_submissionStatus.submitearly
            : enum_submissionStatus.submitlate;
        setSubmissionStaus((prev) => {
          return {
            ...prev,
            status: st,
            filename: filename,
            submitdate: today.toLocaleString(),
          };
        });
      }

      // setFilename(filename);

      setUploaded({ bool: true, filename: filename });
      setUploading(false);

      setFileList([
        {
          name: fileList[0].name,
          status: "success",
          url: getFileUrl(filename, container),
          thumbUrl: getFileUrl(filename, container),
        },
      ]);
      // prepare UI for results
      // setBlobList(blobsInContainer);

      // reset state/form
      // setFileList([]);
      message.success("File uploaded successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const uploadprops = {
    onRemove: async (file) => {
      // console.log(file);
      try {
        if (uploaded.bool) {
          await deleteBlobFiile(uploaded.filename, container);
          if (container === containers.attachments)
            await assmntservice.updateAssmnt(dbid, "filename", "NA");
          if (container === containers.submissions) {
            await assmntservice.upsertSubmission(dbid, "NA");

            setSubmissionStaus((prev) => {
              return {
                ...prev,
                status: enum_submissionStatus.noattempt,
                filename: "NA",
              };
            });
          }
          message.success("Upoloaded file deleted");
          setUploaded({ bool: false, filename: "" });
          // setFilename("NA");
        }
        setFileList([]);
      } catch (error) {
        message.error(error.message);
      }
    },
    beforeUpload: (file) => {
      // console.log(file);
      setUploaded({ bool: false, filename: "" });
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

export default PAttachUpload;
