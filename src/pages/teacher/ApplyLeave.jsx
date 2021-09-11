import React from "react";
import { Layout, Row, Col } from "antd";
import { Form, Input, Button, Select, DatePicker,TimePicker, Space } from "antd";
import ContentLayout from "components/ContentLayout";
import { Tabs } from 'antd';




export default function ApplyLeave() {
  const { Content } = Layout;
  const format = "HH:mm";
 
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const { RangePicker } = DatePicker;
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const { TextArea } = Input;

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <ContentLayout title="Apply for Leaves" paths={["Home", "ApplyLeaves"]}>
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


          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Short Leave" key="1">

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
                    label="Staff ID Number"
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Please input Staff ID number!",
                      },
                    ]}
                  >
                    <Input placeholder="Input your Staff ID number here.." />
                  </Form.Item>
                  
                  {/*<Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input name!",
                      },
                    ]}
                  >
                    <Input placeholder="Input your name here.." />
                  </Form.Item>*/}
                  
                  
                  
                  <Form.Item
                    label="Leave Date"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input date!",
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item name="reason" label="Reason"
                    rules={[
                      {
                        required: true,
                        message: "Please input reason!",
                      },
                    ]}
                  >
                    <TextArea rows={4} placeholder="Enter reason here.." />
                  </Form.Item>

                

                  
                  <Form.Item
                        name="select-multiple"
                        label="Leave time slots"
                        rules={[{ required: true, message: 'Please select time slots!', type: 'array' }]}
                    >
                        <Select mode="multiple" placeholder="Click here and select all the timeslots that you are going to apply for leave..">
                            <Option value="timeslot1">TimeSlot 1 Grade Class Subject</Option>
                            <Option value="timeslot2">Timeslot 2 Grade Class Subject</Option>
                            <Option value="timeslot3">Timeslot 3 Grade Class Subject</Option>
                        </Select>
                    </Form.Item>

                  

                  

                  

                  <Form.Item {...tailLayout}>
                    <Button htmlType="button">Cancel</Button>

                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>


            </TabPane>
            <TabPane tab="Long Leave" key="2">
              
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
                    label="Staff ID Number"
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Please input Staff ID number!",
                      },
                    ]}
                  >
                    <Input placeholder="Input your Staff ID number here.." />
                  </Form.Item>
                  
                  {/*<Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input name!",
                      },
                    ]}
                  >
                    <Input placeholder="Input your name here.." />
                  </Form.Item>*/}
                  
                  
                  
                  <Form.Item
                    label="Leave Date Range"
                    name="daterange"
                    rules={[
                      {
                        required: true,
                        message: "Please input date range!",
                      },
                    ]}
                  >
                    <RangePicker />
                  </Form.Item>

                  <Form.Item name="reason" label="Reason"
                    rules={[
                      {
                        required: true,
                        message: "Please reason for the leave!",
                      },
                    ]}
                  >
                    <TextArea rows={4} placeholder="Enter reason here.." />
                  </Form.Item>
                  

                  <Form.Item {...tailLayout}>
                    <Button htmlType="button">Cancel</Button>

                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

            </TabPane>
          </Tabs>

            
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
