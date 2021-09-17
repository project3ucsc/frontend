import React, { useState } from "react";
import { Layout, Row, Col, InputNumber } from "antd";
import { Form, Input, Button, Select, DatePicker,Modal, List, Avatar,Descriptions,Card,Space, } from "antd";
import ContentLayout from "components/ContentLayout";
import { Tabs } from 'antd';
import { Link } from "react-router-dom"; 

import "./ViewStudentRequest.scss";


export default function ClassDetails() {
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const { Content } = Layout;
  const onFinish = (values) => {
    setIsDisable(true);
    console.log("Success:", values);
  };
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

  const [ popupvisible,setpopvisible] = useState(false);

    const listData = [
        {
            title : "Mr. Lakmal Silva",
            discrip : "lakmal.silva@gmail.com"
        },
        {
            title : "Mr. Vishwa Herath",
            discrip : "vishwa.herath@gmail.com"
        },
        {
            title : "Mrs.Madara Warnakulasooriya",
            discrip : "madara.warnakula@gmail.com"
        },
        {
            title : "Mrs. Lumini Herath",
            discrip : "lumini.herath@gmail.com"
        },
        {
            title : "Ms.Hasini Peiris",
            discrip : "hasini.peiris@gmail.com"
        },
    ];

    const historyData = [
        {
            title : "Ms. Sandali Liyanage",
            discrip : "sandali.liyanage@gmail.com",
            status : "Accepted"
        },
        {
            title : "Mr. Kapila Weerasinghe",
            discrip : "kapila.weerasinghe@gmail.com",
            status : "Rejected"
        },
        {
            title : "Mr. Deepal Perera",
            discrip : "deepal.perera@gmail.com",
            status : "Accepted"
        },
        {
            title : "Mrs. Deepani Kumari",
            discrip : "deepani.kumari@gmail.com",
            status : "Rejected"
        },
        {
            title : "Mr. Lakshan Perera",
            discrip : "lakshan.perera@gmail.com",
            status : "Accepted"
        },
    ];

    const enrolledData = [
        {
            title : "Ms. Sandali Liyanage",
            discrip : "sandali.liyanage@gmail.com",
            status : "Accepted"
        },
        {
            title : "Mr. Kapila Weerasinghe",
            discrip : "kapila.weerasinghe@gmail.com",
            status : "Rejected"
        },
        {
            title : "Mr. Deepal Perera",
            discrip : "deepal.perera@gmail.com",
            status : "Accepted"
        },
        {
            title : "Mrs. Deepani Kumari",
            discrip : "deepani.kumari@gmail.com",
            status : "Rejected"
        },
        {
            title : "Mr. Lakshan Perera",
            discrip : "lakshan.perera@gmail.com",
            status : "Accepted"
        },
    ];

  return (
    <ContentLayout title="Class Details" paths={["Home", "Dashboard", "ClassDetails"]}>
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
{/*----------------------------------------------------------------------------------------------------- */}
            <TabPane tab="Class Information" key="1">

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
                    label="Subject"
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: "Please input subject name!",
                      },
                    ]}
                  >
                    <Select disabled={isDisable} placeholder="Select the subject..">
                            <Option value="maths">Maths</Option>
                            <Option value="physics">Physics</Option>
                            <Option value="chemistry">Chemistry</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    label="Grade"
                    name="grade"
                    rules={[
                      {
                        required: true,
                        message: "Please input grade number!",
                      },
                    ]}
                  >
                    <InputNumber disabled={isDisable} min="1" max="13" placeholder="Input grade here.." />
                  </Form.Item>
                  
                  <Form.Item
                    label="Medium"
                    name="medium"
                    rules={[
                      {
                        required: true,
                        message: "Please selct medium!",
                      },
                    ]}
                  >
                    <Select disabled={isDisable} placeholder="Select the medium..">
                            <Option value="Sinhala">Sinhala</Option>
                            <Option value="English">English</Option>
                            <Option value="Tamil">Tamil</Option>
                    </Select>
                  </Form.Item>


                  <Form.Item
                    label="Day"
                    name="day"
                    rules={[
                      {
                        required: true,
                        message: "Please select date!",
                      },
                    ]}
                  >
                    <Select disabled={isDisable} placeholder="Select the date..">
                        <Option value="Monday">Monday</Option>
                        <Option value="Teusday">Tuesday</Option>
                        <Option value="Wednesday">Wednesday</Option>
                        <Option value="Thursday">Thursday</Option>
                        <Option value="Friday">Friday</Option>
                        <Option value="Saturday">Saturday</Option>
                        <Option value="Sunday">Sunday</Option>       
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    label="Time Range"
                    name="timerange"
                    rules={[
                      {
                        required: true,
                        message: "Please input Time Range!",
                      },
                    ]}
                  >
                    <DatePicker.RangePicker disabled={isDisable} />
                  </Form.Item>

                  <Form.Item
                        label="Fee"
                        name="fee"
                        rules={[
                            {
                               required: true,
                               message: "Please fill in the fee!",
                            },
                        ]}
                    >
                        <InputNumber disabled={isDisable} max="1000" placeholder="Input class fee here.." />
                    </Form.Item>

                  <Form.Item name="description" label="Class Description"
                    rules={[
                      {
                        required: true,
                        message: "Please input class description!",
                      },
                    ]}
                  >
                    <TextArea disabled={isDisable} rows={4} placeholder="Enter class description here.." />
                  </Form.Item>

                  <Form.Item style={{ float: "right" }}>
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

                  {/*<Form.Item {...tailLayout}>
                    <Button htmlType="button">Cancel</Button>

                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                </Form.Item>*/}
                </Form>
            </TabPane>
{/*----------------------------------------------------------------------------------------------------- */}
            <TabPane tab="New Student Requests" key="2">
              
                    <Modal
                        visible={popupvisible} 
                        title="Activate Students Account"
                        onCancel={() => setpopvisible(false)}
                        footer={[
                            <Button key="back" onClick={ () => setpopvisible(false) }>
                                Cancel
                            </Button>,
                            <Button danger key="" onClick={ () => setpopvisible(false)}>
                                Reject
                            </Button>,
                            <Button key="submit" type="primary" onClick={ () => setpopvisible(false) }>
                                Accept
                            </Button>,
                        ]}
                    >
                        <Descriptions title="Students Details" layout="vertical">
                            <Descriptions.Item label="Name">Mr. Lakmal Silva</Descriptions.Item>
                            <Descriptions.Item label="telephone Number">0715537961</Descriptions.Item>
                            <Descriptions.Item label="Email">lakmal.si@gmail.com</Descriptions.Item>
                            <Descriptions.Item label="Description" span={3}>I believe that every student deserves access to quality education and academic resources.</Descriptions.Item>
                            <Descriptions.Item label="Assigner">Mr. H.M.M. Senarath</Descriptions.Item>
                            <Descriptions.Item label="Assigner Designation">Principal</Descriptions.Item>
                            
                        </Descriptions>
                    </Modal>

                    <Content
                        // className="site-layout-background"
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                        <Row gutter={16}>
                            {/*<Col xs={24} xl={12}>*/}
                            <Col xs={32} xl={20}>
                                <Card 
                                    title="New Student Requests"
                                    className="studentcard"
                                >
                                    <List
                                        itemLayout = "horizontal"
                                        dataSource = { listData }
                                        renderItem =  { item => (
                                            <List.Item onClick={() => setpopvisible(true)}>
                                                <List.Item.Meta
                                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                                    title = {item.title}
                                                    description = {item.discrip}
                                                />
                                            </List.Item>
                                        )}
                                    />,
                                </Card>
                            </Col>
                           {/* <Col xs={24} xl={12}>
                                <Card 
                                    title="History of Student Requests"
                                    className="studentcard"
                                >
                                    <List
                                        itemLayout = "horizontal"
                                        dataSource = { historyData }
                                        renderItem =  { item => (
                                            <List.Item onClick={() => setpopvisible(true)} style={{paddingRight:10}}>
                                                <List.Item.Meta
                                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                                    title = {item.title}
                                                    description = {item.discrip}
                                                />
                                                <div>{item.status}</div>
                                            </List.Item>
                                        )}
                                    />,
                                </Card>
                             </Col>*/}
                        </Row>
                </Content>

            </TabPane>
{/*----------------------------------------------------------------------------------------------------- */}
            
            <TabPane tab="Enrolled Students" key="3">
    
                    <Content
                        // className="site-layout-background"
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                        <Row gutter={16}>
                            <Col xs={32} xl={20}>
                            <Link to="/studentpaymentdetails">
                                <Card 
                                    title=""
                                    className="studentcard"
                                >
                                    <List
                                        itemLayout = "horizontal"
                                        dataSource = { enrolledData }
                                        renderItem =  { item => (
                                            <List.Item > {/*onClick={() => setpopvisible(true)}>*/}
                                                <List.Item.Meta
                                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                                    title = {item.title}
                                                    description = {item.discrip}
                                                />
                                                {/*<div >
                                                <Button htmlType="button">Cancel</Button>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                                </div>*/}
                                            </List.Item>
                                            
                                        )}
                                    />,
                                </Card>
                                </Link>
                            </Col>
                            
                        </Row>
                </Content>
            

            </TabPane>
          </Tabs>

            
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
