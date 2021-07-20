import React from "react";
import { Layout, Row, Col } from "antd";
import { Form, Input, Button, TimePicker, Select, Radio } from "antd";
import { InputNumber } from "antd";
import ContentLayout from "components/ContentLayout";

export default function tvprogramme() {
  const { Content } = Layout;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const { TextArea } = Input;

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
                hasFeedback
                rules={[
                  { required: true, message: "Please select the subject!" },
                ]}
              >
                <Select placeholder="Please select the subject">
                  <Option value="Combined Maths"> Combined Maths</Option>
                  <Option value="Physics"> Physics </Option>
                  <Option value="Chemistry">Chemistry </Option>
                  <Option value="IT"> IT </Option>
                </Select>
              </Form.Item>

              <Form.Item name="Media Type" label="Media Type">
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
                  <Option value="tuesday">Teusday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Time Range"
                name="time range"
                rules={[{ required: true, message: "Time range is required" }]}
              >
                <TimePicker.RangePicker />,
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea rows={4} placeholder="Enter description here.." />
              </Form.Item>
              <Form.Item style={{ float: "right" }}>
                <Button htmlType="button">Cancel</Button>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
