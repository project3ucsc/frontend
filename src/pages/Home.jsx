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
import { Slide } from 'react-slideshow-image';



const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Meta } = Card;
const slideImages = [
  'https://www.potential.com/wp-content/uploads/2017/11/Untitled-3.png',
  'https://elearningindustry.com/wp-content/uploads/2014/12/shutterstock_225907201.jpg',
  'https://track2traininginstitute.files.wordpress.com/2021/07/1_qdesohhtwektbqnl5hm2pg.png'
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}



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




      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          //width:200,
          Height: 300,
        }}
      >
        
        <div className="slider-home"
        style={{
          padding: 24,
          margin: 0,
          //width:1000,
          //Height: 3500,
        }}
        >
      <Slide {...properties} >
      {/* style={{'width':5000, 'height':200, }} */}
        <div className="each-slide" style={{'width':5000, 'height':200, }}>
          <div style={{'backgroundImage': `url(${slideImages[0]})`, width:8000, height:200}}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})` , width:5000, height:200}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})` , width:5000, height:200}}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
      </div>
      </Content>
              

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
                          <Image width={230} height={130} src={item.imgurl} />
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
