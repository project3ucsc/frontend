import React, { useState } from "react";
import { 
    Layout,
    Row,
    Col,
    Card,
    Input,
    Space,
    Modal,
} from "antd";

import ContentLayout from "components/ContentLayout";

const { Content } = Layout;
const { Search} = Input;

export default function ManageUsers() {

    const [studentvisible,setstudentvisible] = useState(false);
    const [teachervisible,setteachervisible] = useState(false);

    return (
        <ContentLayout title="Manage Users" paths={["SchoolAdmin", "ManageUsers"]}>
            <Modal 

            >

            </Modal>
           <Content>
              <Row gutter={16}>
                  <Col xs={24} xl={12}>
                      <Card title="Manage Student Accounts" bordered={true}>
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
                  <Col xs={24} xl={12}>
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
              </Row>
           </Content>
        </ContentLayout>
    );
}