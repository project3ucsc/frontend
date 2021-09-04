import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Tabs, message, Spin } from "antd";
import ContentLayout from "components/ContentLayout";
import TimeTableBig from "components/TimeTableBig";
import TimeTableSm from "components/TimeTableSm";
import timeslotservice from "services/timeslot.service";
import { getClassName } from "utils/common";

const { TabPane } = Tabs;

const { Content } = Layout;
export default function StudentTimeTable() {
  const [loading, setLoading] = useState(true);
  const [tsdata, setTsdata] = useState([]);

  useEffect(() => {
    setLoading(true);
    timeslotservice
      .getTimeSlotsForStudent()
      .then((data) => {
        setTsdata(data);
        setLoading(false);
        console.log(data);
      })
      .catch((e) => {
        setLoading(false);
        message.error(e.message);
      });
  }, []);

  return (
    <ContentLayout
      title={"Timetable " + getClassName()}
      paths={["Home", "Timetable"]}
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
          <Col xs={24} xl={24}>
            {!loading &&
              (window.innerWidth > 768 ? (
                <TimeTableBig data={tsdata} />
              ) : (
                <Tabs defaultActiveKey="1" centered>
                  <TabPane tab="Mon" key="1">
                    <TimeTableSm data={tsdata} day={1} />
                  </TabPane>
                  <TabPane tab="Tue" key="2">
                    <TimeTableSm data={tsdata} day={2} />
                  </TabPane>
                  <TabPane tab="Wed" key="3">
                    <TimeTableSm data={tsdata} day={3} />
                  </TabPane>
                  <TabPane tab="Thu" key="4">
                    <TimeTableSm data={tsdata} day={4} />
                  </TabPane>
                  <TabPane tab="Fri" key="5">
                    <TimeTableSm data={tsdata} day={5} />
                  </TabPane>
                </Tabs>
              ))}
            {loading && <Spin size="large" />}
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
