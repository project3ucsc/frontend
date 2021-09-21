import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Timeline, List, message } from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined } from "@ant-design/icons";
import img1 from "../../img/td11.jpg";
import img2 from "../../img/t4.jpg";
import "../student/dashboard.scss";
import { Link } from "react-router-dom";

//import classroomservice from "services/classroom.service";
//import axios from "axios";
//import { authHeader } from "utils/authheader";
//import { apiurl } from "utils/common";
//import authenticationservice from "services/authentication.service";



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
const subjects = ["Maths", "Chemistry", "Physics", "English", "Biology" , "IT"];
const gridStyle = {
  width: '25%',
  textAlign: 'center',
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

  {/*useEffect(() => {
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
  }, []);*/
}

  return (
    <ContentLayout title="DashBoard" paths={["Home", "Dashboard"]}>
      
      <Row gutter={[10, 0]}>  
        <div className="teacher-header">
              <img style={{ width: 1450, height:200 }} src={img1} alt="img1" />
        </div>
            
      </Row>
      <br />
      <Row gutter={[10, 0]}>
        <Col xs={24} xl={18}>
            <Card title="Your Classes" className="classcard" >
                  {subjects.map((subject, index) => {
                      return (
                        <Link>
                        <Card.Grid
                          key={index}
                          title={subject}
                          style={{ gridStyle, width: 330, margin: 5 }}
                        >
                          {subject}
                        </Card.Grid>
                        </Link>
                      );
                    })}
            </Card>

            <div className="site-card-border-less-wrapper-2">
              <Card
                title="Announcements"
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

        <Col xs={24} xl={6}>

            <Card
                style={{  }}
                cover={
                  <img
                    alt="example"
                    src={img2}
                  />
                }
              >
                <Meta
                  title="InCharge Class"
                  description="Grade Class"
                />
            </Card>,
         
            <Card
              title="Today's Timeline"
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
        </Col>

      </Row>
      {/* </Content> */}
    </ContentLayout>
  );
}


{/*<Card title="Your Classes">
            <div className="card-wrapper-student-dash">
              {tutionClasses.map((item, i) => (
                <Link key={i} to={"/tution/subject/" + item.id}>
                  <Card key={i} hoverable style={{ width: 220 }}>
                    <Meta title={item.name} description={item.tutor} />
                  </Card>
                </Link>
              ))}
            </div>
          </Card>*/}