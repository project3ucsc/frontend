import React, { useState } from "react";
import { Layout, Row, Col, Form, Select, Button, Table } from "antd";
import ContentLayout from "components/ContentLayout";
import TimeTableManager from "components/TimeTableManager";

const { Option } = Select;

const data = [
  { key: 1, time: "08.00-09.10", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1 },
  { key: 2, time: "09.10-10.30", mon: 1, tue: 2, wed: 1, thu: 1, fri: 1 },
  { key: 3, time: "11.10-12.10", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1 },
  { key: 4, time: "12.10-13.30", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1 },
];

const subjects = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Gen. English" },
];

export default function TimeTableManagePage() {
  const { Content } = Layout;

  const onClassRoomSelect = (val) => {
    console.log(val);
  };
  return (
    <ContentLayout
      title="TimeTable Management"
      paths={["SchoolAdmin", "Dashboard"]}
    >
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col sm={24} xl={24}>
            <Form
              style={{ justifyContent: "center" }}
              layout="inline"
              // form={clsselectform}
              onFinish={onClassRoomSelect}
            >
              <Form.Item
                name="grade"
                label="Grade"
                rules={[
                  {
                    required: true,
                    message: "Please select grade!",
                  },
                ]}
              >
                <Select placeholder="select grade" style={{ minWidth: 100 }}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="class"
                label="Class"
                rules={[
                  {
                    required: true,
                    message: "Please select class!",
                  },
                ]}
              >
                <Select placeholder="select class" style={{ minWidth: 100 }}>
                  <Option value="2">A</Option>
                  <Option value="3">B</Option>
                  <Option value="4">C</Option>
                  <Option value="5">D</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <TimeTableManager data={data} subs={subjects} />
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
