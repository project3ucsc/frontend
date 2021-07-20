import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Button,
  Input,
  Image,
  Space,
  Select,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
import FormItem from "antd/lib/form/FormItem";
import axios from "axios";
import authenticationservice from "services/authentication.service";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";

const { Content } = Layout;
const { Option } = Select;

export default function Profile() {
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const [userProfile, setUserProfile] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        apiurl + "/user/" + authenticationservice.currentUserValue.id,
        authHeader()
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        let tmp = { ...res.data, school: "Bandaragama Central College" };
        form.setFieldsValue(tmp);
        setUserProfile(tmp);
      })
      .catch((e) => {
        message.error("Something went wrong");
        console.log(e);
      });
  }, [form]);

  const onFinish = (values) => {
    setIsDisable(true);
    console.log("Success:", values);
    axios
      .put(
        apiurl + "/user/" + authenticationservice.currentUserValue.id,
        values,
        authHeader()
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        message.success("Profile updated successfully");
      })
      .catch((e) => {
        setLoading(false);

        message.error("Something went wrong");
        console.log(e);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //useState
  return (
    <ContentLayout title="My Profile" paths={["Home", "Profile"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} lg={3}></Col>
          <Col xs={24} lg={12}>
            {/* <div className="card-wrapper"> */}
            <Form
              form={form}
              name="prof"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={userProfile}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <FormItem>
                <Row justify="center" align="middle">
                  <Image
                    width={200}
                    src="https://s3-alpha-sig.figma.com/img/4ff3/b2fc/830207607130977d79aaef36dc63e8fb?Expires=1627257600&Signature=fwCkD3YJxMoaGpu0j5itQXaW9AtGiWCvpxHAje6AnMjNd3U2Ng9qAjmNZuIDvjWRY9RXDx2Pn5FWEu2WRx0mYJ3osOzVgYRtEmf0uZm-XRxYb1AeAQjhZ8Dv0ijCzEXFjXLofEcIBV-wVGl43rvjLprLWCGD3moOuG39rzSfawYg~o4NULQFuUUwGwWq0w15pvRnVteO~vkGI7eNSaH9mQvO-kY7asHAOuufbMoyw9iSQuIFAR2rEaBByrbTi2Bl6cujQkyl9maNJImBXSXrnzVoIuOa8UOYrDm8O79B0Y2jLRQxGqejhNkH5Frsqfa3RZXgxDWKKQsj0w8Zx3eDmw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  />
                </Row>
              </FormItem>

              <Form.Item
                label="Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <Input disabled={isDisable} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input disabled={isDisable} />
              </Form.Item>

              {/* <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

              <Form.Item label="Phone number" name="phone">
                <Input disabled={isDisable} />
              </Form.Item>

              <Form.Item label="Gender" name="gender">
                <Select disabled={isDisable} placeholder="select your gender">
                  <Option value="m">Male</Option>
                  <Option value="f">Female</Option>
                  <Option value="o">Other</Option>
                </Select>
              </Form.Item>

              {/* <Form.Item
                label="Date of Birth"
                name="birthday"
                rules={[
                  {
                    type: "object",
                  },
                ]}
              >
                <DatePicker disabled={isDisable} />
              </Form.Item> */}

              <Form.Item disabled label="School" name="school">
                <Input disabled />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Space>
                  {!isDisable && (
                    <Button
                      onClick={() => setIsDisable(true)}
                      htmlType="button"
                      danger
                    >
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
            </Form>
            {/* </div> */}
          </Col>
          <Col xs={24} lg={9}></Col>

          {/*<Col xs={24} lg={7}>
              <div className="card-wrapper">
                
                  
                  <Form
                    name="unedit"
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

                    
                  </Form>
                  
              </div>
            </Col> */}
        </Row>

        {/* ReactDOM.render(<Demo />, mountNode); */}
      </Content>
    </ContentLayout>
  );
}
