import React from "react";
import { Layout, Row, Col, Card } from "antd";
import ContentLayout from "components/ContentLayout";

import SideBar from "components/SideBars/StudentSideBar";
export default function Dashboard() {
  const subjects = ["Maths", "Chemistry", "Physics", "English"];

  const { Content } = Layout;
  return (
    <Layout>
      <SideBar />

      <ContentLayout paths={["Home", "Dashboard"]}>
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
              <div className="card-wrapper">
                {subjects.map((subject, index) => {
                  return (
                    <Card
                      key={index}
                      title={subject}
                      style={{ width: 350, margin: 5 }}
                    >
                      {subject}
                    </Card>
                  );
                })}
              </div>
            </Col>
            <Col xs={24} xl={6}>
              sdgsdg
            </Col>
          </Row>
        </Content>
      </ContentLayout>
    </Layout>
  );
}
