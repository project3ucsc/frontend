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

} from "antd";
import { Link } from "react-router-dom";
import { Drawer, List } from "antd";
import ContentLayout from "components/ContentLayout";
import { AudioOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./tuitionhome.scss"

import { useState } from 'react';
import { Modal} from 'antd';


  

  
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
                  <Row gutter={16}>
                    <Col span={8}>
                     < div className="card-body1"bordered={true}>
                      <Card title="Science"  >
                        <ul>
                        <li>Grade : </li>
                          <li>Subject : </li>
                          <li>Date and Time : </li>
                          <li>Fees : </li>
                          <li>Description : </li>
                        </ul>
                        <Button type="primary" colour={"black"}>Enroll</Button>
                        <space size={[8,20]}></space>
                        <Button type="primary" >View More</Button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        </Modal>


                      </Card>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="card-body2" bordered={true}>
                      <Card title="Maths"  >
                      <ul>
                        <li>Grade : </li>
                          <li>Subject : </li>
                          <li>Date and Time : </li>
                          <li>Fees : </li>
                          <li>Description : </li>
                        </ul>
                        <Button type="primary" colour={"black"}>Enroll</Button>
                        <space size={[8,20]}></space>
                        <Button type="primary" >View More</Button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        </Modal>
                       
                      </Card>
                     </div>
                    </Col>
                    
                    <Col span={8}>
                    <div className="card-body3" bordered={true}>
                      <Card title="English" bordered={true}>
                      <ul>
                        <li>Grade : </li>
                          <li>Subject : </li>
                          <li>Date and Time : </li>
                          <li>Fees : </li>
                          <li>Contact : </li>
                        </ul>
                        <Button class="btn" type="primary" colour={"black"}>Enroll </Button>
                        <space size={[8,20]}></space>
                        <Button type="primary" >View More</Button>
                        <Button type="primary" View More onClick={showModal} ></Button>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Button type="primary" >View More</Button>
        <p>Some contents...</p>
        </Modal>
                        
                      </Card>
                      </div>
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
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
