import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  List,
  Avatar,
  Descriptions,
  Card,
  Row,
  Layout,
  Col,
} from "antd";
const { Content } = Layout;

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

export default function EnrolledStulistComp({ classid }) {
  const [popupvisible, setpopvisible] = useState(false);

  const [dataList, setDataList] = useState([]);

  return (
    <div>
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
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          {/*<Col xs={24} xl={12}>*/}
          <Col xs={24} xl={24}>
            <Card title="New Student Requests" className="studentcard">
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
    </div>
  );
}
