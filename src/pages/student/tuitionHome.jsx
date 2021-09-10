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
import { Drawer, List} from 'antd';
import ContentLayout from "components/ContentLayout";
import { AudioOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Content } = Layout;
const { Meta } = Card;

const data = [
    {
      title: 'Science ',
    },
    {
      title: 'Mathematics',
    },
    {
      title: 'English',
    },
    {
      title: 'Western Music',
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



export default function tuitionHome() {

    
    
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
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <HeartTwoTone twoToneColor="#eb2f96" key="vote" />,
                    <Button type="primary">Enroll</Button>,
                    <PhoneOutlined key="contact" />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Maths | Grade 9"
                    description="This is the description"
                  />
                </Card>
                ,
              </TabPane>
              <TabPane tab="Enrolled Classes" key="2">

              <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.title}</a>}
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
        

