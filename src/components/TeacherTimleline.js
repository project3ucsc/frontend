import React, { useEffect, useState } from "react";
import { Tabs, message, Spin, Timeline, Tag, Card } from "antd";
import timeslotservice from "services/timeslot.service";
import { spinStyle } from "utils/common";
import { Link } from "react-router-dom";
import "./TeacherTimleline.scss";
const { TabPane } = Tabs;

export default function TeacherTimleline() {
  const [loading, setLoading] = useState(true);
  const [tsdata, setTsdata] = useState([]);
  const today = new Date();

  useEffect(() => {
    setLoading(true);
    timeslotservice
      .getTimeSlotsForTeacher()
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
    <div>
      {!loading && (
        <Card title="Teacher Timeline" className="teacard" style={{}}>
          <Tabs
            className="teachertimetab"
            defaultActiveKey={today.getDay()}
            centered
          >
            <TabPane tab="Mon" key="1">
              <DayTimleline data={tsdata} day={1} />
            </TabPane>
            <TabPane tab="Tue" key="2">
              <DayTimleline data={tsdata} day={2} />
            </TabPane>
            <TabPane tab="Wed" key="3">
              <DayTimleline data={tsdata} day={3} />
            </TabPane>
            <TabPane tab="Thu" key="4">
              <DayTimleline data={tsdata} day={4} />
            </TabPane>
            <TabPane tab="Fri" key="5">
              <DayTimleline data={tsdata} day={5} />
            </TabPane>
          </Tabs>
        </Card>
      )}
      {loading && <Spin {...spinStyle} size="large" />}
    </div>
  );
}

export function DayTimleline({ data, day }) {
  const daydata = data.filter((d) => d.day === day);
  return (
    <Timeline mode="right" style={{ marginTop: 10 }}>
      {daydata.map((item) => (
        <Timeline.Item label={<Tag color="geekblue">{item.time}</Tag>}>
          <Link to={"/subject/" + item.sdid}>
            {/* <div className="tl-item"> */}
            <Tag color="blue">{item.name}</Tag>

            {/* </div> */}
          </Link>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
