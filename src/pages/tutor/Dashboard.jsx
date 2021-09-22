import React, { useState, useEffect } from "react";
import { Layout, Card } from "antd";

//import img1 from "../../img/teacher_cover2.jpg";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl, getDateTxt } from "utils/common";
import authenticationservice from "services/authentication.service";

import { message } from "antd";
import ContentLayout from "components/ContentLayout";

import { Link } from "react-router-dom";

// import { Avatar } from "antd";
import {
  EditOutlined,
  // EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const { Meta } = Card;

export default function Dashboard() {
  const [classroomList, setClassroomList] = useState([]);
  useEffect(() => {
    let userid = authenticationservice.currentUserValue.id;
    axios
      .get(`${apiurl}/tutor/classes/list/${userid}`, authHeader())
      .then((res) => {
        setClassroomList(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  return (
    <ContentLayout title="Dashboard" paths={["Home", "Dashboard"]}>
      <Content
        className="site-layout-background"
        style={{
          // padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Card title="Class Management">
          <div className="card-wrapper">
            {/* <Row gutter={[10, 10]}> */}
            {classroomList.map((classroom) => {
              return (
                // <Col key={classroom.id} span={8}>

                <Card
                  key={classroom.id}
                  style={{ width: 200, margin: 10 }}
                  // cover={
                  //   <img
                  //     style={{ height: 100 }}
                  //     alt="example"
                  //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  //   />
                  // }
                  actions={[
                    <Link to={"/classdetails/" + classroom.id}>
                      {" "}
                      <SettingOutlined key="setting" />
                    </Link>,
                    <Link to={"/classpage/" + classroom.id}>
                      <EditOutlined key="edit" />
                    </Link>,
                    // <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    // avatar={
                    //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    // }
                    title={classroom.subject + " | " + classroom.grade}
                    description={
                      <>
                        {" "}
                        <p style={{ margin: 3 }}>{classroom.day}</p>
                        <p style={{ margin: 0 }}>
                          {getDateTxt(
                            classroom.sttime,
                            classroom.endtime,
                            "h12"
                          )}
                        </p>{" "}
                      </>
                    }
                  />
                </Card>
                // </Col>
              );
            })}

            <Link to="/addnewclasses">
              <Card
                style={{
                  width: 200,
                  height: 170,
                  margin: 10,
                  padding: "11px 22px",
                  border: "#1990fc 3px solid",
                }}
              >
                <PlusOutlined
                  style={{ fontSize: 100, margin: "auto", color: "#1890ff" }}
                />
              </Card>
            </Link>

            {/* </Row> */}
          </div>
        </Card>
      </Content>
    </ContentLayout>
  );
}
