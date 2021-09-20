import React, {useState} from "react";
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
import { List, Avatar } from "antd";

import ContentLayout from "components/ContentLayout";
import axios from "axios";
import authenticationservice from "services/authentication.service";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";

const { Content } = Layout;
//time picker
const format = "HH:mm";
//Tabs
const { TabPane } = Tabs;
const { Option } = Select;

const sectionData = ['Primary','OLevel','ALevel'];
const gradeData = {
  Primary: ['1','2','3','4','5'],
  OLevel: ['6','7','8','9','10','11'],
  ALevel: ['12','13']
};
const subjectnameData = {
  Primary: ['Sinhala','Mathematics','Environment','English'],
  OLevel: ['Mathematics','Science','History','English','Sinhala','Buddhism','Catholics','Tamil', 'IT','Geography','Commerce'],
  ALevel: ['Combined Maths','Biology','Chemistry','Physics','IT','Agriculture','Business Studies','Accounting','Econ','Geography','Hindu']
};

//upload
export default function EduProg() {

  const [loading, setLoading] = useState(false);
  const [sections,setSections] = useState(subjectnameData[sectionData[0]]);
  const [subject,setSubject] = useState(subjectnameData[sectionData[0]][0]);

  const[sectiongrade,setSectionGrade] = useState(gradeData[sectionData[0]]);
  const [grade,setGrade] = useState(gradeData[sectionData[0]][0]);
  const [form] = Form.useForm();

  const onfinish = (val) => {
    setLoading(true);
    console.log("Success",val);
    axios
      .post(
        apiurl + "/freeprog/add/" + authenticationservice.currentUserValue.id,
        val,
        authHeader()
      )
      .then( (res)=>{
        console.log(res.data);
        message.success("Edu program added successfully");
        setLoading(false);
        form.resetFields();
      })
      .catch((e) => {
        message.error("Something went wrong");
        console.log(e);
        setLoading(false);
      }); 
  };

  const onfinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

  const handleSectionChange = (value) => {
    setSections(subjectnameData[value]);
    setSubject(subjectnameData[value][0]);

    setSectionGrade(gradeData[value]);
    setGrade(gradeData[value][0]);
  };

  const onSubjectChange = (value) => {
    setSubject(value);
  };

  const onGradeChange = (value) => {
    setGrade(value);
  };
  //Suggested list

  const listData = [
    {
      href: "https://ant.design",
      title: `Science EduCation Programme`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Science Teaching Programme, This is a grade 10 Science education Programme.Is conducted by well qualified teacher",
      content: (
        <htmlli>
          {/* <li>Teacher : A.B.C. Rajakaruna </li> */}
          <li>Subject : Science</li>
          <li>Grade : Ordinary Level</li>
        </htmlli>
      ),
    },
    {
      href: "https://ant.design",
      title: `NanaSyura Programme`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "NanaSyura, This is a grade 8 Science/Masths education Programme.Is conducted by well qualified teacher",
      content: (
        <htmlli>
          {/* <li>Teacher : A.B.C. Rajakaruna </li> */}
          <li>Subject : Maths</li>
          <li>Grade : Ordinary Level</li>
        </htmlli>
      ),
    },
    {
      href: "https://ant.design",
      title: `Science Edu Programme`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "BrainHub, This is a grade 8 Sinhala education Programme brdcast in ITN",
      content: (
        <htmlli>
          {/* <li>Teacher : A.B.C. Rajakaruna </li> */}
          <li>Subject : Sinhala</li>
          <li>Grade : Ordinary Level</li>
        </htmlli>
      ),
    },
  ];
  // for (let i = 0; i < 10; i++) {
  //   listData.push();
  // }

  // const IconText = ({ icon, text }) => (
  //   <Space>
  //     {React.createElement(icon)}
  //     {text}
  //   </Space>
  // );

  // Use for upload file
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //tab
  function callback(key) {
    console.log(key);
  }

  return (
    <ContentLayout
      title="Education programme"
      paths={["Home", "Education Programme"]}
    >
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
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.title}

                      // extra={
                      //   <img
                      //     width={272}
                      //     alt="logo"
                      //     src="https://i.ytimg.com/vi/QewKzbxqROk/mqdefault.jpg"
                      //   />
                      // }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://www.tele2.nl/Tele2/media/images/Tele2/thuis/tv-abonnement/oude-tv-img.png" />
                        }
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />
                ,
              </TabPane>
              <TabPane tab="Add new Education Programme" key="2">
                <Form
                  form={form}
                  onFinish={onfinish}
                  onFinishFailed={onfinishFailed}
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 15 }}
                >
                  <Form.Item name="type" label="Select Programme type">
                    <Select
                      showSearch
                      placeholder="Select the program type"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="tv">TV programme</Option>
                      <Option value="radio">Radio Programme</Option>
                      <Option value="video">YouTube Programme</Option>
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
                    <Input placeholder="Please input program name" />
                  </Form.Item>
                  
                  <Form.Item name="section" label="section" rules={[{
                    required: true,
                    message:"Please input targeted section",
                  },]}>
                    <Select onChange={handleSectionChange}>
                      {sectionData.map(section =>(
                        <Option key={section}>{section}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="grade" label="grade" rules={[{
                    required: true,
                    message:"Please input grade here",
                  },]}>
                    <Select 
                      value={grade}
                      onChange={onGradeChange}
                    >
                     {sectiongrade.map(gra=>(
                       <Option key={gra}>{gra}</Option>
                     ))}
                    </Select>
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
                      value={subject}
                      onChange={onSubjectChange}
                    >
                     {sections.map(sub=>(
                       <Option key={sub}>{sub}</Option>
                     ))} 
                    </Select>
                  </Form.Item>
    
                  <Form.Item
                    name="discription"
                    label="Programme discription"
                    rules={[
                      {
                        required: false,
                        message: "Please input program description",
                      },
                    ]}
                  >
                    <Input placeholder="Please input Programme discription" />
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
                      <Option value="monday">Monday</Option>
                      <Option value="tuesday">Tuesday</Option>
                      <Option value="wednesday">Wednesday</Option>
                      <Option value="thursday">Thursday</Option>
                      <Option value="fryday">Fryday</Option>
                      <Option value="saturday">Saturday</Option>
                      <Option value="sunday">Sunday</Option>
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
                    <Button
                      style={{ marginLeft: 250 }}
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Add Programme
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
