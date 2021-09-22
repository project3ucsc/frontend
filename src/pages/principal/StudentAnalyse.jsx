import React from "react";
import {
  Layout,
  Row,
  Col,
  List,
  Select,
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
  Form,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { useState } from "react";
import "./studentAnalyse.scss";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';
const { Search } = Input;
const { Column, ColumnGroup } = Table;

// const { TabPane } = Tabs;

export default function StudentAnalyse() {
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

  const Monthlydata = {
    labels:["Janu","Feb","March","April","June","July","Auguest","Sept","Oct","Nov","December"],
    datasets: [
      {
        label: 'Percentage of attendies',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
      backgroundColor: "rgb(28, 40, 204)",
      borderColor: "rgba(28, 40, 204, 0.2)",
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data ={
    labels:["Janu","Feb","March","April","June","July","Auguest","Sept","Oct","Nov","December"],
    datasets:[{
      labels:"Percentage of attendies",
data:[10,20,30,40,50],
backgroundColor: [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
],
borderColor: [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
],
borderWidth: 1,
    }]
  }
  const Classdata = {
    labels: ["Class1", "Class2", "Class3", "Class4", "Class5", "Class6"],
    datasets: [
      {
        label: "Percentage of attendies",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  

  const { Content } = Layout;

  const Low_performance_subjects=[
    {
      title: "Buddhisum",
      percentage: 89,
    },

    {
      title: "History",
      percentage: 83,
    },
    {
      title: "Geogrophy",
      percentage: 83,
    },

  ];

  return (
    <ContentLayout title="Student Performance Analysis" paths={["Home", "Teacher"]}>
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
                <Form>
                  <Form.Item span className="form" name="subject">
                    <Select placeholder="Select Subject">
                      <Select.Option value="Maths">Maths</Select.Option>
                      <Select.Option value="Science">Science</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item span className="form" name="grade">
                    <Select placeholder="Select Grade">
                      <Select.Option value="1">Grade 1</Select.Option>
                      <Select.Option value="1">Grade 2</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item span className="form" name="class">
                    <Select placeholder="Select Class">
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="1">2</Select.Option>
                      <Select.Option value="1">3</Select.Option>
                      <Select.Option value="1">4</Select.Option>
                      <Select.Option value="1">5</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item span className="form">
                    <Button type="primary" htmlType="submit">
                      Check Performance
                    </Button>
                  </Form.Item>
                </Form>

                
                  <h1 className="title"> Student Interaction Vs Classes of the grade</h1>
               
                <Bar data={Classdata} options={options} />

                <dvider/>
                <h1 className="title"> Monthly progress of the Student Interaction </h1>
               
                <Line data={Monthlydata} options={options} />
              </Col>

              <Col span={6}>
                <Card className="dashcard" title="Low Student Interactive Subjects">
                <List
                    itemLayout="horizontal"
                    dataSource={Low_performance_subjects}
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
              placeholder="input teacher name here"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} xl={24}>
            <Table className="table">
              <Column title="Subject" dataIndex="sub" key="sub" />
              <Column title="Grade" dataIndex="grade" key="grade" />
              <Column title="Teacher" dataIndex="teacher" key="teacher" />
              <Column
                title="Total Student Count for teacher"
                dataIndex="T-std"
                key="T-std"
              />
              <Column
                title="Total Student count for subject"
                dataIndex="T-std-sub"
                key="T-std-sub"
              />
              <Column
                title="Activly participated Student Count"
                dataIndex="A-std"
                key="A-std"
              />
            </Table>
          </Col>
          <divide />
         
        </Row>
        <br />
        <br />
        <Row>
        <Col gutter={16}>

         

          

          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
