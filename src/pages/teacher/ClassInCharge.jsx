import React, {useState} from "react";
import {
    Layout,
    Modal,
    Button,
    Row,
    Col,
    Descriptions,
    Card,
} from "antd";

import ContentLayout from "components/ContentLayout";

const newStudentList = [
    {
        title : "Sahan Sandaruwan",
        descrip : "sahan.sanda@gmail.com"
    },
    {
        title : "Hiruni Jayawardhana",
        descrip : "hiruni.jayawar@gmail.com"
    },
    {
        title : "Chethika Gamlath",
        descrip : "chethix.gam@gmail.com"
    },
];

const approvedStudentList = [
    {
        title : "Tharkana Silva",
        descrip : "tharkana.silva@gmail.com"
    },
    {
        title : "Sanduni Pabasara",
        descrip : "pabasara.sandu@gmail.com"
    },
    {
        title : "Sadheera Indumini",
        descrip : "indumini.sadhee@gmail.com"
    },
];

export default function ClassInCharge(){

    const {Content} = Layout;
    const [popupvisible,setpopupvisible] = useState(false);
    
    return(
        <ContentLayout title="Class In Charge" paths={["teacher","ClassInCharge"]}>
            <Modal 
                visible={popupvisible}
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
                    <Descriptions.Item label="Student name">Sahan Sandaruwan</Descriptions.Item>
                    <Descriptions.Item label="Student email">sahan.sanda@gmail.com</Descriptions.Item>
                </Descriptions>
            </Modal>
            <Content>
                <Row gutter={16}>
                    <Col xs={24} lg={12}>
                        <Card 
                            title="New Student Requests"
                            
                        >

                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card 
                            title="Approved Student Requests"
                            
                        >

                        </Card>
                    </Col>
                </Row>
            </Content>
        </ContentLayout>
    );
}