import React from "react";
import { Layout, Row, Col, InputNumber } from "antd";
import { Form, Input, Button, Select, TimePicker, message } from "antd";
import ContentLayout from "components/ContentLayout";
//import { Tabs } from 'antd';

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

const { Option } = Select;
const { TextArea } = Input;
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Content } = Layout;

export default function AddNewClasses() {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const tutorid = authenticationservice.currentUserValue.id;
      await axios.post(
        `${apiurl}/tutor/classes`,
        { ...values, tutorid },
        authHeader()
      );
      form.resetFields();
      message.success("New class added successfully");
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  return (
    <ContentLayout title="Add New Class" paths={["Home", "Add New Class"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={18}>
            {/*
          <Tabs defaultActiveKey="1" onChange={callback}>

            <TabPane tab="Class Information" key="1">*/}

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
              form={form}
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
                <Input placeholder="Input subject here.." />
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
                  min="1"
                  max="13"
                  placeholder="Input subject here.."
                />
              </Form.Item>

              <Form.Item
                label="Medium"
                name="medium"
                rules={[
                  {
                    required: true,
                    message: "Please selct medium!",
                  },
                ]}
              >
                <Select placeholder="Select the medium..">
                  <Option value="Sinhala">Sinhala</Option>
                  <Option value="English">English</Option>
                  <Option value="Tamil">Tamil</Option>
                </Select>
              </Form.Item>

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
                <Select placeholder="Select the date..">
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
                <TimePicker.RangePicker />
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
                <InputNumber min="0" placeholder="Input class fee here.." />
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
                  rows={4}
                  placeholder="Enter class description here.."
                />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button htmlType="button">Cancel</Button>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            {/*</TabPane>
----------------------------------------------------------------------------------------------------- 
            <TabPane tab="New Student Requests" key="2">

            </TabPane>
----------------------------------------------------------------------------------------------------- 
          </Tabs>*/}
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
