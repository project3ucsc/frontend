import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  List,
  Avatar,
  Descriptions,
  Card,
  Layout,
  Row,
  Col,
  Spin,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

import "./ViewStudentRequest.scss";
import PclassUpdateForm from "components/tutor/PclassUpdateForm";
// import EnrolledStulistComp from "./EnrolledStulistComp";

const enum_studenttution = {
  pending: "a",
  active: "b",
  rejected: "c",
  suspended: "d",
};

const { TabPane } = Tabs;
const { Content } = Layout;

export default function ClassDetails() {
  let { classid } = useParams();

  const [activeList, setActiveList] = useState([]);
  const [pendingList, setPendingList] = useState([]);

  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);
  const [popupvisible, setpopvisible] = useState(false);

  const [activeTab, setActiveTab] = useState("1");
  //const handleCancel = () => setpopupvisible(false);

  useEffect(() => {
    // let userid = authenticationservice.currentUserValue.id;
    axios
      .get(`${apiurl}/tutor/studenttution/class/${classid}`, authHeader())
      .then(({ data }) => {
        // setSchools(res.data);
        console.log(data);
        setActiveList(data.active);
        setPendingList(data.pending);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  const onListitemClickpending = async (e) => {
    setMdataLoading(false);
    const recordid = parseInt(e.currentTarget.id);
    setActiveTab("1");
    setModalData(pendingList.find((l) => l.id === recordid));
    setpopvisible(true);
  };
  const onListitemClickactive = async (e) => {
    setMdataLoading(false);
    setActiveTab("2");
    const recordid = parseInt(e.currentTarget.id);
    setModalData(activeList.find((l) => l.id === recordid));
    setpopvisible(true);
  };

  const onAccept = async () => {
    try {
      // change db
      await axios.patch(
        `${apiurl}/tutor/studenttution/status`,
        { id: modalData.id, status: enum_studenttution.active },
        authHeader()
      );

      setpopvisible(false);
      message.success("Student accepted successfully");

      // update ui
      const activedstu = pendingList.find(
        (student) => student.id === modalData.id
      );
      setActiveList([...activeList, activedstu]);
      setPendingList(
        pendingList.filter((student) => student.id !== modalData.id)
      );
    } catch (error) {
      message.error(error.message);
    }
  };

  const onReject = async () => {
    try {
      await axios.patch(
        `${apiurl}/tutor/studenttution/status`,
        { id: modalData.id, status: enum_studenttution.active },
        authHeader()
      );

      setpopvisible(false);
      message.success("Student rejected successfully");

      setPendingList(
        pendingList.filter((student) => student.id !== modalData.id)
      );
      setActiveList(
        activeList.filter((student) => student.id !== modalData.id)
      );
    } catch (error) {
      message.error(error.message);
    }
  };

  function callback(key) {
    console.log(key);
  }

  // const [popupvisible, setpopvisible] = useState(false);

  return (
    <ContentLayout
      title="Class Details"
      paths={["Home", "Dashboard", "ClassDetails"]}
    >
      <Content
        className="site-layout-background"
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Class Information" key="1">
                <PclassUpdateForm classid={classid} />
              </TabPane>
              <TabPane tab="Student Management" key="2">
                <Modal
                  visible={popupvisible}
                  onCancel={() => setpopvisible(false)}
                  title="Student Details"
                  footer={
                    activeTab === "1"
                      ? [
                          <Button
                            key="back"
                            onClick={() => setpopvisible(false)}
                          >
                            Cancel
                          </Button>,
                          <Button danger key="" onClick={onReject}>
                            Reject
                          </Button>,
                          <Button type="primary" onClick={onAccept}>
                            Accept
                          </Button>,
                        ]
                      : [
                          <Button danger key="" onClick={onReject}>
                            Revoke Account
                          </Button>,
                          <Button
                            type="primary"
                            onClick={() => setpopvisible(false)}
                          >
                            Close Modal
                          </Button>,
                        ]
                  }
                >
                  {!mdataLoading ? (
                    <Descriptions layout="vertical" title="User Info">
                      <Descriptions.Item label="Name">
                        {modalData.student.username}
                      </Descriptions.Item>
                      <Descriptions.Item label="School">
                        {modalData.student.school.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Telephone">
                        {modalData.student.phone}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {modalData.student.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Gender">
                        {modalData.student.gender}
                      </Descriptions.Item>
                      <Descriptions.Item label="Address">
                        {modalData.student.adr}
                      </Descriptions.Item>
                    </Descriptions>
                  ) : (
                    <Spin />
                  )}
                </Modal>
                <Row gutter={16}>
                  <Col xs={24} xl={12}>
                    <Card title="New Student Requests" className="studentcard">
                      <List
                        itemLayout="horizontal"
                        dataSource={pendingList}
                        renderItem={(item) => (
                          <List.Item
                            key={item.id}
                            id={item.id}
                            onClick={onListitemClickpending}
                          >
                            {" "}
                            {/*onClick={() => setpopvisible(true)}>*/}
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{ margin: 10 }}
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                              }
                              title={item.student.username}
                              description={item.student.school.name}
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>

                  {/* --------------------------------------------------------------- */}
                  <Col xs={24} xl={12}>
                    <Card title="Enrolled Students" className="studentcard">
                      <List
                        itemLayout="horizontal"
                        dataSource={activeList}
                        renderItem={(item) => (
                          <List.Item
                            key={item.id}
                            id={item.id}
                            onClick={onListitemClickactive}
                          >
                            {/*onClick={() => setpopvisible(true)}>*/}
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{ margin: 10 }}
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                              }
                              title={item.student.username}
                              description={item.student.school.name}
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              {/*----------------------------------------------------------------------------------------------------- */}

              {/* <TabPane tab="Enrolled Students" key="3">
                <Content
                  // className="site-layout-background"
                  style={{
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Row></Row>
                </Content>
              </TabPane> */}
            </Tabs>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
