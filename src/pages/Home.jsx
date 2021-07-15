import React from "react";
import { Layout, Row, Col, Calendar } from "antd";
import img1 from "../img/sysadmin1.png";
import ContentLayout from "components/ContentLayout";
import "./sysadmin/sysadmin.scss";
import Paragraph from "antd/lib/skeleton/Paragraph";

export default function Home() {
  function onPanelChange(value, mode) {
    console.log(value, mode);
    console.log(img1);
  }

  const { Content } = Layout;
  return (
    <ContentLayout paths={["Home"]}>
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
          </Col>

          <Col xs={24} xl={6}>
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            ,
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
