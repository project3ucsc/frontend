import React from "react";
import {
  Layout,
  Row,
  Col,
  List,
  Avatar,
  Modal,
  Button,
  Switch,
  Tag,
  Divider,
  Card,
  Input,
  Space,
  Table,
  Progress,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { useState } from "react";
import "./teacherAnalys.scss";
const { Search } = Input;
const { Column, ColumnGroup } = Table;

// const { TabPane } = Tabs;

export default function TeacherAnalys() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onSearch = (value) => console.log(value);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //switch
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  const { Content } = Layout;

  return (
    <ContentLayout title="Teacher Analysis" paths={["Home", "Teacher"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={24}>
            <Row gutter={16}>
              <Col span={19}>
                <Tag name="subject" color="geekblue">
                  <p className="title">Science</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                </Tag>
                <Tag name="subject" color="geekblue">
                  <p className="title">Science</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                </Tag>
                <Tag name="subject" color="cyan">
                  <p className="title">Science</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                </Tag>
                <Tag name="subject" color="geekblue">
                  <p className="title">Science</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                </Tag>
                <Tag name="subject" color="cyan">
                  <p className="title">Science</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                  <p className="item">Teacher</p>
                </Tag>
              </Col>

              <Col span={5}>
                <Tag ClassName="Box" color="green">
                  <p className="relief"> Today Relief Teachers List</p>
                  <ul>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                  </ul>
                </Tag>
              </Col>
            </Row>
            <Divider />
            <Search
              className="search"
              placeholder="input teacher name here"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} xl={24}>
            <Table className="table">
              <Column title="Teacher name" dataindex="T-name" key="name" />

              <ColumnGroup title="Teaching Description">
                <Column
                  title="Subject"
                  dataIndex="subject"
                  key="subject"
                  color="black"
                />
                <Column title="Grade" dataIndex="grade" key="grade" />
              </ColumnGroup>
              <Column
                title="Attendance Percentage"
                dataIndex="at_percentage"
                key="at_percentage"
              />
              <Column
                title="Total assigned Periods"
                dataIndex="T-periodst"
                key="T-periods"
              />
              <Column
                title="Teached Periods out of assigned periods"
                dataIndex="A-periods"
                key="A-periods"
              />
              <Column
                title="Total Students enrolled with class"
                dataIndex="E-students"
                key="E-students"
              />
              <Column
                title="Activly participated students"
                dataIndex="A-students"
                key="A-students"
              />
            </Table>
          </Col>
          <divide />
          <Row>
            <Card ClassName="box-card">
              <p ClassName="a-title">
                {" "}
                Analysys Report of ......... Subject ............Grade
              </p>

              <Card>
                <p ClassName="c-title"> Teacher Attendance Analysys</p>
                <Progress
                  ClassName="chart"
                  type="circle"
                  percent={75}
                  format={(percent) => `${percent}% `}
                />

                <p ClassName="c-title"> Student Attendance Analysys</p>
                <Progress
                  ClassName="chart"
                  type="circle"
                  percent={75}
                  format={(percent) => `${percent}% `}
                />
              </Card>
            </Card>
          </Row>
        </Row>
      </Content>
    </ContentLayout>
  );
}
