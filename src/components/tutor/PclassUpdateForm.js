import React, { useState, useEffect } from "react";
import { InputNumber, TimePicker } from "antd";
import { Form, Input, Button, Select, Space, message } from "antd";
import moment from "moment";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";

const { Option } = Select;
const { TextArea } = Input;

export default function PclassUpdateForm({ classid }) {
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [classData, setClassData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`${apiurl}/tutor/classes/${classid}`, authHeader())
      .then(({ data }) => {
        // setClassData(res.data);
        console.log(data);
        form.setFieldsValue({
          ...data,
          timerange: [moment(data.sttime), moment(data.endtime)],
        });
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, [classid]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(
        `${apiurl}/tutor/classes/${classid}`,
        values,
        authHeader()
      );
      setLoading(false);
      message.success("Class details updated successfully");
    } catch (err) {
      message.error(err.response.data.message);
      setLoading(false);
    }

    console.log("Success:", values);
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
      // initialValues={classData}
      onFinish={onFinish}
    >
      <Form.Item
        label="Subject"
        name="subject"
        rules={[
          {
            required: true,
            message: "Please input subject name!",
          },
        ]}
      >
        <Input disabled={isDisable} placeholder="Select the subject.." />
      </Form.Item>

      <Form.Item
        label="Grade"
        name="grade"
        rules={[
          {
            required: true,
            message: "Please input grade number!",
          },
        ]}
      >
        <InputNumber
          disabled={isDisable}
          min="1"
          max="13"
          placeholder="Input grade here.."
        />
      </Form.Item>

      {/* <Form.Item
        label="Medium"
        name="medium"
        rules={[
          {
            required: true,
            message: "Please selct medium!",
          },
        ]}
      >
        <Select disabled={isDisable} placeholder="Select the medium..">
          <Option value="Sinhala">Sinhala</Option>
          <Option value="English">English</Option>
          <Option value="Tamil">Tamil</Option>
        </Select>
      </Form.Item> */}

      <Form.Item
        label="Day"
        name="day"
        rules={[
          {
            required: true,
            message: "Please select date!",
          },
        ]}
      >
        <Select disabled={isDisable} placeholder="Select the date..">
          <Option value="Monday">Monday</Option>
          <Option value="Teusday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Time Range"
        name="timerange"
        rules={[
          {
            required: true,
            message: "Please input Time Range!",
          },
        ]}
      >
        <TimePicker.RangePicker disabled={isDisable} />
      </Form.Item>

      <Form.Item
        label="Fee"
        name="fee"
        rules={[
          {
            required: true,
            message: "Please fill in the fee!",
          },
        ]}
      >
        <InputNumber
          disabled={isDisable}
          placeholder="Input class fee here.."
        />
      </Form.Item>

      <Form.Item
        name="discription"
        label="Class Description"
        rules={[
          {
            required: true,
            message: "Please input class description!",
          },
        ]}
      >
        <TextArea
          disabled={isDisable}
          rows={4}
          placeholder="Enter class description here.."
        />
      </Form.Item>

      <Form.Item style={{ float: "right" }}>
        <Space>
          {!isDisable && (
            <Button onClick={() => setIsDisable(true)} htmlType="button" danger>
              Cancel
            </Button>
          )}
          <Button onClick={() => setIsDisable(false)} htmlType="button">
            Edit
          </Button>

          <Button
            loading={loading}
            disabled={isDisable}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Space>
      </Form.Item>

      {/*<Form.Item {...tailLayout}>
          <Button htmlType="button">Cancel</Button>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
      </Form.Item>*/}
    </Form>
  );
}
