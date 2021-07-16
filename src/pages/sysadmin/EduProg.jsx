import React from "react";
import "./sysadmin.scss";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  TimePicker,
  Tabs,
} from "antd";

import moment from "moment";
//upload file
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import ContentLayout from "components/ContentLayout";

const { Content } = Layout;
//time picker
const format = "HH:mm";
//Tabs
const { TabPane } = Tabs;

//upload
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
//Suggested list

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `Science Teaching Programme ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Science Teaching Programme, This is a grade 10 Science education Programme.Is conducted by well qualified teacher',
    content:
    <htmlli>
      <li>Teacher : A.B.C. Rajakaruna </li>
      <li>Subject : Science</li>
      <li>Grade : Ordinary Level</li>
    </htmlli>
      
  
      
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


  

  // Use for upload file
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //tab
  function callback(key) {
    console.log(key);
  }
  

  return (
    
      

    <ContentLayout title="Education programme" paths={["Home", "Education Programme"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 20,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={24}>
          <Tabs defaultActiveKey="1" onChange={callback}>

          <TabPane tab="Sugessted Education Programmes" key="1">
          <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          
          <IconText icon={LikeOutlined} text="3" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://i.ytimg.com/vi/QewKzbxqROk/mqdefault.jpg"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />,
    </TabPane>
        <TabPane tab="Add new Education Programme" key="2">
            <Form
              onFinish={onfinish}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              <Form.Item name="type" label="Select Programme type">
                <Select
                  showSearch
                  placeholder="Select a medium"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <option value="tv">TV programme</option>
                  <option value="radio">Radio Programme</option>
                  <option value="video">Video</option>
                </Select>
              </Form.Item>

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

              <Form.Item name="day" label="Broadcast Date">
                <Select
                  showSearch
                  placeholder="Select broadcast date"
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
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="fryday">Fryday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </Select>
              </Form.Item>

              <Form.Item name="time" label="Broadcast time">
                <TimePicker
                  defaultValue={moment("12:08", format)}
                  format={format}
                />
              </Form.Item>

              <Form.Item name="upload" label="Upload the file">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Programme
                </Button>
              </Form.Item>
            </Form>
            </TabPane>
  </Tabs>
          </Col>
          
        </Row>
      </Content>
    </ContentLayout>
    
  );
  
                }
                
    
