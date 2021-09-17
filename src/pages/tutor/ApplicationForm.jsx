import React, { useState, useEffect } from "react";
import { Layout, Row, Col, message } from "antd";
import { Form, Input, Button, Select } from "antd";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

import ContentLayout from "components/ContentLayout";

export default function ApplicationForm() {
  const { Content } = Layout;
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    let userid = authenticationservice.currentUserValue.id;
    axios
      .get(`${apiurl}/tutor/school/${userid}`, authHeader())
      .then((res) => {
        setSchools(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  const onFinish = async (values) => {
    try {
      const tutorid = authenticationservice.currentUserValue.id;
      const res = await axios.post(
        `${apiurl}/tutor/tutorschoolreq`,
        { ...values, tutorid },
        authHeader()
      );
      message.success("Request sent to the schools successfully");
      // return res.data;
    } catch (err) {
      message.error(err.response.data.message);
    }
  };

  const { Option } = Select;

  const { TextArea } = Input;

  return (
    <ContentLayout
      title="Tutor Class Application Form"
      paths={["Home", "Application Form"]}
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
              className="leftform"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 19,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Qualification"
                name="qualification"
                rules={[
                  {
                    required: true,
                    message: "Please input qualification details!",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Explain why school should accept you as a tutor"
                />
              </Form.Item>

              {/* <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: "Please upload qualification documents!",
                  },
                ]}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>
                    Click to upload qualification documents
                  </Button>
                </Upload>
              </Form.Item> */}

              <Form.Item name="discription" label="Description">
                <TextArea
                  rows={4}
                  placeholder="Enter any additional details that you want to add .."
                />
              </Form.Item>

              <Form.Item
                name="schools"
                label="Schools to apply"
                rules={[
                  {
                    required: true,
                    message: "Please select schools!",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Click here and select all the schools that you are going to apply.."
                >
                  {schools.map((school) => (
                    <Option key={school.id} value={school.id}>
                      {school.name}
                    </Option>
                  ))}
                </Select>
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
