import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Statistic,
  Avatar,
  Tag,
  Progress,
  List,
  Modal,
  Form,
  Input,
  Tabs,
  Spin,
  message,
} from "antd";
import { Line } from "react-chartjs-2";
import ContentLayout from "components/ContentLayout";
import "./principal.scss";
import { spinStyle } from "utils/common";

const data = {
  labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "AL",
      data: [3, 5, 3, 6, 8, 12],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "OL (Grade 10-11)",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(0, 158, 13)",
      borderColor: "rgba(0, 158, 13, 0.2)",
    },
    {
      label: "Grade 6-9",
      data: [13, 9, 13, 3, 1, 6],
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

const bestteacherlist = [
  {
    title: "Mr.Atukorala",
    percentage: 89,
  },
  {
    title: "Ant Design Title 2",
    percentage: 84,
  },
  {
    title: "Ant Design Title 3",
    percentage: 83,
  },
  {
    title: "Ant Design Title 4",
    percentage: 83,
  },
];
const worstteacherlist = [
  {
    title: "Mr.Atukorala",
    percentage: 35,
  },
  {
    title: "Ant Design Title 2",
    percentage: 42,
  },
  {
    title: "Ant Design Title 3",
    percentage: 43,
  },
  {
    title: "Ant Design Title 4",
    percentage: 46,
  },
];

const { Content } = Layout;
const { TabPane } = Tabs;

const getEnrolldata = () => {
  let data = localStorage.getItem("enroldata");
  if (data) return JSON.parse(data);
  return "";
};
const setEnrolldata = (val) => {
  localStorage.setItem("enroldata", JSON.stringify(val));
};

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eloading, setEloading] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 600 + 500);
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const onEnrolladd = (val) => {
    setEloading(true);
    setTimeout(() => {
      setEnrolldata(val);
      setEloading(false);

      message.success("Updated successfully");
      setIsModalVisible(false);
    }, 500);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const x = 7;

  return (
    <ContentLayout title="Dashboard" paths={["Home"]}>
      <Content className="-header">
        {/* <img className="cover" src={img1} alt="img1" /> */}

        <Row>
          <Col xs={24} xl={24}>
            <Row gutter={16}>
              <Col span={x}>
                <Statistic
                  className="stat"
                  title="Total No of Students in the school"
                  value={855}
                />
              </Col>
              <Col span={x}>
                <Statistic
                  className="stat"
                  title="Total No of Teachers in the school"
                  value={45}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  className="stat"
                  title="No of tutors enroll with school"
                  value={5}
                />
              </Col>

              <Button
                style={{ marginTop: 10 }}
                className="btn"
                type="primary"
                onClick={showModal}
              >
                Edit school details
              </Button>
              <Modal
                title="School Details"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form onFinish={onEnrolladd} initialValues={getEnrolldata()}>
                  <Form.Item
                    label="Total Number of Students :"
                    name="Tstudents"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Total Number of Teachers :"
                    name="Tteachers"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={eloading}
                      className="btn"
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Row>
            <br />
            {!loading ? (
              <Row gutter={16}>
                <Col span={19}>
                  <Row gutter={16}>
                    <Col span={16}>
                      {" "}
                      <Card
                        className="dashcard"
                        title="Teaching performance with sections"
                      >
                        <Line height={200} data={data} options={options} />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        className="dashcard"
                        title="Top 5 Best performing teachers"
                        style={{ marginBottom: 16 }}
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={bestteacherlist}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={item.title}
                                description={
                                  <p>
                                    {" "}
                                    Perfomance pecentage{" "}
                                    <Tag color="blue">{item.percentage}%</Tag>
                                  </p>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                      <Card
                        className="dashcard"
                        title="Lowest perforrming teachers"
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={worstteacherlist}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={item.title}
                                description={
                                  <p>
                                    {" "}
                                    Perfomance pecentage{" "}
                                    <Tag color="blue">{item.percentage}%</Tag>
                                  </p>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>

                <Col span={5}>
                  <Card className="dashcard" title="User enrollment Progress">
                    <Card
                      style={{
                        border: "#34393d5c 1px solid",
                        marginBottom: 10,
                      }}
                    >
                      <p className="analysis">
                        {" "}
                        Students Enrolled in the System{" "}
                      </p>
                      <Progress
                        ClassName="chart"
                        type="circle"
                        percent={75}
                        format={(percent) => `${percent}% `}
                      />
                    </Card>

                    <Card
                      style={{
                        border: "#34393d5c 1px solid",
                        marginBottom: 10,
                      }}
                    >
                      <p className="analysis">
                        {" "}
                        Teachers Enrolled in the System{" "}
                      </p>
                      <Progress
                        ClassName="chart"
                        type="circle"
                        percent={40}
                        format={(percent) => `${percent}% `}
                      />
                    </Card>

                    <Card
                      style={{
                        border: "#34393d5c 1px solid",
                        marginBottom: 10,
                      }}
                    >
                      <p className="analysis"> System Access Rate of School </p>
                      <Progress
                        ClassName="chart"
                        type="circle"
                        colour="Green"
                        percent={100}
                        format={(percent) => `${percent}  `}
                      />
                    </Card>
                  </Card>
                </Col>
              </Row>
            ) : (
              <Spin {...spinStyle} />
            )}
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}

/* <Col span={6}>
  <Card>
    <h4 className="T_overview"> Overview of the school</h4>
    <Tree
      checkable
      defaultExpandedKeys={["0-0-0", "0-0-1"]}
      defaultSelectedKeys={["0-0-0", "0-0-1"]}
      defaultCheckedKeys={["0-0-0", "0-0-1"]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  </Card>
</Col> */

// <Card className="card-1">
// <Form className="filter table">
//   <Form.Item
//     span
//     className="form"
//     name="month-picker"
//     label="Select Month"
//   >
//     <DatePicker picker="month" />
//   </Form.Item>

//   <Form.Item
//     span
//     className="form"
//     name="subject"
//     label="Select Grade"
//   >
//     <Select>
//       <Select.Option value="1">Grade 1</Select.Option>
//       <Select.Option value="1">Grade 2</Select.Option>
//     </Select>
//   </Form.Item>
//   <Form.Item
//     span
//     className="form"
//     name="grade"
//     label="Select Subject"
//   >
//     <Select>
//       <Select.Option value="Maths">Maths</Select.Option>
//       <Select.Option value="Science">Science</Select.Option>
//     </Select>
//   </Form.Item>
//   <Form.Item
//     name="teacher"
//     className="form"
//     label="Select Teacher"
//     column-width="40px"
//   >
//     <Select>
//       <Select.Option value="1">Mr. Aruna Peris</Select.Option>
//       <Select.Option value="2">
//         Ms.Amala Rajakumara
//       </Select.Option>
//     </Select>
//   </Form.Item>
//   <Form.Item>
//     <Button className="btn" type="primary" htmlType="submit">
//       Create Report
//     </Button>
//   </Form.Item>
// </Form>
// </Card>
// <Card className="reports">
// <p className="T-report"> Analysis Report</p>
// <Tabs defaultActiveKey="1" centered>
//   <TabPane tab="Attendance Analysis of the Teacher" key="1">
//     <Card Class name="details">
//       <p>No of working days for the Month: </p>
//       <p>No of periods for the Month : </p>
//       <p>No of students assign for the teacher : </p>
//       <p>No of leaves applied for the Month : </p>
//       <h3>
//         Attendance Percentage of ..(entered techer name)...
//         for the Month of ...(Entered month)...{" "}
//       </h3>
//       <Progress
//         ClassName="chart"
//         type="circle"
//         percent={75}
//         format={(percent) => `${percent}% `}
//       />
//     </Card>
//   </TabPane>
//   <TabPane tab="Attendance Analysis of Students" key="2">
//     <p>No of Students enrolled in particular subject : </p>
//     <p>Required attendance for the month : </p>
//     <p>Marked attendance for the month : </p>
//     <h3> Attendance Analysis for the ..Subject.. </h3>
//     <Progress
//       ClassName="chart"
//       type="circle"
//       percent={75}
//       format={(percent) => `${percent}% `}
//     />
//   </TabPane>
//   <TabPane tab="Subject Preference Status" key="3">
//     <p>Total No of Students enrolled for ..Subject.. : </p>
//     <p>No of students enrolled with teacher .. name.. : </p>
//     <h3>Subject preference status</h3>
//     <Progress
//       ClassName="chart"
//       type="circle"
//       percent={75}
//       format={(percent) => `${percent}% `}
//     />
//   </TabPane>
// </Tabs>
// </Card>
