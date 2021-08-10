import React, { useState } from "react";
import { Row, Col, Button, List, Menu, Dropdown, Card } from "antd";
import ContentLayout from "components/ContentLayout";
import {
  DownOutlined,
  FilePdfTwoTone,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./subpage.scss";

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

export default function SubPage() {
  const [learnMats, setLearnMats] = useState([data2, data3]);

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
                      <span>
                        <Button
                          size="small"
                          type="primary"
                          onClick={(e) => console.log(e)}
                        >
                          <EditOutlined />
                        </Button>

                        <Button
                          size="small"
                          type="default"
                          onClick={() => console.log("sdvsdv")}
                        >
                          <EyeInvisibleOutlined />
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          disabled
                          onClick={() => console.log("sdvsdv")}
                        >
                          <EyeOutlined />
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          danger
                          onClick={() => console.log("sdvsdv")}
                        >
                          <DeleteOutlined />
                        </Button>
                      </span>
                    </List.Item>
                  )}
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
