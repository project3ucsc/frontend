import React from "react";
import { Layout, Row, Col, Calendar,Card } from "antd";
import img1 from "../../img/sysadmin1.png";
import ContentLayout from "components/ContentLayout";
import "./sysadmin.scss";


export default function Dashboard() {
  function onPanelChange(value, mode) {
    console.log(value, mode);
    console.log(img1);
  }

  const { Content } = Layout;
  return (
    <ContentLayout paths={["Home",]}>
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
            <div className= "sysadmin-header">
              <h1>Welcome Admin <img src={img1} alt="img1" /></h1> 
          </div>

          <Card title="Schools">
    
    <Card type="inner" title="School_A" 
    //extra={<a href="#">More</a>}
    >
      Principle : ABC
    </Card>


    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="School_B"
      //extra={<a href="#">More</a>}
    >
     Principle : Lakshan 
    </Card>

    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="School_C"
      //extra={<a href="#">More</a>}
    >
     Principle : Malaka 
    </Card>  
  </Card>


          </Col>

          <Col xs={24} xl={6}>
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
