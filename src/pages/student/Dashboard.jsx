import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Timeline,
  List,
  message,
  PageHeader,
  Calender,
} from "antd";

import ContentLayout from "components/ContentLayout";
//import { PlusOutlined } from "@ant-design/icons";
import { ClockCircleOutlined } from "@ant-design/icons";

import "./dashboard.scss";

import img1 from "../../img/student_cover1.jpg";

import classroomservice from "services/classroom.service";
import { Link } from "react-router-dom";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";
const { Meta } = Card;
const cstyle = {
  padding: 10,
  margin: "10px 0",
  marginBottom: 0,
  minHeight: 280,
};

var adata = [
  {
    title: "Tuesday break",
    dis: "There will not be any academic activities on next Tuesday",
  },
  {
    title: "Activity change",
    dis: "There will not be any lessons, assignments or activities on tomorrow in the 10.00am - 11.00am time slot",
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

export default function Dashboard() {
  const today = new Date();

  const [schoolSubs, setSchoolSubs] = useState([]);
  const [tutionClasses, setTutionClasses] = useState([]);
  const [classroonName, setClassroonName] = useState("");
  const [assTimelinedata, setAssTimelinedata] = useState([]);
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
    // for tution
    axios
      .get(`${apiurl}/tutor/studenttution/${userid}`, authHeader())
      .then((res) => {
        setTutionClasses(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });

    // for assTimeline
    axios
      .get(`${apiurl}/assmnt/timeline/${userid}`, authHeader())
      .then((res) => {
        setAssTimelinedata(res.data);
        console.log(res.data);
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
                <Link key={i} to={"/subject/" + item.id}>
                  <Card hoverable style={{ width: 180 }}>
                    <Meta
                      title={item.subject.name}
                      description={item.teacher.username}
                    />
                  </Card>
                </Link>
              ))}
            </div>
          </Card>

          <Card title="Extra Private Classes">
            <div className="card-wrapper-student-dash">
              {tutionClasses.map((item, i) => (
                <Link key={i} to={"/tution/subject/" + item.id}>
                  <Card key={i} hoverable style={{ width: 220 }}>
                    <Meta title={item.name} description={item.tutor} />
                  </Card>
                </Link>
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
            className="timeld"
            style={{ marginBottom: 10 }}
          >
            <Timeline>
              {assTimelinedata.map((item) => {
                let duedate = new Date(item.duedate);
                let tprops =
                  today > duedate
                    ? {
                        dot: (
                          <ClockCircleOutlined className="timeline-clock-icon" />
                        ),
                        color: "red",
                      }
                    : {};
                return (
                  <Timeline.Item {...tprops}>
                    <Link type="link">{item.title}</Link>{" "}
                    {duedate.toLocaleString()}
                  </Timeline.Item>
                );
              })}
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
