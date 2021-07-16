import React from "react";
import {
  Layout,
  Row,
  Col,
  List,
  Avatar,
  Modal,
  Button,
  Switch,
  Tabs,
} from "antd";
import { BankOutlined } from "@ant-design/icons";
import ContentLayout from "components/ContentLayout";
import { useState } from "react";

const data = [
  {
    title: "Prince of Wales College",
    dis: "Mr Sadun Gunathilaka",
  },
  {
    title: "Girls High School",
    dis: "Mr Kamal Perera",
  },
  {
    title: "St. Pauls College",
    dis: "Mr Amal Fernandi",
  },
  {
    title: "Princess of Wales College",
    dis: "Mr Saduni Gunathilaka",
  },
];
const { TabPane } = Tabs;

export default function School() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //switch
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  //Tab
  function callback(key) {
    console.log(key);
  }
  const { Content } = Layout;

  return (
    <ContentLayout title="School Requests" paths={["Home", "School"]}>
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
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://pngtree.com/freepng/vector-school-icon_4103014.html" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.dis}
                  />

                  <>
                    <Button type="primary" onClick={showModal}>
                      View More
                    </Button>
                    <Modal
                      title="School Details"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <p>Principle Name : Mr Sadun Gunathilaka</p>
                      <p>School Name : Prince of Wales College</p>
                      <p>School Adress : Galle Rd,Moratuma</p>
                      <p>Phone No : 0704570175</p>
                      <p>Assigned School Admin : none</p>
                      <p>
                        {" "}
                        Activate School:{" "}
                        <Switch defaultChecked onChange={onChange} />
                      </p>
                    </Modal>
                  </>
                </List.Item>
              )}
            />
            ,
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
