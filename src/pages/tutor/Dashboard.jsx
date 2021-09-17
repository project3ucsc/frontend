import React, { useState, useEffect } from "react";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl, getDateTxt } from "utils/common";
import authenticationservice from "services/authentication.service";

import { Layout, Row, message, Card, Col } from "antd";
import ContentLayout from "components/ContentLayout";
import { Link } from "react-router-dom";

// import { Avatar } from "antd";
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

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
                <Link key={classroom.id} to={"/classdetails/" + classroom.id}>
                  <Card
                    style={{ width: 200, margin: 10 }}
                    cover={
                      <img
                        style={{ height: 100 }}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    // actions={[
                    //   <SettingOutlined key="setting" />,
                    //   <EditOutlined key="edit" />,
                    //   <EllipsisOutlined key="ellipsis" />,
                    // ]}
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
                </Link>
                // </Col>
              );
            })}

            <Link to="/addnewclasses">
              <Card
                style={{ width: 200, height: 221, margin: 10 }}
                cover={
                  <img
                    style={{ height: 100 }}
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                +
              </Card>
            </Link>

            {/* </Row> */}
          </div>
        </Card>
      </Content>
    </ContentLayout>
  );
}
