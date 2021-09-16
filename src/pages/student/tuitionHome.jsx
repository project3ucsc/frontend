import React from "react";
import {
  Layout,
  Row,
  Col,
  Tabs,
  Input,
  Space,
  Card,
  Avatar,
  Divider,
  Button,
  Tag,
} from "antd";
import { Link } from "react-router-dom";
import { Drawer, List } from "antd";
import ContentLayout from "components/ContentLayout";
import { AudioOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./tuitionhome.scss";

import { useState } from "react";
import { Modal } from "antd";

const { TabPane } = Tabs;
const { Content } = Layout;
const { Meta } = Card;

const data = [
  {
    title: "Science ",
  },
  {
    title: "Mathematics",
  },
  {
    title: "English",
  },
  {
    title: "Western Music",
  },
];

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

// tab
function callback(key) {
  console.log(key);
}
// search bar

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const onSearch = (value) => console.log(value);

export default function TuitionHome() {
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

  let { id } = useParams();

  return (
    <ContentLayout
      title="Tuition Class Managment"
      paths={["Home", "Tuition Classes"]}
    >
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
            <Tabs onChange={callback} type="card">
              <TabPane tab="Suggested class for you" key="1">
                <Space direction="horizontal">
                  <Search
                    placeholder="Search teacher name here "
                    onSearch={onSearch}
                    enterButton
                  />
                  <Search
                    placeholder="Search subject name here "
                    onSearch={onSearch}
                    enterButton
                  />
                </Space>
                <Divider />
                <div className="site-card-wrapper">
                  <Row gutter={24}>
                    <Col span={8}>
                      <div className="card-body1" bordered={true}>
                      <Tag className="title" color="magenta"> Science | Grade 10
                       <div className="details">
                       <p> Ms. Kumuduni Fernando </p>
                          <p> Fryday at 4PM- 6PM </p>
                          <p> Monthly Fee 2500 LKR </p>
                          </div>
                          <Button className="enroll1" type="primary" colour={"black"}>
                            Enroll
                          </Button>
                          <Button className="view1" type="primary" onClick={showModal}>
                            View More
                          </Button>
                          </Tag>
                      </div>
                          <Modal
                           title="Important Details"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <p>About Teacher :</p>
                            <p>Contact :</p>
                            <p>Description :</p>
                          </Modal>
                        
                        
                    </Col>
                    <Col span={8}>
                      <div className="card-body2" bordered={true}>
                      <Tag className="title" color="orange"> History | Grade 10
                       <div className="details">
                       <p> Mr. Prasanna Perera </p>
                          <p> Fryday at 4PM- 6PM </p>
                          <p> Monthly Fee 2500 LKR </p>
                          </div>
                          <Button className="enroll2" type="primary" colour={"black"}>
                            Enroll
                          </Button>
                          <Button className="view2" type="primary" onClick={showModal}>
                            View More
                          </Button>
                          </Tag>
                      </div>
                          <Modal
                           title="Important Details"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <p>About Teacher :</p>
                            <p>Contact :</p>
                            <p>Description...</p>
                          </Modal>
                        
                        
                    </Col>

                    <Col span={8}>
                      <div className="card-body3" bordered={true}>
                      <Tag className="title" color="purple"> Maths | Grade 10
                       <div className="details">
                       <p> Mr. Aruna Prasad </p>
                       
                          <p> Fryday at 4PM- 6PM </p>
                          <p> Monthly Fee 2500 LKR </p>
                          </div>
                          <Button className="enroll3" type="primary" colour={"black"}>
                            Enroll
                          </Button>
                          <Button className="view3" type="primary" onClick={showModal}>
                            View More
                          </Button>
                          </Tag>
                      </div>
                          <Modal
                           title="Important Details"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <p>About Teacher :</p>
                            <p>Contact :</p>
                            <p>Description...</p>
                          </Modal>
                        
                        
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="Enrolled Classes" key="2">
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<Link to="subjectPage">{item.title}</Link>}
                        id={id}
                        description="<Tutor name  |  Date  |  Time >"
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
