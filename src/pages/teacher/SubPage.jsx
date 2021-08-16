import React, { useState } from "react";
import { Row, Col, Button, List, Menu, Dropdown, Card } from "antd";
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
  const [sections, setSections] = useState(data.map((d) => d.id));
  const datamap = new Map();
  data.forEach((d) => {
    datamap.set(d.id, { title: d.title, data: d.data });
  });

  const deleteSection = (id) => {
    console.log(id);
    //delete call to backend

    // update
    setSections(sections.filter((sec) => sec !== id));
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
          <Card title="My Lessons" className="lessoncard" style={cstyle}>
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
                  key={i}
                  sectionid={sec}
                  deleteSection={deleteSection}
                  data={datamap.get(sec)}
                />
              );
            })}

            {/* <List
              style={{ textAlign: "left" }}
              header={<div>Thermal physics</div>}
              bordered
              dataSource={data3}
              renderItem={(item) => (
                <List.Item>
                  <span className="linkspan">
                    <FilePdfTwoTone twoToneColor="#cf1322" /> {item}
                  </span>
                  <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <Button type="link">
                      Options
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                </List.Item>
              )}
            /> */}
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
}
