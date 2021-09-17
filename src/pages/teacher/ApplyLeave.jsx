import React from "react";
import { Layout, Row, Col, Tabs } from "antd";
import ContentLayout from "components/ContentLayout";
import ShortLeaveForm from "components/ShortLeaveForm";
import LongLeaveForm from "components/LongLeaveForm";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function ApplyLeave() {
  function onTabChange(key) {
    console.log(key);
  }

  return (
    <ContentLayout title="Apply for Leaves" paths={["Home", "ApplyLeaves"]}>
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
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
              <TabPane tab="Short Leave" key="1">
                <ShortLeaveForm />
              </TabPane>
              <TabPane tab="Long Leave" key="2">
                <LongLeaveForm />
              </TabPane>
            </Tabs>
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
