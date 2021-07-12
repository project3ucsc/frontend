import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";

export default function ForgotPass({ history }) {
  const fpstate = {
    emailsend_1: "emailsent",
    otpverify_2: "otpverify",
    changepass_3: "changepass",
    success_4: "success",
  };
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(fpstate.emailsend_1);
  const [otpcode, setOtpcode] = useState("");

  const onFinish = (data) => {
    switch (status) {
      case fpstate.emailsend_1:
        setLoading(true);
        setTimeout(() => {
          // chack whether email is correct
          // send otp to email
          //  save this otp to a variable for later verify
          setOtpcode("1234");
          setStatus(fpstate.otpverify_2);
          setLoading(false);
          message.info("Otp code sent email");
        }, 500);
        break;

      case fpstate.otpverify_2:
        if (data.otp === otpcode) {
          setStatus(fpstate.changepass_3);
        } else {
          message.error("This is an error message");
          //   seterror("Otp code you enterred is wrong");
        }

        break;

      case fpstate.changepass_3:
        message.success("Password changed successfully");
        setTimeout(() => {
          history.push("/login");
        }, 1000);
        break;

      default:
        break;
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
        style={{ minWidth: "350px" }}
      >
        <h1>Forgot Password</h1>

        {status === fpstate.emailsend_1 && (
          <>
            <h3>Type email you entered when register</h3>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your emial!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Confirm your email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Next
              </Button>
            </Form.Item>
          </>
        )}
        {status === fpstate.otpverify_2 && (
          <>
            <h3>We have sent a otp code to your email </h3>
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please otp code!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter otp code"
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Next
              </Button>
              <Button
                type="default"
                htmlType="button"
                style={{ marginTop: "15px" }}
                onClick={() => setStatus(fpstate.emailsend_1)}
                className="login-form-button"
              >
                Back
              </Button>
            </Form.Item>
          </>
        )}
        {status === fpstate.changepass_3 && (
          <>
            <h3>Almost done!</h3>
            <Form.Item
              name="password"
              //   label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              //   label="Confirm Password"
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
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Complete
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}
