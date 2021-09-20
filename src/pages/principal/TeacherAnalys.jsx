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
                <Card className="relief">
                  <h3> Todat Relief Teachers List</h3>
                  <ul>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                    <li>teacher 1</li>
                  </ul>
                </Card>
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
          <Col xs={24} xl={18}>
            <Table className="table">
              <Column title="Teacher name" dataindex="T-name" key="name" />

              <ColumnGroup title="Teaching Description">
                <Column title="Subject" dataIndex="subject" key="subject" />
                <Column title="Grade" dataIndex="grade" key="grade" />
              </ColumnGroup>
              <Column
                title="Attendance Percentage"
                dataIndex="at_percentage"
                key="at_percentage"
              />
              <Column dataIndex="action" key="action">
                  <Button type="submit"
Generate Report
>
                  </Button>
                  </Column>
            </Table>
          </Col>
          <Col xs={24} xl={6}></Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
