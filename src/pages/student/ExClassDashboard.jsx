import React from "react";
import { Row, Col, Card, Calendar, PageHeader, List,Timeline,Button } from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined } from "@ant-design/icons";
import "./exclassdashboard.scss";

const cstyle = {
  padding: 24,
  margin: 10,
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

export default function ExClassDashboard() {
  //const subjects = ["Maths", "Chemistry", "Physics", "English"];

  //const { Content } = Layout;
  const { Meta } = Card;

  const subjects = [
    { _id: "1", name: "Com. Maths", teacher: "Mr. M.T. Premarathna", rate: 3 },
    { _id: "2", name: "Physics", teacher: "Mr. Nimal Perea", rate: 2.5 },
    {
      _id: "3",
      name: "Chemistry",
      teacher: "E-thaksalawa",
      title: "Mrs. Nimali Sandamini",
      rate: 3,
    },
  ];
  return (
    <ContentLayout title="DashBoard" paths={["Home", "Dashboard", "Extra-Classes Dashboard"]}>
      {/* <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 1280,
          backgroundColor:"#ffffff",
        }}
      > */}
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="page-header-1"
          style={{ height: 70 }}
          //ghost={false}

          title="Good Afternoon Lakshan! Today will be a busy day for you..."
        >
          <br />
        </PageHeader>
      </div>

      <Row>
        <Col xs={24} xl={16}>
          <div className="card-wrapper-student-dash">
            {subjects.map((item, i) => (
              <Card key={i} hoverable style={{ width: 300 }}>
                <Meta title={item.name} description={item.teacher} />
              </Card>
            ))}
          </div>

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
                        <a href="http://localhost:3000/exclassdashboard">
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
        <Col xs={24} xl={8}>
          <div className="site-card-border-less-wrapper">
            {/* <Card style={{ width: 370, height: 450 }}>
              <p>Card content</p>

              <div className="site-calendar-demo-card">
                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </Card> */}
            <Card title="Timeline" className="timelinecard" style={cstyle}>
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
          </div>

          <br />
          {/* <div className="site-card-border-less-wrapper-2-right">
            <Card
              title="Upcoming Events"
              className="teachercard"
              style={cstyle}
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
                        <a href="http://localhost:3000/exclassdashboard">
                          {item.title}
                        </a>
                      }
                      description={item.dis}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div> */}
        </Col>
      </Row>
      {/* </Content> */}
    </ContentLayout>
  );
}

