import React from "react";
import { Layout, Row, Col, DatePicker, Form, Button, Input, Image, Space} from "antd";
import ContentLayout from "components/ContentLayout";
import FormItem from "antd/lib/form/FormItem";

export default function Profile() {
    const { Content } = Layout;


        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
//useState
    return (
      <ContentLayout paths={["Home", "Profile"]}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >

          <Row>
            <Col xs={24} lg={16}>
              {/* <div className="card-wrapper"> */}
              <Form
                name="prof"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                  fullname: "lakshan",
                  email: "lakshansandaruwan1998@gmail.com",
                  phone_no: "+94716555555",
                  school: "Bandaragama Central College",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
              
                <FormItem>
                  <Row justify="space-around" align="middle">
                    
                    <Image width={200} src="https://s3-alpha-sig.figma.com/img/4ff3/b2fc/830207607130977d79aaef36dc63e8fb?Expires=1627257600&Signature=fwCkD3YJxMoaGpu0j5itQXaW9AtGiWCvpxHAje6AnMjNd3U2Ng9qAjmNZuIDvjWRY9RXDx2Pn5FWEu2WRx0mYJ3osOzVgYRtEmf0uZm-XRxYb1AeAQjhZ8Dv0ijCzEXFjXLofEcIBV-wVGl43rvjLprLWCGD3moOuG39rzSfawYg~o4NULQFuUUwGwWq0w15pvRnVteO~vkGI7eNSaH9mQvO-kY7asHAOuufbMoyw9iSQuIFAR2rEaBByrbTi2Bl6cujQkyl9maNJImBXSXrnzVoIuOa8UOYrDm8O79B0Y2jLRQxGqejhNkH5Frsqfa3RZXgxDWKKQsj0w8Zx3eDmw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" /> 
                  </Row>
                </FormItem>

                <Form.Item
                  label="Name"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                    },
                  ]}
                >
                  <Input />
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

                <Form.Item
                  label="Phone number"
                  name="phone_no"
                  rules={[
              
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item disabled
                  label="Date of Birth"
                  name="birthday"
                  rules={[
                    {
                      type: 'object',
                    }
                  ]}
                >
                  <DatePicker disabled="(true)" />
                </Form.Item>
                
                <Form.Item disabled
                  label="School"
                  name="school"
                  rules={[
              
                  ]}
                >
                  <Input disabled="(true)"/>
                </Form.Item>
                
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Space>
                  <Button htmlType="submit">
                    Edit
                  </Button>
                
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  </Space>
                </Form.Item>
                
              </Form>
              {/* </div> */}
              
            </Col>
            
             <Col lg={8}></Col>

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