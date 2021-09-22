import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import reliefservice from "services/relief.service";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function LongLeaveForm() {
  const [loading, setLoading] = useState(false);
  const onFinishLong = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const tc = await reliefservice.addleave(values);
      setLoading(false);
      message.success("Leave added successfully ");
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishLong}
      // onFinishFailed={onFinishFailed}
    >
      {/* <Form.Item
        label="Staff ID Number"
        name="id"
        rules={[
          {
            required: true,
            message: "Please input Staff ID number!",
          },
        ]}
      >
        <Input placeholder="Input your Staff ID number here.." />
      </Form.Item> */}

      {/*<Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input placeholder="Input your name here.." />
        </Form.Item>*/}

      <Form.Item
        label="Leave Date Range"
        name="daterange"
        rules={[
          {
            required: true,
            message: "Please input date range!",
          },
        ]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item
        name="reason"
        label="Reason"
        rules={[
          {
            required: true,
            message: "Please reason for the leave!",
          },
        ]}
      >
        <TextArea rows={4} placeholder="Enter reason here.." />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button htmlType="button">Cancel</Button>

        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
