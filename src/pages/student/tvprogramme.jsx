import React, {useState} from "react";
import { Layout, Row, Col } from "antd";
import { 
  Form, 
  Input, 
  Button,
  TimePicker, 
  Select, 
  Radio, 
  message,
  Space,
 } from "antd";

import { InputNumber } from "antd";
import ContentLayout from "components/ContentLayout";
import axios from "axios";
import authenticationservice from "services/authentication.service";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";

export default function Tvprogramme() {
  const { Content } = Layout;
  const { Option } = Select;

  const { TextArea } = Input;

  const [loading,setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    axios
      .post(
        apiurl + "/freeprog/suggest/" + authenticationservice.currentUserValue.id,
        values,
        authHeader()
      )
      .then((res) => {
        // setLoading(false);
        console.log(res.data);
        message.success("Education program suggested successfully");
        setLoading(false);
        form.resetFields();
      })
      .catch((e) => {
        // setLoading(false);

        message.error("Something went wrong");
        console.log(e);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ContentLayout
      title="Suggest Educational Programmes"
      paths={["Home", "Suggest Edu Programmes"]}
    >
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={24}>
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
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Name"
                name="progname"
                rules={[
                  {
                    required: true,
                    message: "Please input programe name!",
                  },
                ]}
              >
                <Input placeholder="Input programme name here.." />
              </Form.Item>

              <Form.Item label="Grade">
                <Form.Item name="grade" noStyle>
                  <InputNumber min={1} max={13} />
                </Form.Item>
              </Form.Item>

              <Form.Item
                name="subject"
                label="Subject"
                // hasFeedback
                rules={[
                  { required: true, message: "Please enter the subject!" },
                ]}
              >
                {/* <Select placeholder="Please select the subject">
                  <Option value="Combined Maths"> Combined Maths</Option>
                  <Option value="Physics"> Physics </Option>
                  <Option value="Chemistry">Chemistry </Option>
                  <Option value="IT"> IT </Option>
                </Select> */}
                <Input placeholder="Input subject name here.." />
              </Form.Item>

              <Form.Item name="mediaType" label="Media Type">
                <Radio.Group>
                  <Radio value="tv">TV</Radio>
                  <Radio value="radio">Radio</Radio>
                  <Radio value="youtube">Youtube</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Channel"
                name="channel"
                rules={[
                  {
                    required: true,
                    message: "Please input the channel",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Day"
                name="day"
                rules={[{ required: true, message: "Day is required" }]}
              >
                <Select placeholder="Select the day">
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Time Range"
                name="timeRange"
                rules={[{ required: true, message: "Time range is required" }]}
              >
                <TimePicker.RangePicker />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea rows={4} placeholder="Enter description here.." />
              </Form.Item>
              <Form.Item style={{ float: "right" }}>
                <Space>
                  <Button htmlType="button" onClick={ ()=>form.resetFields() }>Cancel</Button>
              
                  <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
