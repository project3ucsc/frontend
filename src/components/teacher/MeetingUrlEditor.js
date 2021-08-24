import React, { useState } from "react";

import {
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  Card,
  Form,
  Select,
  Badge,
  Modal,
} from "antd";
import ContentLayout from "components/ContentLayout";
import {
  DownOutlined,
  EditOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const meetingcardstyle = {
  marginBottom: 10,
  marginRight: 10,

  minHeight: 100,
};

const { Option } = Select;

export default function MeetingUrlEditor() {
  const today = new Date();
  const [day, setDay] = useState(today.getDay());
  function handleDayChange(value) {
    console.log(`selected ${value}`);
    setDay(value);
  }

  return (
    <Card
      title="Online lessons"
      className="lesson-card"
      style={meetingcardstyle}
      extra={
        <>
          Day :
          <Select
            style={{ marginLeft: 5 }}
            defaultValue={today.getDay()}
            onChange={handleDayChange}
          >
            <Option value={6}>All</Option>
            <Option value={1}>Mon</Option>
            <Option value={2}>Tue</Option>
            <Option value={3}>Wed</Option>
            <Option value={4}>Thu</Option>
            <Option value={5}>Fri</Option>
          </Select>
        </>
      }
    >
      <ul class="ant-list-items">
        <MeetingUrl day={day} />
      </ul>
    </Card>
  );
}

export function MeetingUrl() {
  const [modalvisible, setModalvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setModalvisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalvisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setModalvisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={showModal}>
        <EditOutlined /> Edit meeting URL
      </Menu.Item>
      <Menu.Item onClick={() => console.log("sdvsdv")}>
        <FieldTimeOutlined /> Change the time
      </Menu.Item>
    </Menu>
  );

  return (
    <li class="ant-list-item" style={{ padding: 0 }}>
      <Badge.Ribbon text="Monday 11.30am - 12.30pm" placement="start">
        <Col xs={24} className="meetingUrlcol">
          <Row style={{ marginBottom: 30 }}></Row>
          <Row>
            <Col sm={12}>
              <a
                href="https://khub.blob.core.windows.net/matierials/rc-upload-1629305869887-14-thermal-physics-1-638.jpg"
                class="linkspan"
              >
                Go to Link
              </a>
            </Col>
            <Col sm={12}>
              <p style={{ float: "right" }}>
                Last updated : {new Date().toLocaleDateString()}
              </p>
            </Col>
          </Row>
        </Col>
      </Badge.Ribbon>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Button type="link">
          <SettingOutlined />
          <DownOutlined />
        </Button>
      </Dropdown>

      <Modal
        title="Edit Meeting URL"
        visible={modalvisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>dfbdf</p>
      </Modal>
    </li>
  );
}
