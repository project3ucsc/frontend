import React from "react";
import { Layout, Row, Col } from "antd";
import ContentLayout from "components/ContentLayout";

export default function TimeSlotManagePage() {
  const { Content } = Layout;
  return (
    <ContentLayout
      title="TimeSlot Management"
      paths={["SchoolAdmin", "Dashboard"]}
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
            1
          </Col>
          <Col xs={24} xl={6}>
            2
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
