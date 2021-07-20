import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Modal,
  Drawer,
  Form,
  Input,
  Select,
  Descriptions,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { PlusOutlined, BellTwoTone } from "@ant-design/icons";

import "./dash.scss";
const cstyle = {
  padding: 24,
  margin: 10,
  marginBottom: 0,
  minHeight: 280,
};

const { Option } = Select;

const tdata = [
  {
    title: "Mr. Nimal Perea",
    dis: "nimal@gmail.com",
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

export default function SAdminDashboard() {
  const [visible, setvisible] = useState(false);
  const [drawervisible, setDrawervisible] = useState(false);
  const [formann] = Form.useForm();

  // const { Content } = Layout;

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
      <Modal
        visible={visible}
        title="Activate the teacher"
        // onOk={handleOk}
        // onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={() => setvisible(false)}>
            Cancel
          </Button>,
          <Button danger onClick={() => setvisible(false)}>
            Reject
          </Button>,
          <Button type="primary" onClick={() => setvisible(false)}>
            Accept
          </Button>,
        ]}
      >
        <Descriptions layout="vertical" title="User Info">
          <Descriptions.Item label="Name">Mr. Nimal Perera</Descriptions.Item>
          <Descriptions.Item label="Telephone">07014369453</Descriptions.Item>
          <Descriptions.Item label="Email">nimal@gmail.com</Descriptions.Item>
          <Descriptions.Item label="Gender">Male</Descriptions.Item>
          <Descriptions.Item label="Address">
            51/F,Ambagahathota road,Gonaduwa
          </Descriptions.Item>
        </Descriptions>
        ,
      </Modal>

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
                rules={[{ required: true, message: "Please tyep titel" }]}
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
                  <Option value="private">Student</Option>
                  <Option value="public">Teacher</Option>
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
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Row>
        <Col xs={24} xl={12}>
          <Card
            title="New Teacher accounts"
            className="teachercard"
            style={cstyle}
          >
            <List
              itemLayout="horizontal"
              dataSource={tdata}
              renderItem={(item) => (
                <List.Item onClick={() => setvisible(true)}>
                  <List.Item.Meta
                    style={{ marginLeft: 10 }}
                    avatar={
                      <Avatar
                        style={{ backgroundColor: "white" }}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    }
                    title={
                      <a href="http://localhost:3000/dashboard">{item.title}</a>
                    }
                    description={item.dis}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} xl={12}>
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
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
}
