import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import reliefservice from "services/relief.service";
import { useForm } from "antd/lib/form/Form";
import authenticationservice from "services/authentication.service";

const { Option } = Select;
const { TextArea } = Input;
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 12,
  },
};

export default function ShortLeaveForm() {
  const [timeslots, setTimeslots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  // moment().day()
  const onFinish = async (values) => {
    try {
      setLoading(true);
      let userid = authenticationservice.currentUserValue.id;

      const tc = await reliefservice.addleaveNreleif({ ...values, userid });
      console.log(tc);
      setLoading(false);
      message.success(
        "Leave successfully added and reilf requests sent to " +
          tc +
          " teachers"
      );
    } catch (error) {
      message.error(error.message);
    }

    // console.log("Success:", values);
  };

  const onDateChange = async (value) => {
    form.setFieldsValue({ timeslots: [] });
    if (!value) {
      setTimeslots([]);
      return;
    }
    try {
      const data = await reliefservice.getTimeslotsFortheDay(value.day());
      setTimeslots(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Form
      form={form}
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
      onFinish={onFinish}
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

      <Form.Item
        label="Leave Date"
        name="date"
        rules={[
          {
            required: true,
            message: "Please input date!",
          },
        ]}
      >
        <DatePicker onChange={onDateChange} />
      </Form.Item>

      <Form.Item
        name="reason"
        label="Reason"
        rules={[
          {
            required: true,
            message: "Please input reason!",
          },
        ]}
      >
        <TextArea rows={4} placeholder="Enter reason here.." />
      </Form.Item>

      <Form.Item
        name="timeslots"
        label="Leave time slots"
        rules={[
          {
            required: true,
            message: "Please select time slots!",
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Click here and select all the timeslots that you are going to apply for leave.."
        >
          {timeslots.map((ts) => (
            <Option key={ts.id} value={ts.id}>
              {ts.name}
            </Option>
          ))}
        </Select>
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
