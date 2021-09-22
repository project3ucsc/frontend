import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  List,
  Divider,
  Card,
  Select,
  message,
  Statistic,
  Spin,
} from "antd";
import ContentLayout from "components/ContentLayout";
import "./teacherAnalys.scss";
import "./principal.scss";
import { Line } from "react-chartjs-2";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl, spinStyle } from "utils/common";
import authenticationservice from "services/authentication.service";
const { Option } = Select;
// const { Column, ColumnGroup } = Table;

// const { TabPane } = Tabs;

const { Content } = Layout;
const searchpropsforSelect = {
  showSearch: true,
  optionFilterProp: "children",
  filterOption: (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
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

function getGdata(mon, data) {
  return {
    labels: mon,
    datasets: [
      {
        label: "Ovaroll performance percentage %",
        data: data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
}

function getG2data(mon, data) {
  return {
    labels: mon,
    datasets: [
      {
        label: "Ovaroll performance percentage %",
        data: data,
        fill: false,
        backgroundColor: "rgb(28, 40, 204)",
        borderColor: "rgba(28, 40, 204, 0.2)",
      },
    ],
  };
}

export default function TeacherAnalys() {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const onSearch = (value) => console.log(value);
  const [graphData, setGraphData] = useState(getGdata([], []));
  const [leaveTeacher, setLeaveTeacher] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setloading] = useState(0);
  useEffect(() => {
    let scl = authenticationservice.currentUserValue.school_id;
    axios
      .get(`${apiurl}/attendance/teacheroveroll`, authHeader())
      .then(({ data }) => {
        // setSchools(res.data);
        // console.log(data);
        setGraphData(getGdata(data.month, data.data));
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });

    axios
      .get(`${apiurl}/attendance/leaveteachers/${scl}`, authHeader())
      .then(({ data }) => {
        // setSchools(res.data);
        // console.log(data);
        setLeaveTeacher(data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });

    axios
      .get(`${apiurl}/user/`, authHeader())
      .then(({ data }) => {
        // setSchools(res.data);
        console.log(data);
        setTeachers(data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);
  //switch
  function onTChange(val) {
    console.log(`val ${val}`);
    setloading(1);
    axios
      .get(`${apiurl}/attendance/setTeacherData/${val}`, authHeader())
      .then(({ data }) => {
        // setSchools(res.data);
        console.log(data);

        setTeacherData(data);
        setloading(2);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }

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
              <Col span={16}>
                <Card
                  className="dashcard"
                  title="Ovaroll Teaching performance by month"
                >
                  <Line height={100} data={graphData} options={options} />
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  className="dashcard"
                  title="Today leave teachers"
                  style={{ marginBottom: 16 }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={leaveTeacher}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta title={item.teacher.username} />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
            <Divider />
            {/* <Search
              className="search"
              placeholder="Input teacher name here"
              onSearch={onSearch}
              enterButton
            /> */}
            <Select
              {...searchpropsforSelect}
              placeholder="select teacher"
              style={{ minWidth: 100 }}
              onChange={onTChange}
            >
              {teachers.map((t, i) => {
                return (
                  <Option key={i} value={t.id}>
                    {t.username}
                  </Option>
                );
              })}
            </Select>
            {loading === 0 && <Card>No Data</Card>}
            {loading === 1 && <Spin {...spinStyle} />}
            {loading === 2 && (
              <Card>
                <Row gutter={16}>
                  <Col span={12}>
                    <Line
                      height={100}
                      data={getG2data(teacherData.month, teacherData.data)}
                      options={options}
                    />
                  </Col>
                  <Col span={12}>
                    <div
                      className="dahswrapper"
                      // title=" Subjects of the School"
                    >
                      <Card hoverable className="statcard">
                        <Statistic
                          title="Attendance Percentage"
                          value={teacherData.p}
                          precision={2}
                          valueStyle={{ color: "white", fontWeight: "bolder" }}
                          // prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      </Card>
                      <Card hoverable className="statcard">
                        <Statistic
                          title="Number of periods classes recieved/taken"
                          value={teacherData.nop}
                          // precision={2}
                          valueStyle={{ color: "white", fontWeight: "bolder" }}
                          // prefix={<ArrowUpOutlined />}
                          // suffix="%"
                        />
                      </Card>
                      <Card hoverable className="statcard">
                        <Statistic
                          title="Number of leaves taken"
                          value={teacherData.leave}
                          // precision={2}
                          valueStyle={{ color: "white", fontWeight: "bolder" }}
                          // prefix={<ArrowUpOutlined />}
                          // suffix="%"
                        />
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}

// <Row>
// <Col xs={24} xl={24}>
//   <Table className="table" dataSource={data}>
//     <Column title="Teacher name" dataindex="name" key="name" />

//     <Column
//       title="Tags"
//       dataIndex="tags"
//       key="tags"
//       render={(tags) => (
//         <>
//           {tags.map((tag) => (
//             <Tag color="blue" key={tag}>
//               {tag}
//             </Tag>
//           ))}
//         </>
//       )}
//     />

//     <Column
//       title="Attendance Percentage"
//       dataIndex="at_percentage"
//       key="at_percentage"
//     />
//     <Column
//       title="Total assigned Periods"
//       dataIndex="T_periodst"
//       key="T_periods"
//     />
//     <Column
//       title="Teached Periods out of assigned periods"
//       dataIndex="A_periods"
//       key="A_periods"
//     />
//     <Column
//       title="Total Students enrolled with class"
//       dataIndex="E_students"
//       key="E_students"
//     />
//     <Column
//       title="Activly participated students"
//       dataIndex="A_students"
//       key="A_students"
//     />
//   </Table>
// </Col>
// </Row>
// <br />
// <br />
// <Row>
// <Card
//   className="dashcard2"
//   title="Teachers attendance analysis"
//   style={{ marginBottom: 16 }}
// >
//   <Progress
//     itemLayout="horizontal"
//     ClassName="chart"
//     type="circle"
//     percent={75}
//     format={(percent) => `${percent}% `}
//   />
// </Card>
// <Card
//   className="dashcard2"
//   title="Students attendance analysis"
//   style={{ marginBottom: 16 }}
// >
//   <Progress
//     ClassName="chart"
//     type="circle"
//     percent={75}
//     format={(percent) => `${percent}% `}
//   />
// </Card>
// </Row>
