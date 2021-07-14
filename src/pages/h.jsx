// import React from "react";
// import { Layout,Card,Image,Rate,PageHeader, Button, Descriptions,Tabs ,Row,Col,Input,Space  } from "antd";
// import ContentLayout from "components/ContentLayout";

// export default function Home() {
//   const { Content } = Layout;
//   const { TabPane } = Tabs;
//   const { Search } = Input;
  
//   const onSearch = value => console.log(value);
//   //const [random, setRandom] = React.useState();

//   function callback(key) {
//     console.log(key);
//   }

//   return (
//     <ContentLayout paths={["Home"]}>

//     <Content
//         className="site-layout-background"
//         style={{
//           padding: 24,
//           margin: 0,
//           minHeight: 280,
//         }}
//     >

// <div className="site-page-header-ghost-wrapper">
//     <PageHeader
//        //ghost={false}
//       //onBack={() => window.history.back()}
//       title="Free Educational Programs"
//       // subTitle="This is a subtitle"

      
//       extra={[
//         <Search  style={{ width: 500 }}
//           placeholder="input search text"
//           allowClear
//           enterButton="Search"
//           size="large"
//           onSearch={onSearch}
//         />
//         // <Button key="3">Operation</Button>,
//         // <Button key="2">Operation</Button>,
//         // <Button key="1" type="primary">
//         //   Primary
//         // </Button>,
//       ]}
//     >
//       {/* <Space direction="horizontal"> */}
//       <Tabs defaultActiveKey="3" onChange={callback}>
//         <TabPane tab="All" key="1">
//           {/* Content of Tab Pane 1 */}
//         </TabPane>
//         <TabPane tab="Youtube Series " key="2">
    
//         </TabPane>
//         <TabPane tab="TV Programs" key="3">
          
//         </TabPane>
//         <TabPane tab="Radio Programs" key="4">
          
//         </TabPane>
        
//       </Tabs>
       
      
//       {/* </Space> */}
//       <Button key="3">Operation</Button>
//          <Button key="2">Operation</Button>
//          <Button key="1" type="primary">
//            Primary
//         </Button>
//       <Descriptions size="small" column={3}>
//         <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
//         <Descriptions.Item label="Association">
//           {/* <a>421421</a> */}
//         </Descriptions.Item>
//         <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
//         <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
//         <Descriptions.Item label="Remarks">
//           Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
//         </Descriptions.Item>
//       </Descriptions>
//     </PageHeader>
//   </div>  
  


//       {/* <Content
//         className="site-layout-background"
//         style={{
//           padding: 24,
//           margin: 0,
//           minHeight: 280,
//         }}
//       > */}
//         {/* bla */}
//         {/* <div className="site-card-border-less-wrapper"> */}
//         <Row>
//           <Col xs={24} xl={6}>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             {/* <Rate allowHalf defaultValue={2.5} />
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button> */}
//           </Card>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             <p>Card content</p>
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button>
//           </Card>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             {/* <Rate allowHalf defaultValue={2.5} />
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button> */}
//           </Card>
//           </Col>
//           <Col xs={24} xl={6}>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             <p>Card content</p>
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button>
//           </Card>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             <p>Card content</p>
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button>
//           </Card>
//           </Col>
//           <Col xs={24} xl={6}>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             <p>Card content</p>
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button>
//           </Card>
//           </Col>
//           <Col xs={24} xl={6}>
//           <Card  bordered={false} style={{ width: 300 }} >
//           <Image
//             width={300} height={200}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//             <p>Card content</p>
//             <p>Card content</p>
//             <Button
//               type="primary"
//               // onClick={() => {
//               //   setRandom(Date.now());
//               // }}
//             >
//               See more
//             </Button>
//           </Card>
//           </Col>
//         </Row>

          
//         {/* </div> */}
//       </Content>
//     </ContentLayout>
//   );
// }
