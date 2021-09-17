import React, { useState, useEffect } from 'react';
import {
    Layout,
    Card,
    Row,
    Col,
    List,
    Avatar,
    Modal,
    Button,
    Image,
    Descriptions,
    Select,
    Divider,
} from "antd";


import { Form, Input } from 'antd';


import ContentLayout from "components/ContentLayout";
import "./PaymentSlipCheck.scss";

const { Content } = Layout;
const { Option } = Select;
const paidList = [
    {
        id : 1001,
        name : "Shashini Tharuka",
        email : "shashinit@gmail.com",
        telnum : "0710019452",
        submit : "03-09-2021",
    },
    {
        id : 1002,
        name : "Lakshan Sandaruwan",
        email : "lakshan@gmail.com",
        telnum : "0718519452",
        submit : "01-09-2021",
    },
    {
        id : 1003,
        name : "Shamali Sathindra",
        email : "shamali@gmail.com",
        telnum : "0718919452",
        submit : "08-09-2021",
    },
    {
        id : 1004,
        name : "Sewwandi Navodya",
        email : "sewwandi@gmail.com",
        telnum : "0710011022",
        submit : "12-09-2021",
    },
];

const notPaidList = [
    {
        id : 1021,
        name : "Thenura Perera",
        email : "thenura@gmail.com",
        telnum : "0711519452",
    },
    {
        id : 1007,
        name : "Mewantha Fernando",
        email : "mewantha@gmail.com",
        telnum : "0718009452",
    },
    {
        id : 1008,
        name : "Sahan Viraj",
        email : "sahanviraj@gmail.com",
        telnum : "0718519300",
    },
    {
        id : 1015,
        name : "Chethaka Kalmith",
        email : "chethaka@gmail.com",
        telnum : "0779519452",
    },
];

export default function ManagePayments(){

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const [paidvisible,setpaidvisible] = useState(false);
    const [notpaidvisible,setnotpaidvisible] = useState(false);

    return (
        <ContentLayout
          title="Manage Payments"
          paths={["Home","Manage Payments"]}
        >

            <Modal
                visible={paidvisible} 
                onCancel={ () => setpaidvisible(false)}
                footer={[
                    <Button key="back" onClick={ () => setpaidvisible(false)}>
                        Cancel
                    </Button>,
                    <Button danger key="" onClick={ () => setpaidvisible(false)}>
                        Reject
                    </Button>,
                    <Button type="primary" key="" onClick={ () => setpaidvisible(false)}>
                        Approve
                    </Button>,
                ]}
            >
                <Image
                    width={450} height = {200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />

                <Descriptions>
                    <Descriptions.Item label="Student ID">1001</Descriptions.Item>
                    <Descriptions.Item label="Name" span={3}>Shashini Tharuka</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>shashini@gamil.com</Descriptions.Item>
                    <Descriptions.Item label="Contact Number" span={3}>0718956123</Descriptions.Item>
                    <Descriptions.Item label="Submitted Date" span={3}>13-09-2021</Descriptions.Item>
                </Descriptions>

              { /* <p><b>Student ID :</b>   </p>
                <p><b>Name : </b>   </p>
                <p><b>Email :</b>    </p>
                <p><b>Contact Number :</b>   </p>
                <p><b>Submitted Date :</b>   </p>*/}
                

            </Modal>
            <Modal
                visible={notpaidvisible} 
                onCancel={ () => setnotpaidvisible(false)}
                footer={[
                    <Button key="back" onClick={ () => setnotpaidvisible(false)}>
                        Cancel
                    </Button>,
                    <Button danger key="" onClick={ () => setnotpaidvisible(false)}>
                        Remove Access
                    </Button>,
                ]}
            >
                <Descriptions>
                    <Descriptions.Item label="Student ID">1021</Descriptions.Item>
                    <Descriptions.Item label="Name" span={3}>Sahan Viraj</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>sahanviraj@gamil.com</Descriptions.Item>
                    <Descriptions.Item label="Contact Number" span={3}>0718956123</Descriptions.Item>
                </Descriptions>

                {/*<p><b>Student ID :</b> </p>
                <p><b>Name : </b>      </p>
                <p><b>Email : </b>     </p>
                <p><b>Contact Number : </b>  </p>*/}
            </Modal>
            <Content 
            // className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
            >
                    <Row>
                    
                    <Form  form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                        <Form.Item
                            name="subject"
                            rules={[{ required: true, message: 'Please input subject!' }]}
                        >
                            <Select placeholder="Subject" width="400">
                                <Option value="maths">Maths</Option>
                                <Option value="physics">Physics</Option>
                                <Option value="chemistry">Chemistry</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="grade"
                            rules={[{ required: true, message: 'Please input grade!' }]}
                        >
                            <Input
                               
                                type="number"
                                min="1" max="13"
                                placeholder="Grade"
                                width="400"
                            />
                            
                        </Form.Item>
                        <Form.Item
                            name="month"
                            rules={[{ required: true, message: 'Please input Month number!' }]}
                        >
                            <Input
                               
                                type="number"
                                min="1" max="12"
                                placeholder="Month"
                                width="400"
                            />
                            
                        </Form.Item>
                        
                        <Form.Item shouldUpdate>
                            {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                Search
                            </Button>
                            )}
                        </Form.Item>
                    </Form>
                    
                    </Row>
                    <br></br><br></br>
                   <Row gutter="16">
                   <Col xs={24} xl={12}>
                    <Card 
                      title="Paid Students"
                      className="paymentcard"
                      >
                    <List
                        itemLayout="horizontal"
                        dataSource={paidList}
                        renderItem = { item => (
                           <List.Item onClick={ () =>setpaidvisible(true)}>
                               <List.Item.Meta 
                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                    title={item.id + "      " + item.name}
                                    description={"Submit Date -   " + item.submit}
                               />
                           </List.Item>
                        )}
                    ></List>
                    </Card>
                    </Col>

                    <Col xs={24} xl={12}>
                   
                    
                    <Card 
                       title="Not Paid Students"
                       className="paymentcard"
                    >
                    <List
                        itemLayout="horizontal"
                        dataSource={notPaidList}
                        renderItem = { item => (
                            <List.Item onClick={ () => setnotpaidvisible(true)}>
                                <List.Item.Meta 
                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                    title={item.id + "      " + item.name}
                                    description={item.telnum}
                                />
                            </List.Item>
                        )}
                    ></List>
                    </Card>
                    </Col>
                    </Row>                
                
            </Content>
        </ContentLayout>
    );
}