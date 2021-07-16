import React from "react";
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
  Descriptions,
  Tabs,
  Row,
  Col,
  Input,
  Space,
} from "antd";
//import ContentLayout from "components/ContentLayout";

import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./Home.scss";

export default function Home() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  const { Search } = Input;
  const { Meta } = Card;

  const onSearch = (value) => console.log(value);

  const operations = (
    <Search
      style={{ width: 500 }}
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );

  const OperationsSlot = {
    //left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
    left: <label>Short By : </label>,
    right: (
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        expand <DownOutlined />
      </a>
    ),
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  //const subjects = ["Maths", "Chemistry", "Physics", "English"];

  const tvPrograms = [
    {
      _id: "1",
      name: "Gurugedara",
      title: "Every Friday at 4.00pm on National Television",
      rate: 3,
      picture:
        "https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg",
    },
    {
      _id: "2",
      name: "Gurugedara",
      title: "Every Sunday at 4.00pm on National Television",
      rate: 2.5,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRHQHiKg52uwIG7yChx7lSxbqPIzydG1Lhw&usqp=CAU",
    },
    {
      _id: "3",
      tinametle: "E-thaksalawa",
      title: "Every Friday at 6.00pm on ITN",
      rate: 3,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSbUTbI0CRqQzdniUZmYDg2ffj757CRso5zvBM2MBoLgzHaBmv-HrlipECXlSXt5biI44&usqp=CAU",
    },
    {
      _id: "4",
      name: "BrainHub",
      title: "Every Friday at 4.00pm on National Television",
      rate: 4,
      picture: "https://i.ytimg.com/vi/GC67h_ut7xU/hqdefault.jpg",
    },
    {
      _id: "5",
      name: "Math Class",
      title: "Every Friday at 4.30am on EYE Channel",
      rate: 3.5,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0_y05PCYb3baWtWohc3tQWdXUotbENXhKDyPSYbWCkJcXx5hW5CQPiTFqk2QMe_z9Q&usqp=CAU",
    },
    {
      _id: "6",
      name: "Gurugedara",
      title: "Every Monday at 4.00pm on National Television",
      rate: 3.5,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLTB-PzoDz7eufXBKQMwhDBWm2yXVtErL07RuBX8Uz9Vsx2oJgl4rM55u0O-mRs6f_sA&usqp=CAU",
    },
    {
      _id: "7",
      name: "BrainHub",
      title: "Every Friday at 4.30am on EYE Channel",
      rate: 3,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntsyo_9qRARQ0r_cMitrDJu_SGp26QZY95a6rcMDYLirlTWv1CwHmNap_b8j1cSkHdg&usqp=CAU",
    },
    {
      _id: "8",
      name: "BrainHub",
      title: "Every Monday at 4.30am on EYE Channel",
      rate: 4,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRHQHiKg52uwIG7yChx7lSxbqPIzydG1Lhw&usqp=CAU",
    },
    {
      _id: "9",
      name: "BrainHub",
      title: "Every Wendsday at 4.30am on EYE Channel",
      rate: 2.5,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnt_GT8kBnSXsHTvZY34yYJ28543ndfWqHyj5fHKaAyVbpyQ1JfxbIfjzkojvNZcKcjA&usqp=CAU",
    },
    {
      _id: "10",
      name: "ScienceHub",
      title: "Every Sunday at 4.00pm on EYE Channel",
      rate: 5,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH85zmpMPHGgl2i8b1idBKWSWKaAb9v5tUI_hiDrQvgb5hMT2pCcQJWWhWdSar0Q_pHz4&usqp=CAU",
    },
  ];

  //   //const [random, setRandom] = React.useState();

  function callback(key) {
    console.log(key);
  }

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  //  handleMenuClick = e => {
  //   if (e.key === '3') {
  //     this.setState({ visible: false });
  //   }
  //  };

  //  handleVisibleChange = flag => {
  //   this.setState({ visible: flag });
  //  };

  const { Content } = Layout;
  return (
    // <ContentLayout paths={["Home"]}>

    <Content
      className="site-layout-background"
      style={{
        padding: 0,
        margin: 0,
        minHeight: 1800,
        backgroundColor: "#ffffff",
      }}
    >
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="page-header-1"
          ghost={false}
          title="Free Educational Programs"
          // subTitle="This is a subtitle"

          // extra={[
          //     <Button key="3">Operation</Button>,
          //     <Button key="2">Operation</Button>,
          //     <Button key="1" type="primary">
          //       Primary
          //     </Button>,
          //   ]}
        >
          <Tabs
            tabBarExtraContent={operations}
            defaultActiveKey="3"
            onChange={callback}
          >
            <TabPane tab="All" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Youtube Series " key="2"></TabPane>
            <TabPane tab="TV Programs" key="3"></TabPane>
            <TabPane tab="Radio Programs" key="4"></TabPane>
          </Tabs>
          <br />
        </PageHeader>
      </div>

      <Content
        className="site-layout-background-2"
        style={{
          padding: 25,
          margin: 0,
          minHeight: 1680,
          backgroundColor: "#dfe6eb",
        }}
      >
        <div className="site-page-header-ghost-wrapper-2">
          <PageHeader
            className="page-header-2"
            ghost={false}

            // title="Free Educational Programs"
            // // subTitle="This is a subtitle"
          >
            {/* <Space direction="horizontal"> */}

            {/* </Space> */}

            {/* <Descriptions size="small" column={3}> */}
            {/* <Descriptions.Item label="Short by"> */}
            <Tabs
              tabBarExtraContent={OperationsSlot}
              defaultActiveKey="1"
              onChange={callback}
            >
              {/* label="Short by"
          ssss */}
              <TabPane tab="All" key="1"></TabPane>
              <TabPane tab="Grade " key="2"></TabPane>
              <TabPane tab="Medium" key="3"></TabPane>
              <TabPane tab="Subject" key="4"></TabPane>
              <TabPane tab="Channel" key="5"></TabPane>
              <TabPane tab="Day" key="5"></TabPane>
              <TabPane tab="Time" key="6"></TabPane>
            </Tabs>
            {/* </Descriptions.Item>
        </Descriptions> */}
            <Space direction="horizontal">
              {/* <Space direction="horizontal"> */}
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

              {/* </Space> */}
            </Space>
          </PageHeader>
        </div>
        <br />
        {/* const tvPrograms = (this.props.link); */}

        <div className="site-card-border-less-wrapper">
          <Row>
            <Col xs={24} xl={24}>
              <div className="card-wrapper-home">
                {tvPrograms.map((item, i) => (
                  // <Card key={i}>{item.title},{item.name}</Card>
                  <Card className="edu-card" key={i} hoverable>
                    <Image width={300} height={200} src={item.picture} />
                    <Meta title={item.name} description={item.title} />
                    <br />
                    <Space direction="horizontal">
                      <Rate allowHalf defaultValue={item.rate} />
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
    </Content>
    // </ContentLayout>
  );
}
