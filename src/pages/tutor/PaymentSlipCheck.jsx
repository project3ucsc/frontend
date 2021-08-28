import React, { useState} from "react";
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
} from "antd";

import ContentLayout from "components/ContentLayout";
import "./PaymentSlipCheck.scss";

const { Content } = Layout;

const newSlipList = [
    {
        id : 1001,
        month : "September",
    },
    {
        id : 1002,
        month : "September",
    },
    {
        id : 1003,
        month : "September",
    },
    {
        id : 1004,
        month : "September",
    },
];

const payedList = [
    {
        id : 1001,
        month : "August",
    },
    {
        id : 1007,
        month : "August",
    },
    {
        id : 1008,
        month : "July",
    },
    {
        id : 1002,
        month : "July",
    },
];

export default function PaymentSlipCheck(){

    const [imagevisible,setimagevisible] = useState(false);
    const [slipvisible,setslipvisible] = useState(false);

    return (
        <ContentLayout
          title="Payment Slips"
          paths={["Tutor","PaymentSlipCheck"]}
        >
            <Modal
                visible={imagevisible} 
                onCancel={ () => setimagevisible(false)}
                footer={[
                    <Button key="back" onClick={ () => setimagevisible(false)}>
                        Cancel
                    </Button>,
                    <Button danger key="" onClick={ () => setimagevisible(false)}>
                        Reject
                    </Button>,
                    <Button type="primary" key="" onClick={ () => setimagevisible(false)}>
                        Approve
                    </Button>,
                ]}
            >
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </Modal>
            <Modal
                visible={slipvisible} 
                onCancel={ () => setslipvisible(false)}
                onOk={ () => setslipvisible(false)}
            >
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
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
                    <Col xs={24} xl={12}>
                    <Card 
                      title="New Payment Slips"
                      className="paymentcard"
                      >
                    <List
                        itemLayout="horizontal"
                        dataSource={newSlipList}
                        renderItem = { item => (
                           <List.Item onClick={ () =>setimagevisible(true)}>
                               <List.Item.Meta 
                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                    title={item.id}
                                    description={item.month}
                               />
                           </List.Item>
                        )}
                    ></List>
                    </Card>
                    </Col>

                    <Col xs={24} xl={12}>
                    <Card 
                       title="Viewed Payment Slips"
                       className="paymentcard"
                    >
                    <List
                        itemLayout="horizontal"
                        dataSource={payedList}
                        renderItem = { item => (
                            <List.Item onClick={ () => setslipvisible(true)}>
                                <List.Item.Meta 
                                    avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                    title={item.id}
                                    description={item.month}
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