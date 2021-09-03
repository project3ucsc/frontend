import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  List,
  Timeline,
  Card,
  message,
  Badge,
  Spin,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined } from "@ant-design/icons";
import "./physics.scss";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";
import { getLearnMatUrl } from "services/azureblob.service";
import { getResourceIcon } from "components/Resources";
import { getDateTxt, getDaybyNumber } from "utils/common";

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};
const meetingcardstyle = {
  marginBottom: 10,
  marginRight: 10,
  height: 194,
  minHeight: 100,
};

export default function Subpage() {
  const [learnMats, setLearnMats] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  let { sdid } = useParams();

  useEffect(() => {
    setLoading(true);

    subjectdetailservice
      .getSubDetailAllDataforStudent(sdid)
      .then((data) => {
        setLoading(false);

        setTitle(data.subject.name);
        setLearnMats(data.resource_section);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [sdid]);

  return (
    <ContentLayout title={title} paths={["Home", title]}>
      <Row>
        <Col xs={24} xl={16}>
          <Card
            title="Online lessons"
            className="lesson-card"
            style={meetingcardstyle}
          >
            <ul class="ant-list-items">
              <li class="ant-list-item" style={{ padding: 0 }}>
                {!loading && <MeetingUrl sdid={sdid} />}
              </li>
            </ul>
          </Card>
          <Card title="My Lessons" className="lessoncard" style={cstyle}>
            {learnMats.map((section) => {
              return (
                <List
                  key={section.id}
                  style={{ textAlign: "left" }}
                  header={<div>{section.name}</div>}
                  bordered
                  dataSource={section.resource_details}
                  renderItem={(item) => (
                    <List.Item>
                      <a
                        href={
                          item.type !== "link"
                            ? getLearnMatUrl(item.filename)
                            : item.filename
                        }
                        className="linkspan"
                      >
                        {getResourceIcon(item.type)} {item.name}
                      </a>
                    </List.Item>
                  )}
                />
              );
            })}
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

export function MeetingUrl({ sdid }) {
  const today = new Date();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    subjectdetailservice
      .getMeetingDetailsforStudent(sdid, today.getDay())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  // const lastupdated = new Date(data.lastupdated);
  return !loading ? (
    <Badge.Ribbon
      text={`${getDaybyNumber(data.weekday)} ${getDateTxt(
        data.period_time.starttime,
        data.period_time.endtime,
        "h12"
      )}`}
      placement="start"
    >
      <Col xs={24} className="meetingUrlcol">
        <Row style={{ marginBottom: 30 }}></Row>
        <Row>
          <Col sm={12}>
            <a href={data.meetingurl} class="linkspan">
              Go to Link
            </a>
          </Col>
          <Col sm={12}>
            <p style={{ float: "right" }}>
              Last updated : {new Date(data.lastupdated).toLocaleDateString()}
            </p>
          </Col>
        </Row>
      </Col>
    </Badge.Ribbon>
  ) : (
    <Spin />
  );
}
