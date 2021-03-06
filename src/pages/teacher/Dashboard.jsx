import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Timeline, List, message } from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined } from "@ant-design/icons";
import img1 from "../../img/td11.jpg";
import img2 from "../../img/t4.jpg";
import "../student/dashboard.scss";
import { Link } from "react-router-dom";
import TeacherTimleline from "components/TeacherTimleline";
import classroomservice from "services/classroom.service";

//import classroomservice from "services/classroom.service";
//import axios from "axios";
//import { authHeader } from "utils/authheader";
//import { apiurl } from "utils/common";
//import authenticationservice from "services/authentication.service";

var adata = [
  {
    title: "Tuesday break",
    dis: "There will not be any academic activities on next Tuesday",
  },
  {
    title: "Meeting for all teachers",
    dis: "Please participate for the tomorrow meeting which will e held on tomorrow 10.00am to 11.00am",
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
const subjects = ["Maths", "Chemistry", "Physics", "English", "Biology", "IT"];
const gridStyle = {
  width: "25%",
  textAlign: "center",
};
const cstyle = {
  padding: 10,
  margin: "10px 0",
  marginBottom: 0,
  minHeight: 280,
};

export default function Dashboard() {
  const [schoolSubs, setSchoolSubs] = useState([]);
  const [tutionClasses, setTutionClasses] = useState([]);
  const [classroonName, setClassroonName] = useState("");

  useEffect(() => {
    classroomservice
      .getSubDetailsforTeacher()
      .then((data) => {
        setSchoolSubs(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <ContentLayout title="DashBoard" paths={["Home", "Dashboard"]}>
      <Row gutter={[10, 0]}>
        <Col xs={24}>
          <img
            style={{ width: "100%", height: 200, objectFit: "cover" }}
            src={img1}
            alt="img1"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={[10, 0]}>
        <Col xs={24} xl={18}>
          <Card title="Your Classes" className="classcard">
            <div className="card-wrapper-student-dash">
              {schoolSubs.map((item, i) => (
                <Link key={i} to={"/subject/" + item.id}>
                  <Card hoverable style={{ width: 180 }}>
                    <Meta
                      description={`${item.subject.name}`}
                      title={`${item.classroom.grade}-${item.classroom.name}`}
                    />
                  </Card>
                </Link>
              ))}
            </div>
          </Card>

          <div className="site-card-border-less-wrapper-2">
            <Card title="Announcements" className="anncard" style={cstyle}>
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
                      title={item.title}
                      description={item.dis}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>

        <Col xs={24} xl={6}>
          {localStorage.getItem("tclsname") && (
            <Link to="classincharge">
              <Card
                style={{ marginBottom: 10 }}
                cover={<img alt="example" src={img2} />}
              >
                <Meta
                  title="InCharge Class"
                  description={localStorage.getItem("tclsname")}
                />
              </Card>
            </Link>
          )}
          <TeacherTimleline />
        </Col>
      </Row>
      {/* </Content> */}
    </ContentLayout>
  );
}

{
  /*<Card title="Your Classes">
            <div className="card-wrapper-student-dash">
              {tutionClasses.map((item, i) => (
                <Link key={i} to={"/tution/subject/" + item.id}>
                  <Card key={i} hoverable style={{ width: 220 }}>
                    <Meta title={item.name} description={item.tutor} />
                  </Card>
                </Link>
              ))}
            </div>
          </Card>*/
}
