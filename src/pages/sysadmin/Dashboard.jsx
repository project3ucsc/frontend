import React from "react";
import { Layout, Row, Col, Card, Button, Statistic } from "antd";
import img1 from "../../img/sysadmin1.png";
import ContentLayout from "components/ContentLayout";
import "./sysadmin.scss";

export default function Dashboard() {
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
          <Col xs={24} xl={24}>
            <div className="sysadmin-header">
              <h1>
                Welcome Admin <img src={img1} alt="img1" />
              </h1>
            </div>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="Active Principles" value={5} />
              </Col>
              <Col span={6}>
                <Statistic title="Active Teachers" value={245} />
              </Col>
              <Col span={6}>
                <Statistic title="Active Students" value={745} />
              </Col>
              <Button style={{ marginTop: 16 }} type="primary">
                View Performance
              </Button>
            </Row>
            ,
            <Card title="Knowladge Hub School List">
              <Card
                type="inner"
                title="School_A"
                extra={<Button type="link">More</Button>}
              >
                Principle : ABC
              </Card>

              <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="School_B"
                extra={<Button type="link">More</Button>}
              >
                Principle : Lakshan
              </Card>

              <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="School_C"
                extra={<Button type="link">More</Button>}
              >
                Principle : Malaka
              </Card>
            </Card>
          </Col>

          {/* <Col xs={24} xl={6}>
            <>
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                action={
                  <Button size="small" type="text">
                    View
                  </Button>
                }
                closable
              />

              <Alert
                message="Success Tips"
                type="success"
                showIcon
                action={
                  <Button size="small" type="text">
                    View
                  </Button>
                }
                closable
              />
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                action={
                  <Button size="small" type="text">
                    View
                  </Button>
                }
                closable
              />

              <Alert
                message="3 new Education programmes on the process stage."
                type="warning"
                action={
                  <Space>
                    <Button size="small" type="ghost">
                      Done
                    </Button>
                  </Space>
                }
                closable
              />
              <Alert
                message="Info Text"
                description="Information about newly added schools"
                type="info"
                action={
                  <Space direction="vertical">
                    <Button size="small" type="primary">
                      View
                    </Button>
                    <Button size="small" danger type="ghost">
                      Decline
                    </Button>
                  </Space>
                }
                closable
              />
            </>
            ,
            <Button type="primary" onClick={openNotification}>
              Open the notification box
            </Button>
          </Col> */}
        </Row>
      </Content>
    </ContentLayout>
  );
}
