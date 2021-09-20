
import React from "react";
import { Layout, Row, Col } from "antd";
import { Form, Input, Button, Select, DatePicker,TimePicker, Space } from "antd";
import ContentLayout from "components/ContentLayout";
import { Tabs } from 'antd';




export default function StudentPaymentDetails() {
  const { Content } = Layout;
 

  return (
    <ContentLayout title="Student Payment Details" paths={["Home", "Dashboard","ClassDetails","StudentPaymentDetails"]}>
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


          

            
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
