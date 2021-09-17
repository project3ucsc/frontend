import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Form, Input, DatePicker, message, Button } from "antd";
import FileUpload from "./FileUpload";
import { containers } from "services/azureblob.service";
import assmntservice from "services/assmnt.service";

const AddAssesmentForm = ({ sdid }) => {
  const [filename, setFilename] = useState("NA");

  // useEffect(() => {
  //   console.log(sdid);
  // }, [sdid]);

  const handleAdd = async (values) => {
    console.log(values);
    console.log(filename);

    try {
      await assmntservice.addAssmnt({ ...values, sdid, filename });
      message.success("Assesment added succesfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleAdd}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input title",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="discription"
          label="Discription"
          rules={[
            {
              required: true,
              message: "Please input discription",
            },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="duedate"
          label="Due Date"
          rules={[
            {
              required: true,
              message: "Please select a date",
            },
          ]}
        >
          <DatePicker showTime size="small" />
        </Form.Item>

        <FileUpload
          setFilename={setFilename}
          container={containers.attachments}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssesmentForm;
