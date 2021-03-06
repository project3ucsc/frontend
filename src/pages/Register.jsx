import React, { useState, useEffect } from "react";
import { Role } from "utils/common";
import "./register.scss";
import logo from "img/signUp2.png";
import auth from "services/authentication.service";
import notificationservice from "services/notification.service";

import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Divider,
  message,
  Typography,
} from "antd";
import FileUpload from "components/FileUpload";
import { containers } from "services/azureblob.service";
const { Option } = Select;




const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = ({ history }) => {
  const [userRole, setUserRole] = useState(Role.STUDENT);
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [form] = Form.useForm();

  

  const [filename, setFilename] = useState("");
  useEffect(() => {
    auth
      .getschools()
      .then((data) => {
        console.log(data);
        setSchools(data);
      })
      .catch((err) => {
        console.log(err);
        // message.error(err)
      });
  }, []);

  const onFinish = (values) => {
    console.log(values);
    if (userRole === Role.PRINCIPAl && filename === "") {
      message.warn("You have to upload the document");
      return;
    }
    setLoading(true);
    auth
      .register({ ...values, filename })
      .then((data) => {
        setLoading(false);
        // show success messge
        message.success("Successfully registerd");
        history.push("/login");
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        // show err msg
        message.error(err.message);
      });
  };

  const onroleChange = (val) => {
    setUserRole(val);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="reg-container">
      <Col>
        <Row>
          <div className="topic"></div>
          <br />
          <br />

        </Row>
        <Row>
          <Col sm={24} xl={12}>
            <div className="img-container">
            <img src={logo} alt="logo" />
            </div>
          </Col>
          <Col sm={24} xl={12}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              className="reg-form"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "94",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="usertype"
                label="User type"
                rules={[
                  {
                    required: true,
                    message: "Please select your user type!",
                  },
                ]}
              >
                <Select
                  value={userRole}
                  onChange={onroleChange}
                  placeholder="select user type"
                >
                  <Option value={Role.STUDENT}>{Role.STUDENT}</Option>
                  <Option value={Role.TEACHER}>{Role.TEACHER}</Option>
                  <Option value={Role.PRINCIPAl}>{Role.PRINCIPAl}</Option>
                  <Option value={Role.SCHOOLADMIN}>{Role.SCHOOLADMIN}</Option>
                  <Option value={Role.TUTOR}>{Role.TUTOR}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="username"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="select your gender">
                  <Option value="M">Male</Option>
                  <Option value="F">Female</Option>
                  <Option value="O">Other</Option>
                </Select>
              </Form.Item>
              {userRole === Role.PRINCIPAl ? (
                <>
                  <Divider>School Details</Divider>
                  <Form.Item
                    name="schoolname"
                    label="School Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input School name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="schooladr" label="School Adress">
                    <Input />
                  </Form.Item>
                  <Divider>
                    Upload a ...... document to aprrove you are a principal
                  </Divider>
                  <Form.Item name="file" label="Upload document">
                    <FileUpload
                      container={containers.attachments}
                      setFilename={setFilename}
                    />
                  </Form.Item>
                </>
              ) : (
                <Form.Item
                  name="school"
                  label="Select School"
                  rules={[
                    {
                      required: true,
                      message: "Please select school!",
                    },
                  ]}
                >
                  <Select placeholder="select your school">
                    {schools.map((school) => (
                      <Option key={school.id} value={school.id}>
                        {school.name}
                      </Option>
                    ))}
                    {/* <Option value={1}>Bcc</Option>
                    <Option value={2}>Ac</Option>
                    <Option value={3}>Fhd</Option> */}
                  </Select>
                </Form.Item>
              )}

              <Form.Item {...tailFormItemLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Register;
