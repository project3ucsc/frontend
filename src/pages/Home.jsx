import React from "react";
import { Layout,Form,Card,Menu,message,Image,Dropdown,Rate,PageHeader, Button, Descriptions,Tabs ,Row,Col,Input,Space  } from "antd";
import ContentLayout from "components/ContentLayout";
import { DownOutlined ,UserOutlined} from '@ant-design/icons';

export default function Home() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  const { Search } = Input;
  const { Meta } = Card;
  const onSearch = value => console.log(value);

  const operations = <Search  style={{ width: 500 }}
  placeholder="input search text"
  allowClear
  enterButton="Search"
  size="large"
  onSearch={onSearch}
  />

  const OperationsSlot = {
    //left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
    left:<label>Short By :  </label> ,
    right:<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    Hover me <DownOutlined />
  </a>,
  };

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" >
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" >
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" >
      3rd menu item
    </Menu.Item>
  </Menu>
);
//   //const [random, setRandom] = React.useState();

   function callback(key) {
     console.log(key);
   }

   function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
   }

  //  handleMenuClick = e => {
  //   if (e.key === '3') {
  //     this.setState({ visible: false });
  //   }
  //  };

  //  handleVisibleChange = flag => {
  //   this.setState({ visible: flag });
  //  };

  return (
    // <ContentLayout paths={["Home"]}>

    <Content
        className="site-layout-background"
        style={{
          padding: 0,
          margin: 0,
          minHeight: 2200,
          backgroundColor:"#ffffff",
        }}
    >

    <div className="site-page-header-ghost-wrapper">
      <PageHeader className="page-header-1"
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
      <Tabs tabBarExtraContent={operations} defaultActiveKey="3" onChange={callback}>
        <TabPane tab="All" key="1">
             Content of Tab Pane 1 
        </TabPane>
        <TabPane tab="Youtube Series " key="2">
        </TabPane>
        <TabPane tab="TV Programs" key="3">
        </TabPane>
        <TabPane tab="Radio Programs" key="4">
        </TabPane>
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
          backgroundColor:"#f5f3f0",
        }}
    >
    <div className="site-page-header-ghost-wrapper-2">
      <PageHeader className="page-header-2"
         ghost={false}
        
        // title="Free Educational Programs"
        // // subTitle="This is a subtitle" 
      >
        {/* <Space direction="horizontal"> */}
        
        {/* </Space> */}
        
      {/* <Descriptions size="small" column={3}> */}
          {/* <Descriptions.Item label="Short by"> */}
          <Tabs tabBarExtraContent={OperationsSlot} defaultActiveKey="1" onChange={callback}>
          {/* label="Short by"
          ssss */}
          <TabPane tab="All" key="1">
          </TabPane>
          <TabPane tab="Grade " key="2">
          </TabPane>
          <TabPane tab="Medium" key="3">
          </TabPane>
          <TabPane tab="Subject" key="4">
          </TabPane>
          <TabPane tab="Channel" key="5">
          </TabPane>
          <TabPane tab="Day" key="5">
          </TabPane>
          <TabPane tab="Time" key="6">
          </TabPane>

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
    <br/>
      

      <div className="site-card-border-less-wrapper">
        <Row>
          <Col xs={24} xl={6}>
          <Card bordered={false} hoverable style={{ width: 350 }}
          //   cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
             <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
          />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button
              type="primary"
              // onClick={() => {
              //   setRandom(Date.now());
              // }}
            >
              See more
            </Button>
          </Card>
          <br/>
          <Card hoverable style={{ width: 350 }} >
            <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
           />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button type="primary">
              See more
            </Button>
          </Card>
          <br/>
          <Card hoverable style={{ width: 350 }} >
            <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
           />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button type="primary">
              See more
            </Button>
          </Card>
          </Col>
          <Col xs={24} xl={6}>
          <Card hoverable style={{ width: 350 }} >
            <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
           />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button type="primary">
              See more
            </Button>
          </Card>
          <br/>
          <Card hoverable style={{ width: 350 }} >
            <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
           />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button type="primary">
              See more
            </Button>
          </Card>
          </Col>
          <Col xs={24} xl={6}>
          <Card hoverable style={{ width: 350 }} >
            <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
           />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button type="primary">
              See more
            </Button>
          </Card>
          </Col>
          <Col xs={24} xl={6}>
          <Card hoverable style={{ width: 350 }} >
            <Image
            width={300} height={200}
            src="https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg"
           />
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <p>Card content</p>
            <Rate allowHalf defaultValue={2.5} />
            <Button type="primary">
              See more
            </Button>
          </Card>
          </Col>
        </Row>
      </div>

    </Content>  
    

    </Content>
    // </ContentLayout>
  );
}
