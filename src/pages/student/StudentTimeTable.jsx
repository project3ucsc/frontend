import React from "react";
import { Layout, Row, Col, Card } from "antd";
import ContentLayout from "components/ContentLayout";

export default function StudentTimeTable() {
  const subjects = ["Maths", "Chemistry", "Physics", "English"];

  const { Content } = Layout;
  return (
    <ContentLayout title="TImetable" paths={["Home", "timetable"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={18}></Col>
          <Col xs={24} xl={6}>
            sdgsdg
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
