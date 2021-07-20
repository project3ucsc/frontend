import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Menu,
  message,
  Image,
  Dropdown,
  Rate,
  PageHeader,
  Button,
  Tabs,
  Row,
  Col,
  Input,
  Space,
} from "antd";
//import ContentLayout from "components/ContentLayout";

import { DownOutlined } from "@ant-design/icons";
import "./Home.scss";
import axios from "axios";
import { apiurl } from "utils/common";
import ContentLayout from "components/ContentLayout";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Meta } = Card;

export default function Home() {
  const [freeProgs, setFreeProgs] = useState([]);

  useEffect(() => {
    axios.get(apiurl + "/freeprog").then((res) => {
      console.log(res.data);
      setFreeProgs(res.data);
    });
  }, []);

  const onSearch = (value) => console.log(value);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  //const subjects = ["Maths", "Chemistry", "Physics", "English"];

  function callback(key) {
    console.log(key);
  }

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  return (
    <ContentLayout title="Free Educational Programs" paths={["Home"]}>
      <div className="site-page-header-ghost-wrapper">
        <Tabs
          className="site-layout-background"
          defaultActiveKey="3"
          onChange={callback}
        >
          <TabPane tab="All" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Youtube Series " key="2"></TabPane>
          <TabPane tab="TV Programs" key="3">
            <Content
              className="site-layout-background-2 "
              style={{
                padding: 0,
                margin: 0,

                // minHeight: 1680,
                backgroundColor: "#dfe6eb",
              }}
            >
              <div className="site-page-header-ghost-wrapper-2">
                <PageHeader className="page-header-2" ghost={false}>
                  <Space direction="horizontal">
                    <Dropdown overlay={menu} title={"Author :"}>
                      <Button label="ssss">
                        Select Author <DownOutlined />
                      </Button>
                    </Dropdown>

                    <Dropdown overlay={menu}>
                      <Button>
                        Rating Order <DownOutlined />
                      </Button>
                    </Dropdown>
                    <Search
                      style={{ width: 500 }}
                      placeholder="input search text"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch}
                    />
                  </Space>
                </PageHeader>
              </div>
              {/* const tvPrograms = (this.props.link); */}

              <div className="site-card-border-less-wrapper scrollcon sc-bar">
                <Row>
                  <Col xs={24} xl={24}>
                    <div className="card-wrapper-home">
                      {freeProgs.map((item, i) => (
                        // <Card key={i}>{item.title},{item.name}</Card>
                        <Card className="edu-card" key={i} hoverable>
                          <Image width={200} height={130} src={item.imgurl} />
                          <Meta
                            title={item.title}
                            description={item.discription}
                          />
                          <br />
                          <Space direction="horizontal">
                            <Rate allowHalf defaultValue={item.rating} />
                            <Button type="primary">See more</Button>
                          </Space>
                        </Card>
                      ))}
                    </div>
                  </Col>
                  {/*  <Col xs={24} xl={6}>
            sdgsdg
          </Col>  */}
                </Row>
              </div>
            </Content>
          </TabPane>
          <TabPane tab="Radio Programs" key="4"></TabPane>
        </Tabs>
      </div>
    </ContentLayout>
    // </ContentLayout>
  );
}
