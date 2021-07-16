import React, { useState } from "react";
import { Layout, Row, Col, Card, Tabs } from "antd";
import ContentLayout from "components/ContentLayout";
import TimeTableBig from "components/TimeTableBig";
import TimeTableSm from "components/TimeTableSm";

const { TabPane } = Tabs;

const subjects = ["Maths", "Chemistry", "Physics", "English"];
const data = [
  {
    key: 1,
    time: "08.00-09.10",
    mon: subjects[0],
    tue: subjects[0],
    wed: subjects[0],
    thu: subjects[0],
    fri: subjects[0],
  },
  {
    key: 2,
    time: "09.10-10.30",
    mon: subjects[1],
    tue: subjects[1],
    wed: subjects[3],
    thu: subjects[2],
    fri: subjects[3],
  },
  {
    key: 3,
    time: "11.10-12.10",
    mon: subjects[2],
    tue: subjects[3],
    wed: subjects[1],
    thu: subjects[1],
    fri: subjects[2],
  },
  {
    key: 4,
    time: "12.10-13.30",
    mon: subjects[3],
    tue: subjects[2],
    wed: subjects[2],
    thu: subjects[3],
    fri: subjects[1],
  },
];

const { Content } = Layout;
export default function StudentTimeTable() {
  const [width, setwidth] = useState(window.innerWidth);

  return (
    <ContentLayout title="Timetable" paths={["Home", "Timetable"]}>
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
            {window.innerWidth > 768 ? (
              <TimeTableBig data={data} />
            ) : (
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Mon" key="1">
                  <TimeTableSm data={data} day="mon" />
                </TabPane>
                <TabPane tab="Tue" key="2">
                  <TimeTableSm data={data} day="tue" />
                </TabPane>
                <TabPane tab="Wed" key="3">
                  <TimeTableSm data={data} day="wed" />
                </TabPane>
                <TabPane tab="Thu" key="4">
                  <TimeTableSm data={data} day="thu" />
                </TabPane>
                <TabPane tab="Fri" key="5">
                  <TimeTableSm data={data} day="fri" />
                </TabPane>
              </Tabs>
            )}
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
