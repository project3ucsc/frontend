import React, { useEffect, useState } from "react";
import { Row, Col, Button, List, Timeline, Card } from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined, FilePdfTwoTone } from "@ant-design/icons";
import "./physics.scss";
import { useParams } from "react-router-dom";

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};

const data1 = [
  "Zoom link for upcoming lesson  -  2020/07/19 - 9.10AM to 10.30AM",
];

const data2 = [
  {
    name: "Motion in the same direction.pdf",
    link: "http://localhost:3000/subject",
  },
  {
    name: "Motion in the opposite direction.pdf",
    link: "http://localhost:3000/subject",
  },
  { name: "Motion video lesson", link: "http://localhost:3000/subject" },
];

const data3 = [
  { name: "Expansions of solid.pdf", link: "http://localhost:3000/subject" },
  {
    name: "Relationship between linear, area and volume expansivities.pdf",
    link: "http://localhost:3000/subject",
  },
  {
    name: "Volume expansion of liquids video lesson",
    link: "http://localhost:3000/subject",
  },
];

export default function Subpage() {
  const [learnMats, setLearnMats] = useState([data2, data3]);
  const [title, setTitle] = useState("");
  let { sdid } = useParams();
  useEffect(() => {
    // subjectdetailservice
    // .getSubDetailAllDataforTeacher(sdid)
    // .then((data) => {
    //   setTitle(
    //     `${data.classroom.grade}-${data.classroom.name} ${data.subject.name}`
    //   );
    //   setLearnMats(data.resource_section);
    //   console.log(data);
    // })
    // .catch((e) => {
    //   message.error(e.message);
    // });
  }, [sdid]);
  console.log(sdid);
  return (
    <ContentLayout title={title} paths={["Home", title]}>
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

            {learnMats.map((learnmat, i) => {
              return (
                <List
                  key={i}
                  style={{ textAlign: "left" }}
                  header={<div>Mechanics</div>}
                  bordered
                  dataSource={learnmat}
                  renderItem={(item) => (
                    <List.Item>
                      <a href={item.link} className="linkspan">
                        <FilePdfTwoTone twoToneColor="#cf1322" /> {item.name}
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
