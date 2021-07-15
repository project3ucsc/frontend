import React from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  notification,
} from "antd";

import ContentLayout from "components/ContentLayout";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

export default function EduProg() {
  const onfinish = (val) => {
    console.log(val);
  };
  const { option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <ContentLayout title="Education programme" paths={["Home", "EduProg"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 20,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={18}>
            <Form
              onFinish={onfinish}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              <Form.Item
                name="title"
                label="Programme Name"
                rules={[
                  {
                    required: true,
                    message: "Please input programme name",
                  },
                ]}
              >
                <Input placeholder="Please input your name" />
              </Form.Item>

              <Form.Item name="medium" label="Medium">
                <Select
                  showSearch
                  placeholder="Select a medium"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <option value="Sinhala">Sinhala</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                </Select>
              </Form.Item>
              <Form.Item
                name="discription"
                label="Programme discription"
                rules={[
                  {
                    required: false,
                    message: "Please input project description",
                  },
                ]}
              >
                <Input placeholder="Please input Programme discription" />
              </Form.Item>
              <Form.Item name="subject" label="Relevent Subject">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a Subject"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Buddhisum">Buddhisum</option>
                </Select>
              </Form.Item>

              <Form.Item
                name="time"
                label="Broadcast Time and Date range"
                
                rules={[
                  {
                    required: false,
                    message: "Please enter broadcast time",
                  },
                ]}
              >
                <Space direction="vertical" size={12}>
                  <RangePicker showTime />
                 
                </Space>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add to Video List
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} xl={6}>
          <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
  </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
