import React, { useState } from "react";

import { Form, Input, Button, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import auth from "services/authentication.service";
import "./login.scss";
import logo from "img/knowledgeHUB4.png";




const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await auth.login(email, password);
      console.log(data);
      history.push("/dashboard");
    } catch (err) {
      setLoading(false);
      message.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      > 
        <img className="logo" src={logo} alt="logo" />

        <Form.Item
          name="email"
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
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Button
            type="link"
            className="login-form-forgot"
            onClick={() => history.push("/forgot-password")}
          >
            Forgot password
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or{" "}
          <Button type="link" onClick={() => history.push("/register")}>
            register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
