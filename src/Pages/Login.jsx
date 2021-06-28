import React, { useState } from "react";

import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import auth from "Services/authentication.service";
import "./login.scss";
import logo from "img/logo.png";

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");

  const onFinish = ({ username, password }) => {
    setLoading(true);
    auth
      .login(username, password)
      .then(() => history.push("/dashboard"))
      .catch((err) => {
        setLoading(false);
        seterror(err.message);
      });
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
        <img src={logo} alt="logo" />

        {error !== "" && (
          <Alert
            message="Error Text"
            description={error}
            type="error"
            closable
            onClose={() => seterror("")}
          />
        )}

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
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

          <button className="login-form-forgot" onClick={console.log(5)}>
            Forgot password
          </button>
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
          Or <button>register now!</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
