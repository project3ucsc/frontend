import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  List,
  Menu,
  Dropdown,
  Card,
  Form,
  Input,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
import {
  DownOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./subpage.scss";
import LearnMatSection from "components/teacher/LearnMatSection";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";

const menu = (
  <Menu>
    <Menu.Item onClick={(e) => console.log(e)}>
      <EditOutlined /> Edit
    </Menu.Item>
    <Menu.Item onClick={() => console.log("sdvsdv")}>
      <DeleteOutlined /> Delete
    </Menu.Item>
    <Menu.Item onClick={() => console.log("sdvsdv")}>
      <EyeInvisibleOutlined /> Hide
    </Menu.Item>
    <Menu.Item disabled onClick={() => console.log("sdvsdv")}>
      <EyeInvisibleOutlined /> Unhide
    </Menu.Item>
  </Menu>
);

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};

const data1 = [
  "Zoom link for upcoming lesson  -  2020/07/19 - 9.10AM to 10.30AM",
];

// const data2 = [
//   {
//     id: 1,
//     name: "Motion in the same direction.pdf",
//     link: "http://localhost:3000/subject",
//   },
//   {
//     id: 2,
//     name: "Motion in the opposite direction.pdf",
//     link: "http://localhost:3000/subject",
//   },
//   { id: 3, name: "Motion video lesson", link: "http://localhost:3000/subject" },
// ];

// const data3 = [
//   {
//     id: 1,
//     name: "Expansions of solid.pdf",
//     link: "http://localhost:3000/subject",
//   },
//   {
//     id: 2,
//     name: "Relationship between linear, area and volume expansivities.pdf",
//     link: "http://localhost:3000/subject",
//   },
//   {
//     id: 3,
//     name: "Volume expansion of liquids video lesson",
//     link: "http://localhost:3000/subject",
//   },
// ];

export default function SubPage() {
  const [sections, setSections] = useState([]);
  const [title, setTitle] = useState("");
  let { sdid } = useParams();
  useEffect(() => {
    subjectdetailservice
      .getSubDetailAllDataforTeacher(sdid)
      .then((data) => {
        setTitle(
          `${data.classroom.grade}-${data.classroom.name} ${data.subject.name}`
        );
        setSections(data.resource_section);
        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [sdid]);

  const deleteSection = async (id) => {
    //delete call to backend
    await subjectdetailservice.deleteResouceSection(id);
    // update ui
    setSections(sections.filter((sec) => sec.id !== id));
  };
  const addSection = async ({ title }) => {
    try {
      //add call to backend
      const newsection = await subjectdetailservice.addResouceSection(
        sdid,
        title
      );
      const secid = newsection.id;
      // update ui
      setSections([
        ...sections,
        { id: secid, name: title, resource_details: [] },
      ]);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <ContentLayout title={title} paths={["Home", title]}>
      <Row>
        <Col xs={24}>
          <Card title="My Lessons" className="lesson-card" style={cstyle}>
            <List
              header={<div>Upcoming lesson</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <span className="linkspan">{item}</span>
                  <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <Button type="link">
                      Options
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                </List.Item>
              )}
            />
            <br />

            {sections.map((sec, i) => {
              return (
                <LearnMatSection
                  key={sec.id}
                  // sectionid={sec}
                  deleteSection={deleteSection}
                  section={sec}
                />
              );
            })}

            <Card title="Add new section">
              <Form onFinish={addSection} layout="inline">
                <Form.Item name="title" label="Section Title">
                  <Input style={{ width: "auto" }} placeholder="Enter title" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
}
