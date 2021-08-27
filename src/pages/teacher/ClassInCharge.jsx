import React, {useState} from "react";
import {
    Layout,
    Modal,
    Button,
    Descriptions,
    Card,
    List,
    Avatar,
    Tabs,
} from "antd";

import ContentLayout from "components/ContentLayout";
import "./ClassInCharge.scss";

const newStudentList = [
    {
        title : "Sahan Sandaruwan",
        descrip : "0101"
    },
    {
        title : "Hiruni Jayawardhana",
        descrip : "0102"
    },
    {
        title : "Chethika Gamlath",
        descrip : "0103"
    },
];

const approvedStudentList = [
    {
        title : "Tharkana Silva",
        descrip : "0001",
    },
    {
        title : "Sanduni Pabasara",
        descrip : "0002",
    },
    {
        title : "Sadheera Indumini",
        descrip : "0003",
    },
];

const {TabPane} = Tabs;

export default function ClassInCharge(){

    const {Content} = Layout;
    const [popupvisible,setpopupvisible] = useState(false);
    //const handleCancel = () => setpopupvisible(false);
    
    return(
        <ContentLayout title="Class In Charge" paths={["teacher","ClassInCharge"]}>
            <Modal 
                visible={popupvisible}
                onCancel={() => setpopupvisible(false)}
                title="Student Details"
                footer={[
                    <Button key="back" onClick={ () => setpopupvisible(false) }>
                        Cancel
                    </Button>,
                    <Button danger key="" onClick={ () => setpopupvisible(false)}>
                        Reject
                    </Button>,
                    <Button type="primary" onClick={ () => setpopupvisible(false)}>
                        Accept
                    </Button>,
                ]}
            >
                <Descriptions title="Student Details" layout="vertical">
                    <Descriptions.Item label="Student ID">1001</Descriptions.Item>
                    <Descriptions.Item label="Student name" span={2}>Tharkana Silva</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">0776193492</Descriptions.Item>
                    <Descriptions.Item label="Student email" span={2}>tharkana.s@gmail.com</Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>76/16A, Sunethradevi Rd, Nugegoda</Descriptions.Item>
                    <Descriptions.Item label="Father/Mother/Guardian" span={2}>Sarath Weerasekara</Descriptions.Item>
                    <Descriptions.Item label="Guardian's Tel number">0719463040</Descriptions.Item>
                    <Descriptions.Item label="Optional subject 1">Geography</Descriptions.Item>
                    <Descriptions.Item label="Optional subject 2">Music</Descriptions.Item>
                    <Descriptions.Item label="Optional subject 3">Information Technology</Descriptions.Item>
                </Descriptions>
            </Modal>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }} 
            >
                {/* <Row gutter={16}> */}
                <Tabs type="card" defaultActiveKey="1">
                    <TabPane tab="Approved Students" key="1">
                    {/* <Col xs={24} xl={24}> */}
                    <Card 
                        title="Student List"
                        className="teachercard"
                    >
                        <List 
                            itemLayout = "horizontal"
                            dataSource = {approvedStudentList}
                            renderItem = { item => ( 
                                <List.Item onClick={ () => setpopupvisible(true)}>
                                    <List.Item.Meta 
                                        avatar = { <Avatar style={{margin:10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        title = {item.title}
                                        description = {item.descrip}
                                    />
                                    <div>Approved</div>
                                </List.Item>
                            )}
                        />
                    </Card>
                    {/* </Col> */}
                    
                    </TabPane>

                    <TabPane tab="New Student Requests" key="2">
                    <Card 
                        title="Pending Requests"
                        className="teachercard"
                    >
                        <List 
                            itemLayout = "horizontal"
                            dataSource = {newStudentList}
                            renderItem = { item => ( 
                                <List.Item onClick={ () => setpopupvisible(true)}>
                                    <List.Item.Meta 
                                        avatar = { <Avatar style={{margin:10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        title = {item.title}
                                        description = {item.descrip}
                                    />
                                </List.Item>
                            )}
                        />

                    </Card>
                    </TabPane>
                </Tabs>
                    {/* <Col xs={24} lg={24}>
                        <Card 
                            title="New Student Requests"
                            
                        >
                            <List 
                                itemLayout = "horizontal"
                                dataSource = {newStudentList}
                                renderItem = { item => (
                                    <List.Item onClick = { () => setpopupvisible(true)}>
                                        <List.Item.Meta 
                                            avatar = {<Avatar style={{margin : 10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                                            title = {item.title}
                                            description = {item.descrip}
                                        />
                                    </List.Item>
                                )}
                            />


                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card 
                            title="Approved Student Requests"
                            
                        >
                            <List 
                                itemLayout = "horizontal"
                                dataSource = {approvedStudentList}
                                renderItem = { item => ( 
                                    <List.Item onClick={ () => setpopupvisible(true)}>
                                        <List.Item.Meta 
                                            avatar = { <Avatar style={{margin:10}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                            title = {item.title}
                                            description = {item.descrip}
                                        />
                                        <div>Approved</div>
                                    </List.Item>
                                )}
                            >

                            </List>
                        </Card>
                    </Col> */}
                {/* </Row> */}
            </Content>
        </ContentLayout>
    );
}