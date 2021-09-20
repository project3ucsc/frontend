import React, { useState } from "react";
import {
  Button,
  Modal,
  List,
  Avatar,
  Descriptions,
  Card,
  Layout,
  Row,
  Col,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { Tabs } from "antd";
import { Link, useParams } from "react-router-dom";

import "./ViewStudentRequest.scss";
import PclassUpdateForm from "components/tutor/PclassUpdateForm";

const listData = [
  {
    title: "Mr. Lakmal Silva",
    discrip: "lakmal.silva@gmail.com",
  },
  {
    title: "Mr. Vishwa Herath",
    discrip: "vishwa.herath@gmail.com",
  },
  {
    title: "Mrs.Madara Warnakulasooriya",
    discrip: "madara.warnakula@gmail.com",
  },
  {
    title: "Mrs. Lumini Herath",
    discrip: "lumini.herath@gmail.com",
  },
  {
    title: "Ms.Hasini Peiris",
    discrip: "hasini.peiris@gmail.com",
  },
];

const enrolledData = [
  {
    title: "Ms. Sandali Liyanage",
    discrip: "sandali.liyanage@gmail.com",
    status: "Accepted",
  },
  {
    title: "Mr. Kapila Weerasinghe",
    discrip: "kapila.weerasinghe@gmail.com",
    status: "Rejected",
  },
  {
    title: "Mr. Deepal Perera",
    discrip: "deepal.perera@gmail.com",
    status: "Accepted",
  },
  {
    title: "Mrs. Deepani Kumari",
    discrip: "deepani.kumari@gmail.com",
    status: "Rejected",
  },
  {
    title: "Mr. Lakshan Perera",
    discrip: "lakshan.perera@gmail.com",
    status: "Accepted",
  },
];

const { TabPane } = Tabs;
const { Content } = Layout;

export default function ClassDetails() {
  let { classid } = useParams();

  function callback(key) {
    console.log(key);
  }

  const [popupvisible, setpopvisible] = useState(false);

  return (
    <ContentLayout
      title="Class Details"
      paths={["Home", "Dashboard", "ClassDetails"]}
    >
      <Content
        className="site-layout-background"
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={18}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Class Information" key="1">
                <PclassUpdateForm classid={classid} />
              </TabPane>
              <TabPane tab="New Student Requests" key="2">
                <Modal
                  visible={popupvisible}
                  title="Activate Students Account"
                  onCancel={() => setpopvisible(false)}
                  footer={[
                    <Button key="back" onClick={() => setpopvisible(false)}>
                      Cancel
                    </Button>,
                    <Button danger key="" onClick={() => setpopvisible(false)}>
                      Reject
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      onClick={() => setpopvisible(false)}
                    >
                      Accept
                    </Button>,
                  ]}
                >
                  <Descriptions title="Students Details" layout="vertical">
                    <Descriptions.Item label="Name">
                      Mr. Lakmal Silva
                    </Descriptions.Item>
                    <Descriptions.Item label="telephone Number">
                      0715537961
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      lakmal.si@gmail.com
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                      I believe that every student deserves access to quality
                      education and academic resources.
                    </Descriptions.Item>
                    <Descriptions.Item label="Assigner">
                      Mr. H.M.M. Senarath
                    </Descriptions.Item>
                    <Descriptions.Item label="Assigner Designation">
                      Principal
                    </Descriptions.Item>
                  </Descriptions>
                </Modal>

                <Content
                  // className="site-layout-background"
                  style={{
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Row>
                    {/*<Col xs={24} xl={12}>*/}
                    <Col xs={24} xl={24}>
                      <Card
                        title="New Student Requests"
                        className="studentcard"
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={listData}
                          renderItem={(item) => (
                            <List.Item onClick={() => setpopvisible(true)}>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    style={{ margin: 10 }}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                  />
                                }
                                title={item.title}
                                description={item.discrip}
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Content>
              </TabPane>
              {/*----------------------------------------------------------------------------------------------------- */}

              <TabPane tab="Enrolled Students" key="3">
                <Content
                  // className="site-layout-background"
                  style={{
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Row>
                    <Col xs={24} xl={24}>
                      <Link to="/studentpaymentdetails">
                        <Card title="" className="studentcard">
                          <List
                            itemLayout="horizontal"
                            dataSource={enrolledData}
                            renderItem={(item) => (
                              <List.Item>
                                {" "}
                                {/*onClick={() => setpopvisible(true)}>*/}
                                <List.Item.Meta
                                  avatar={
                                    <Avatar
                                      style={{ margin: 10 }}
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    />
                                  }
                                  title={item.title}
                                  description={item.discrip}
                                />
                                {/*<div >
                                                <Button htmlType="button">Cancel</Button>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                                </div>*/}
                              </List.Item>
                            )}
                          />
                          ,
                        </Card>
                      </Link>
                    </Col>
                  </Row>
                </Content>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
