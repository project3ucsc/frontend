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
  Spin,
  Progress,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { useState } from "react";
import "./teacherAnalys.scss";
import "./principal.scss";
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

  const data = [
    {
      name: "John",
      tags: ["loser"],
      at_percentage: 32,
      T_periods: "New York No. 1 Lake Park",
      E_students: "New York No. 1 Lake Park",
    },
    {
      name: "John",
      tags: ["loser"],
      at_percentage: 32,
      T_periods: "New York No. 1 Lake Park",
      E_students: "New York No. 1 Lake Park",
    },
    {
      name: "John",
      tags: ["loser"],
      at_percentage: 32,
      T_periods: "New York No. 1 Lake Park",
      E_students: "New York No. 1 Lake Park",
    },
  ];

  const reliefteacherlist = [
    {
      title: "Mr.Aruna Rajakumara",
      percentage: 89,
    },

    {
      title: "Mr.Shantha Perera",
      percentage: 83,
    },
    {
      title: "Mr.Balachandran kumar",
      percentage: 83,
    },
  ];

  const { Content } = Layout;

  return (
    <ContentLayout
      title="Teacher Perfomance Analysis"
      paths={["Home", "Student"]}
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
          <Col xs={24} xl={24}>
            <Row gutter={16}>
              <Col span={18}>
                <Card  className="dashcard" title=" Subjects of the School">
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
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  className="dashcard"
                  title="Today leave teachers"
                  style={{ marginBottom: 16 }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={reliefteacherlist}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={item.title} />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
            <Divider />
            <Search
              className="search"
              placeholder="Input teacher name here"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} xl={24}>
            <Table className="table" dataSource={data}>
              <Column title="Teacher name" dataindex="name" key="name" />

              <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={(tags) => (
                  <>
                    {tags.map((tag) => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </>
                )}
              />

              <Column
                title="Attendance Percentage"
                dataIndex="at_percentage"
                key="at_percentage"
              />
              <Column
                title="Total assigned Periods"
                dataIndex="T_periodst"
                key="T_periods"
              />
              <Column
                title="Teached Periods out of assigned periods"
                dataIndex="A_periods"
                key="A_periods"
              />
              <Column
                title="Total Students enrolled with class"
                dataIndex="E_students"
                key="E_students"
              />
              <Column
                title="Activly participated students"
                dataIndex="A_students"
                key="A_students"
              />
            </Table>
          </Col>
          </Row>
          <br />
          < br />
          <Row>
          
            <Card
              className="dashcard2"
              title="Teachers attendance analysis"
              style={{ marginBottom: 16 }}
            >
              <Progress
                itemLayout="horizontal"
                ClassName="chart"
                type="circle"
                percent={75}
                format={(percent) => `${percent}% `}
              />
              </Card>
 <Card
              className="dashcard2"
              title="Students attendance analysis"
              style={{ marginBottom: 16 }}
            >
              
              <Progress
                ClassName="chart"
                type="circle"
                percent={75}
                format={(percent) => `${percent}% `}
              />
            </Card>

            
          </Row>
        
      </Content>
    </ContentLayout>
  );
}
