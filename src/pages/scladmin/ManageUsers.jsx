import React, { useState } from "react";
import { 
    Layout,
    Row,
    Col,
    Card,
    Input,
    Space,
    Modal,
    Button,
    Descriptions,
} from "antd";

import ContentLayout from "components/ContentLayout";
import "./ManageUsers.scss";

const { Content } = Layout;
const { Search} = Input;

export default function ManageUsers() {

    const [studentvisible,setstudentvisible] = useState(false);
    const [teachervisible,setteachervisible] = useState(false);

    return (
        <ContentLayout title="Manage Users" paths={["SchoolAdmin", "ManageUsers"]}>
            <Modal 
              visible={studentvisible}
              title="Manage Account"
              onCancel={ () => setstudentvisible(false)}
              footer={[
                  <Button onClick={ () => setstudentvisible(false)}>Cancel</Button>,
                  <Button danger onClick={ () => setstudentvisible(false)}>Deactivate</Button>,
                  <Button type="primary" onClick={ () => setstudentvisible(false)}>OK</Button>,
              ]}
            >
                <Descriptions>
                    <Descriptions.Item label="id">1001</Descriptions.Item>
                    <Descriptions.Item label="Name" span={2}>Vishmi Herath</Descriptions.Item>
                    <Descriptions.Item label="Email">vishmi.he@gamil.com</Descriptions.Item>
                </Descriptions>
            </Modal>
            <Modal 
              visible={teachervisible}
              title="Manage Account"
              onCancel={ () => setteachervisible(false)}
              footer={[
                  <Button onClick={ () => setteachervisible(false)}>Cancel</Button>,
                  <Button danger onClick={ () => setteachervisible(false)}>Deactivate</Button>,
                  <Button type="primary" onClick={ () => setteachervisible(false)}>Activate</Button>,
              ]}
            >
                <Descriptions>
                    <Descriptions.Item label="id">T001</Descriptions.Item>
                    <Descriptions.Item label="Name" span={2}>Upamali Karunanayake</Descriptions.Item>
                    <Descriptions.Item label="Email">upamalik@gmail.com</Descriptions.Item>
                </Descriptions>
            </Modal>
           <Content>
              <Row gutter={[16,32]}>
                  <Col lg={6}></Col>
                  <Col lg={12}>
                      <Card className="scladmincard"
                        title="Manage Student Accounts" 
                        bordered={true}
                      >
                          <Space direction="vertical">
                            <Search 
                                placeholder="student id"
                                enterButton="Search"
                                size="large"
                                onSearch={ () => setstudentvisible(true)}
                            />
                          </Space>
                        
                      </Card>
                  </Col>
                  <Col lg={6}></Col>

                  <Col lg={6}></Col>
                  <Col lg={12}>
                      <Card title="Manage Teacher Accounts" bordered={true}>
                        <Space direction="vertical">
                            <Search 
                                placeholder="teacher id"
                                enterButton="Search"
                                size="large"
                                onSearch={ () => setteachervisible(true)}
                            />
                          </Space>
                      </Card>
                  </Col>
                  <Col lg={6}></Col>
              </Row>
           </Content>
        </ContentLayout>
    );
}