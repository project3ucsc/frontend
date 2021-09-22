import React from "react";
import { useState, useEffect } from "react";
import { Layout, Row, Col, Tabs, Input, Space, Divider, message } from "antd";
import ContentLayout from "components/ContentLayout";
import "./tuitionhome.scss";
import StudentPclassList from "components/StudentPclassList";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";
import TutionCardStu from "components/TutionCardStu";

const { TabPane } = Tabs;
const { Content } = Layout;

// tab
function callback(key) {
  console.log(key);
}
// search bar

const { Search } = Input;

const onSearch = (value) => console.log(value);

export default function TuitionHome() {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let school_id = authenticationservice.currentUserValue.school_id;
    axios
      .get(`${apiurl}/tutor/classes/stu/${school_id}`, authHeader())
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  return (
    <ContentLayout
      title="Tuition Class Managment"
      paths={["Home", "Tuition Classes"]}
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
            <Tabs onChange={callback} type="card">
              <TabPane tab="Suggested class for you" key="1">
                <Space direction="horizontal">
                  <Search
                    placeholder="Search teacher name here "
                    onSearch={onSearch}
                    enterButton
                  />
                  <Search
                    placeholder="Search subject name here "
                    onSearch={onSearch}
                    enterButton
                  />
                </Space>
                <Divider />
                <div className="site-card-wrapper">
                  {classes.map((cls, i) => {
                    return <TutionCardStu cls={cls} key={i} i={i} />;
                  })}
                </div>
              </TabPane>
              <TabPane tab="Enrolled Classes" key="2">
                <StudentPclassList />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
                }
