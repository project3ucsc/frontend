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
  Spin,
} from "antd";
//import ContentLayout from "components/ContentLayout";

import { DownOutlined } from "@ant-design/icons";
import "./Home.scss";
import axios from "axios";
import { apiurl, spinStyle } from "utils/common";
import ContentLayout from "components/ContentLayout";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Meta } = Card;

const progtype = {
  tv: "tv",
  radio: "radio",
  utube: "video",
  all: "all",
};

export default function Home() {
  const [freeProgs, setFreeProgs] = useState([]);
  // let username=
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(apiurl + "/freeprog").then((res) => {
      console.log(res.data);
      setFreeProgs(res.data);
      setLoading(false);
    });
  }, []);

  //const subjects = ["Maths", "Chemistry", "Physics", "English"];

  function callback(key) {
    console.log(key);
  }

  return (
    <ContentLayout title="Free Educational Programs" paths={["Home"]}>
      <div className="site-page-header-ghost-wrapper">
        {!loading ? (
          <Tabs
            className="site-layout-background"
            defaultActiveKey="3"
            onChange={callback}
          >
            <TabPane tab="All" key="1">
              <ProgSection data={freeProgs} />
            </TabPane>
            <TabPane tab="Youtube Series " key="2">
              <ProgSection
                data={freeProgs.filter((d) => d.type === progtype.utube)}
              />
            </TabPane>
            <TabPane tab="TV Programs" key="3">
              <ProgSection
                data={freeProgs.filter((d) => d.type === progtype.tv)}
              />
            </TabPane>
            <TabPane tab="Radio Programs" key="4">
              <ProgSection
                data={freeProgs.filter((d) => d.type === progtype.radio)}
              />
            </TabPane>
          </Tabs>
        ) : (
          <Spin {...spinStyle} />
        )}
      </div>
    </ContentLayout>
    // </ContentLayout>
  );
}

const ProgSection = ({ data }) => {
  const [filterData, setFilterData] = useState(data);

  const onSearch = (value) => {
    console.log("cd", value);
    if (value === "") setFilterData(data);
    else
      setFilterData(
        data.filter((d) => d.title.includes(value) || d.subject.includes(value))
      );
  };

  return (
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
          <Space align="center" direction="horizontal">
            {/* <Dropdown overlay={menu} title={"Author :"}>
              <Button label="ssss">
                Select Author <DownOutlined />
              </Button>
            </Dropdown>

            <Dropdown overlay={menu}>
              <Button>
                Rating Order <DownOutlined />
              </Button>
            </Dropdown> */}
            <Search
              style={{ width: 500 }}
              placeholder="input search text"
              allowClear
              enterButton
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
              {filterData.map((item, i) => (
                // <Card key={i}>{item.title},{item.name}</Card>
                <Card className="edu-card" key={i} hoverable>
                  <Image width={230} height={130} src={item.imgurl} />
                  <Meta title={item.title} description={item.discription} />
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
  );
};
