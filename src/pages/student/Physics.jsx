import React from "react";
import { Row, Col, Button, Divider, List, Timeline, Card } from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined, FilePdfTwoTone } from "@ant-design/icons";

import "./physics.scss";

export default function Physics() {
  const cstyle = {
    marginBottom: 0,
    marginRight: 10,
    minHeight: 280,
  };

  const data1 = [
    "Zoom link for upcoming lesson  -  2020/07/19 - 9.10AM to 10.30AM",
  ];

  const data2 = [
    "Motion in the same direction.pdf",
    "Motion in the opposite direction.pdf",
    "Motion video lesson",
  ];

  const data3 = [
    "Expansions of solid.pdf",
    "Relationship between linear, area and volume expansivities.pdf",
    "Volume expansion of liquids video lesson",
  ];

  return (
    <ContentLayout title="Physics" paths={["Home", "Physics"]}>
      {/* <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 700,
          }}
        > */}

      <Row>
        <Col xs={24} xl={16}>
          <Card title="My Lessons" className="lessoncard" style={cstyle}>
            <List
              header={<div>Upcoming lesson</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <span className="linkspan">{item}</span>
                </List.Item>
              )}
            />
            <br />
            <List
              style={{ textAlign: "left" }}
              header={<div>Mechanics</div>}
              bordered
              dataSource={data2}
              renderItem={(item) => (
                <List.Item>
                  <span className="linkspan">
                    <FilePdfTwoTone twoToneColor="#cf1322" /> {item}
                  </span>
                </List.Item>
              )}
            />

            <br />
            <List
              style={{ textAlign: "left" }}
              header={<div>Thermal physics</div>}
              bordered
              dataSource={data3}
              renderItem={(item) => (
                <List.Item>
                  <span className="linkspan">
                    <FilePdfTwoTone twoToneColor="#cf1322" /> {item}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* <Col xl={1}></Col> */}

        <Col xs={24} xl={8}>
          <Card title="Timeline" className="timelinecard" style={cstyle}>
            {/* <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: "#ffffff",
                    }} 
                >*/}
            <Timeline>
              <Timeline.Item>
                <Button type="link">Thermal physics lesson 7</Button> 2021-09-01
              </Timeline.Item>
              <Timeline.Item>
                <Button type="link">Thermal physics quiz 2</Button> 2021-09-06
              </Timeline.Item>
              <Timeline.Item
                dot={<ClockCircleOutlined className="timeline-clock-icon" />}
                color="red"
              >
                <Button type="link">Electronic Lesson 1</Button> 2021-09-10
              </Timeline.Item>
              <Timeline.Item>
                <Button type="link">Electronic quiz 1</Button> 2015-09-01
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
}
