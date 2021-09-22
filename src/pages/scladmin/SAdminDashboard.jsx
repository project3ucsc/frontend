import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Drawer,
  Form,
  Input,
  Select,
  Statistic,
  Progress,
  DatePicker,
  Space,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { PlusOutlined, BellTwoTone } from "@ant-design/icons";
import img1 from "../../img/t5.jpeg";

import "./dash.scss";
import Title from "antd/lib/skeleton/Title";
const cstyle = {
  padding: 24,
  margin: 5,
  marginBottom: 0,
  minHeight: 280,
};

const { Option } = Select;
const { RangePicker } = DatePicker;

var adata = [
  {
    title: "Grade 9 - Timetable updated",
    dis: "Grade 9 mathematics time slot will be changed...",
  },
  {
    title: "Mr. L.N.S. Fernando",
    dis: "fernan@yahoo.com",
  },
  {
    title: "Mr. M.T. Premarathna",
    dis: "mtp@hotmail.com",
  },
];

const getVacdata = () => {
  let data = localStorage.getItem("vacdata");
  if (data) return JSON.parse(data);
  return "";
};
const setVacdata = (val) => {
  localStorage.setItem("vacdata", JSON.stringify(val));
};

export default function SAdminDashboard() {
  const [drawervisible, setDrawervisible] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formann] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setVacdata(values);
      setLoading(false);
      setIsDisable(true);
      message.success("Vacation range set successfully");
    }, 400);
    console.log("Success:", values);
  };

  const onsubmitdrawer = (val) => {
    const formdata = formann.getFieldsValue();
    setDrawervisible(false);
    adata = [
      {
        title: formdata.title,
        dis: formdata.description,
      },
      ...adata,
    ];
  };
  return (
    <ContentLayout title="DashBoard" paths={["SchoolAdmin", "Dashboard"]}>
      <Drawer
        title="Create a new account"
        width={400}
        onClose={() => setDrawervisible(false)}
        visible={drawervisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => setDrawervisible(false)}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={onsubmitdrawer} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form form={formann} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please type title" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="User Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="student">Student</Option>
                  <Option value="teacher">Teacher</Option>
                  <Option value="public">All</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Row>
        <Col xs={24} xl={24} style={{ margin: 10 }}>
          <img style={{ width: 1430, height: 200 }} src={img1} alt="img1" />
        </Col>
      </Row>
      {/*<Row>
      <Col xs={24} xl={24}>
        <Card style={{ margin: 10 }}>

        </Card>
        </Col>
      </Row>*/}
      <Row>
        <Col xs={24} xl={18}>
          <Card
            title="Added Announcements"
            extra={
              <Button onClick={() => setDrawervisible(true)} type="primary">
                <PlusOutlined />
                Add New
              </Button>
            }
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
                    avatar={
                      <Avatar
                        style={{ backgroundColor: "white" }}
                        icon={<BellTwoTone />}
                      />
                    }
                    title={
                      <a href="http://localhost:3000/dashboard">{item.title}</a>
                    }
                    description={item.dis}
                  />
                  <Col className="editbtn">
                    <Row>
                      <Button
                        style={{ margin: 10 }}
                        type="primary"
                        danger
                        ghost
                      >
                        Delete
                      </Button>
                    </Row>
                  </Col>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} xl={6}>
          <Card style={{ margin: 5, padding: 24 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Total Teachers" value={52} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Students" value={3056} />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col span={12}>
                <Statistic title="Leave Teachers" value={7} />
              </Col>
              <Col>
                <Progress
                  title="Leave Teachers"
                  type="circle"
                  percent={14}
                  width={80}
                />
              </Col>
            </Row>
          </Card>
          <Card style={{ margin: 5, marginTop: 10 }} title="Set Vacation Range">
            <Form
              name="basic"
              initialValues={getVacdata()}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Holiday/ Vacation Name"
                name="name"
                rules={[
                  { required: true, message: "Please input holiday name!" },
                ]}
              >
                <Input disabled={isDisable} />
              </Form.Item>

              <Form.Item
                label="Time Rrange"
                name="trange"
                rules={[{ required: true, message: "Please input timerange!" }]}
              >
                <RangePicker disabled={isDisable} />
              </Form.Item>

              <Form.Item style={{ float: "right" }}>
                <Space>
                  {!isDisable && (
                    <Button
                      onClick={() => setIsDisable(true)}
                      htmlType="button"
                      danger
                    >
                      Cancel
                    </Button>
                  )}
                  <Button onClick={() => setIsDisable(false)} htmlType="button">
                    Edit
                  </Button>

                  <Button
                    loading={loading}
                    disabled={isDisable}
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
}
