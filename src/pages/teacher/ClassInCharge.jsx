import React, { useState, useEffect } from "react";
import {
  Layout,
  Modal,
  Button,
  Descriptions,
  Card,
  List,
  Avatar,
  Tabs,
  message,
  Spin,
} from "antd";

import ContentLayout from "components/ContentLayout";
import "./ClassInCharge.scss";
import classroomservice from "services/classroom.service";
import { Enum_std_detail_status, getSubGroupDiscription } from "utils/common";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function ClassInCharge() {
  const [popupvisible, setpopupvisible] = useState(false);
  const [studentList, setStudentList] = useState({ aprroved: [], pending: [] });
  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("1");
  //const handleCancel = () => setpopupvisible(false);

  useEffect(() => {
    classroomservice
      .getEnrolledStudents()
      .then((data) => {
        const { classroom, students } = data;
        console.log(classroom, students);
        const pending = students.filter(
          (student) => student.status === Enum_std_detail_status.PENDING
        );
        const aprroved = students.filter(
          (student) => student.status === Enum_std_detail_status.ACTIVE
        );
        setStudentList({ aprroved, pending });
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  const onListitemClick = async (e) => {
    try {
      const stdid = e.currentTarget.id;
      setMdataLoading(true);
      const data = await classroomservice.getStudentDetail(stdid);
      // console.log(data);
      setModalData(data);
      setMdataLoading(false);

      setpopupvisible(true);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onAccept = async () => {
    try {
      // change db
      await classroomservice.setStdStatus(
        modalData.id,
        Enum_std_detail_status.ACTIVE
      );
      setpopupvisible(false);
      message.success("Student accepted successfully");

      // update ui
      let { aprroved, pending } = studentList;
      const activedstu = pending.find((student) => student.id === modalData.id);
      aprroved.push({ ...activedstu, status: "ACTIVE" });
      pending = pending.filter((student) => student.id !== modalData.id);
      setStudentList({ aprroved, pending });
    } catch (error) {
      message.error(error.message);
    }
  };
  const onReject = async () => {
    try {
      await classroomservice.setStdStatus(
        modalData.id,
        Enum_std_detail_status.REJECTED
      );
      setpopupvisible(false);
      message.success("Student rejected successfully");

      // update ui
      let { aprroved, pending } = studentList;
      const activedstu = pending.find((student) => student.id === modalData.id);
      aprroved.push({ ...activedstu, status: "REJECTED" });
      pending = pending.filter((student) => student.id !== modalData.id);
      setStudentList({ aprroved, pending });
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <ContentLayout title="Class In Charge" paths={["teacher", "ClassInCharge"]}>
      <Modal
        visible={popupvisible}
        onCancel={() => setpopupvisible(false)}
        title="Student Details"
        footer={
          activeTab === "1"
            ? [
                <Button key="back" onClick={() => setpopupvisible(false)}>
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
                <Button type="primary" onClick={() => setpopupvisible(false)}>
                  OK
                </Button>,
              ]
        }
      >
        {!mdataLoading ? (
          <>
            <Descriptions title="Student Details" layout="vertical">
              <Descriptions.Item label="Student ID">
                {modalData.regid}
              </Descriptions.Item>
              <Descriptions.Item label="Student name" span={2}>
                {modalData.user.username}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {modalData.user.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Student email" span={2}>
                {modalData.user.email}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Address" span={3}>
            76/16A, Sunethradevi Rd, Nugegoda
          </Descriptions.Item> */}
            </Descriptions>
            <Descriptions title="Subject Details" layout="vertical">
              {modalData.optionalsubs.map((sub) => (
                <Descriptions.Item
                  label={getSubGroupDiscription(sub.subjectgroup)}
                >
                  {sub.subject_detail.subject.name}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </>
        ) : (
          <Spin />
        )}
      </Modal>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {/* <Row gutter={16}> */}
        <Tabs
          type="card"
          defaultActiveKey="1"
          onChange={(key) => setActiveTab(key)}
        >
          <TabPane tab="New Student Requests" key="1">
            <Card title="Pending Requests" className="teacherclscard">
              <List
                itemLayout="horizontal"
                dataSource={studentList.pending}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    id={item.id}
                    onClick={onListitemClick}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ margin: 10 }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      }
                      title={item.user.username}
                      description={"Student ID: " + item.regid}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          <TabPane tab="Approved Students" key="2">
            {/* <Col xs={24} xl={24}> */}
            <Card title="Student List" className="teacherclscard">
              <List
                itemLayout="horizontal"
                dataSource={studentList.aprroved}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    id={item.id}
                    onClick={onListitemClick}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ margin: 10 }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      }
                      title={item.user.username}
                      description={"Student ID: " + item.regid}
                    />
                    <div>{item.status}</div>
                  </List.Item>
                )}
              />
            </Card>
            {/* </Col> */}
          </TabPane>
        </Tabs>
      </Content>
    </ContentLayout>
  );
}
