import React from "react";
import { Layout, Row, Col, Card } from "antd";
import { Form, Input, Button,Select, Image, Checkbox, Radio } from 'antd';
import { InputNumber} from 'antd';
import { DatePicker, Space } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';

import ContentLayout from "components/ContentLayout";

export default function ApplyLeave() {
  
  
  const { Content } = Layout;
  const format = 'HH:mm';
  const { RangePicker } = DatePicker;
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const { Option } = Select;

  const { TextArea } = Input;
  
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
                            label="Date"
                            name="date"
                            rules={[
                                {
                                required: true,
                                message: 'Please input start time!',
                                },
                            ]}
                            >
                            <DatePicker  />
                        </Form.Item>

                    
                          
                        <Form.Item
                            label="Time"
                            name="time"
                            rules={[
                                {
                                required: true,
                                message: 'Please input start time!',
                                },
                            ]}
                            >
                            <TimePicker defaultValue={moment('12:08', format)} format={format} />
                        </Form.Item>

                        
                          
                        
                        

                   
              
                    <Form.Item label="Grade"
                    rules={[
                        {
                        required: true,
                        message: 'Please grade!',
                        },
                    ]}>
                        <Form.Item name="grade" noStyle>
                        <InputNumber min={1} max={13} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Class"
                    rules={[
                        {
                        required: true,
                        message: 'Please input class!',
                        },
                    ]}>
                        <Form.Item name="class" noStyle>
                        <InputNumber min={1} max={13} />
                        </Form.Item>
                    </Form.Item>
              
                    <Form.Item
                        name="subject"
                        label="Subject"
                        hasFeedback
                        rules={[{ required: true, message: 'Please select the subject!' }]}
                    >
                        <Select placeholder="Please select the subject">
                            <Option value="Combined Maths"> Combined Maths</Option>
                            <Option value="Physics"> Physics </Option>
                            <Option value="Chemistry">Chemistry </Option>
                            <Option value="IT"> IT </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                            name="Media Type" 
                            label="Need to arrange alternative teacher?">
                            <Radio.Group>
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>
                            </Radio.Group>
                    </Form.Item>

                    

                    
                        <Form.Item
                            label="Suggest alternative teachers (optional)"
                            name="altTeacher"
                            
                        >
                            <Select placeholder="Select a teacher">
                                <Option value="1">Teacher 1</Option>
                                <Option value="2">Teacher 2</Option>
                                <Option value="3">Teacher 3</Option>
                                <Option value="4">Teacher 4</Option>
                                <Option value="5">Teacher 5</Option>
                                <Option value="6">Teacher 6</Option>
                            </Select>
                        </Form.Item>
                        

                        <Form.Item
                            name="reason"
                            label="Reason"
                        >
                            <TextArea rows={4} placeholder="Enter reason here.." />
                        </Form.Item>
                    

                        
                    
                        <Form.Item {...tailLayout}>
                          
                          <Button htmlType="button" >
                            Cancel
                          </Button>
                          
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                          
                        </Form.Item>
                       

                  </Form>
          </Col>
          <Col xs={24} xl={6}>
            
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
