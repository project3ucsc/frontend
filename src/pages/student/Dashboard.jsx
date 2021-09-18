import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Calendar,
  Button,
  Timeline,
  List,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
//import { PlusOutlined } from "@ant-design/icons";
import { ClockCircleOutlined } from "@ant-design/icons";

import "./dashboard.scss";
import classroomservice from "services/classroom.service";
import { Link } from "react-router-dom";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

const cstyle = {
  padding: 10,
  margin: "10px 0",
  marginBottom: 0,
  minHeight: 280,
};

function onPanelChange(value, mode) {
  console.log(value, mode);
}

var adata = [
  {
    title: "Last Chemistry quiz results released",
    dis: "10 hour ago",
    moredis: "Grade 9 mathematics time slot will be changed...",
  },
  {
    title: "Today Com.Maths period will be late for an one hour",
    dis: "22 hour ago",
    moredis: "Grade 9 mathematics time slot will be changed...",
  },
  {
    title: "Next Friday have online quiz for Physics",
    dis: "2 days ago",
    moredis: "Grade 9 mathematics time slot will be changed...",
  },
];

const tdata = [
  {
    title: "Physics",
    dis: "Electronic Quiz 01",
  },
  {
    title: "Chemistry",
    dis: "Carbonic convorsion Q&A",
  },
  {
    title: "General English",
    dis: "Test",
  },
];
const { Meta } = Card;

export default function Dashboard() {
  const [schoolSubs, setSchoolSubs] = useState([]);
  const [tutionClasses, setTutionClasses] = useState([]);
  const [classroonName, setClassroonName] = useState("");

  useEffect(() => {
    let userid = authenticationservice.currentUserValue.id;
    classroomservice
      .getSubDetailsForStudentDash()
      .then((data) => {
        setSchoolSubs(data.subs);
        setClassroonName(
          `(${data.classroom.grade}-${data.classroom.name} classroom)`
        );

        console.log(data);
      })
      .catch((e) => {
        console.log(e.message);
      });

    axios
      .get(`${apiurl}/tutor/studenttution/${userid}`, authHeader())
      .then((res) => {
        setTutionClasses(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  return (
    <ContentLayout title="DashBoard" paths={["Home", "Dashboard"]}>
      {/* <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="page-header-1"
          style={{ height: 70 }}
          //ghost={false}

          title="Good Afternoon Lakshan! Today will be a busy day for you..."
        >
          <br />
        </PageHeader>
      </div> */}

      <Row gutter={[10, 0]}>
        <Col xs={24} xl={18}>
          <Card
            style={{ marginBottom: 10 }}
            title={"Subjects in your school " + classroonName}
          >
            <div className="card-wrapper-student-dash">
              {schoolSubs.map((item, i) => (
                <Card key={i} hoverable style={{ width: 180 }}>
                  <Meta
                    title={item.subject.name}
                    description={item.teacher.username}
                  />
                </Card>
              ))}
            </div>
          </Card>

          <Card title="Extra Private Classes">
            <div className="card-wrapper-student-dash">
              {tutionClasses.map((item, i) => (
                <Card key={i} hoverable style={{ width: 220 }}>
                  <Meta title={item.name} description={item.tutor} />
                </Card>
              ))}
            </div>
          </Card>

          <div className="site-card-border-less-wrapper-2">
            <Card
              title="Announcements"
              // extra={
              //   <Button type="primary">
              //     <PlusOutlined />
              //     Add New
              //   </Button>
              // }
              className="anncard"
              style={cstyle}
            >
              <List
                itemLayout="horizontal"
                dataSource={adata}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      style={{ marginLeft: 10 }}
                      // avatar={
                      //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      // }
                      title={
                        <a href="http://localhost:3000/dashboard">
                          {item.title}
                        </a>
                      }
                      description={item.dis}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>

        <br />
        <Col xs={24} xl={6}>
          {/* <div className="site-card-border-less-wrapper">
            <Card style={{ width: 370, height: 450 }}>
              <p>Card content</p>

              <div className="site-calendar-demo-card">
                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </Card>
          </div> */}
          <Card
            title="Timeline"
            className="timelinecard"
            style={{ marginBottom: 10 }}
          >
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

          <div className="site-card-border-less-wrapper-2-right">
            <Card
              title="Upcoming Events"
              className="teachercard"
              // style={cstyle}
            >
              <List
                itemLayout="horizontal"
                dataSource={tdata}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      style={{ marginLeft: 10 }}
                      // avatar={
                      //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      // }
                      title={
                        <a href="http://localhost:3000/dashboard">
                          {item.title}
                        </a>
                      }
                      description={item.dis}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>
      </Row>
      {/* </Content> */}
    </ContentLayout>
  );
}
