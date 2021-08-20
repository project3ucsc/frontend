import React, { useEffect, useState } from "react";
import { Row, Col, Button, List, Timeline, Card, message } from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined, FilePdfTwoTone } from "@ant-design/icons";
import "./physics.scss";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";
import { getLearnMatUrl } from "services/azureblob.service";
import { getResourceIcon } from "components/Resources";
const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};

const data1 = [
  "Zoom link for upcoming lesson  -  2020/07/19 - 9.10AM to 10.30AM",
];

export default function Subpage() {
  const [learnMats, setLearnMats] = useState([]);
  const [title, setTitle] = useState("");
  let { sdid } = useParams();
  useEffect(() => {
    subjectdetailservice
      .getSubDetailAllDataforStudent(sdid)
      .then((data) => {
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
