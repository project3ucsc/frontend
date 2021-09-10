import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Layout,
  Modal,
  List,
  Avatar,
  Descriptions,
} from "antd";

import ContentLayout from "components/ContentLayout";
import "./ViewTutorRequestPage.scss";

export default function ViewTutorRequestPage() {
  const { Content } = Layout;
  const [popupvisible, setpopvisible] = useState(false);

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

  const historyData = [
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

  return (
    <ContentLayout
      title="Tutor Requests"
      paths={["SchoolAdmin", "Tutor Requests"]}
    >
      <Modal
        visible={popupvisible}
        title="Activate tutor account"
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
        <Descriptions title="Tutor Details" layout="vertical">
          <Descriptions.Item label="Name">Mr. Lakmal Silva</Descriptions.Item>
          <Descriptions.Item label="telephone Number">
            0715537961
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            lakmal.si@gmail.com
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            I believe that every student deserves access to quality education
            and academic resources.
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
          // padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} xl={12}>
            <Card title="New tutor requests" className="tutorcard">
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
              ,
            </Card>
          </Col>
          <Col xs={24} xl={12}>
            <Card title="History" className="tutorcard">
              <List
                itemLayout="horizontal"
                dataSource={historyData}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => setpopvisible(true)}
                    style={{ paddingRight: 10 }}
                  >
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
                    <div>{item.status}</div>
                  </List.Item>
                )}
              />
              ,
            </Card>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}

//manageuser page have to be added
