import React, { useState } from "react";
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

const data2 = [
  {
    id: 1,
    name: "Motion in the same direction.pdf",
    link: "http://localhost:3000/subject",
  },
  {
    id: 2,
    name: "Motion in the opposite direction.pdf",
    link: "http://localhost:3000/subject",
  },
  { id: 3, name: "Motion video lesson", link: "http://localhost:3000/subject" },
];

const data3 = [
  {
    id: 1,
    name: "Expansions of solid.pdf",
    link: "http://localhost:3000/subject",
  },
  {
    id: 2,
    name: "Relationship between linear, area and volume expansivities.pdf",
    link: "http://localhost:3000/subject",
  },
  {
    id: 3,
    name: "Volume expansion of liquids video lesson",
    link: "http://localhost:3000/subject",
  },
];

const data = [
  { id: 1, title: "Mechanics", data: data2 },
  { id: 2, title: "Themals", data: data3 },
  { id: 3, title: "Test", data: data2 },
];
export default function SubPage() {
  const [sections, setSections] = useState(data);

  const deleteSection = async (id) => {
    console.log(id);

    //delete call to backend

    // update ui
    setSections(sections.filter((sec) => sec.id !== id));
  };

  const addSection = ({ title }) => {
    //add call to backend

    const secid = Math.floor(Math.random() * 100 + 4);
    // update ui
    setSections([...sections, { id: secid, title: title, data: [] }]);
  };
  return (
    <ContentLayout title="Physics" paths={["Home", "Physics"]}>
      {/* <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 700,
          }}
        > */}

      <Row>
        <Col xs={24}>
          <Card title="My Lessons" style={cstyle}>
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
                  data={sec}
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
