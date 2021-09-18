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
// import "./ClassInCharge.scss";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl, enum_tutorschool_req } from "utils/common";
import authenticationservice from "services/authentication.service";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function ViewTutorRequestPage() {
  const [popupvisible, setpopupvisible] = useState(false);
  const [activeList, setActiveList] = useState([]);
  const [pendingList, setPendingList] = useState([]);

  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("1");
  //const handleCancel = () => setpopupvisible(false);

  useEffect(() => {
    let school_id = authenticationservice.currentUserValue.school_id;
    axios
      .get(`${apiurl}/tutor/tutorschoolreq/all/${school_id}`, authHeader())
      .then((res) => {
        setActiveList(res.data.active);
        setPendingList(res.data.pending);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });

    // console.log(data);
  }, []);

  const onListitemClick = async (e) => {
    try {
      const reqid = e.currentTarget.id;
      setMdataLoading(true);
      const { data } = await axios.get(
        `${apiurl}/tutor/tutorschoolreq/${reqid}`,
        authHeader()
      );
      console.log(data);
      setModalData(data);
      setMdataLoading(false);

      setpopupvisible(true);
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  const onAccept = async () => {
    try {
      // change db

      await axios.patch(
        `${apiurl}/tutor/tutorschoolreq/status`,
        { id: modalData.id, status: enum_tutorschool_req.active },
        authHeader()
      );
      setpopupvisible(false);
      message.success("Tutor accepted successfully");

      // update ui
      const activedstu = pendingList.find(
        (student) => student.id === modalData.id
      );
      setActiveList([...activeList, activedstu]);
      setPendingList(
        pendingList.filter((student) => student.id !== modalData.id)
      );
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  const onReject = async () => {
    try {
      await axios.patch(
        `${apiurl}/tutor/tutorschoolreq/status`,
        { id: modalData.id, status: enum_tutorschool_req.rejected },
        authHeader()
      );
      setpopupvisible(false);
      message.success("Tutor rejected successfully");

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

  return (
    <ContentLayout
      title="Tutor Management"
      paths={["SchoolAdmin", "Tutor Management"]}
    >
      <Modal
        visible={popupvisible}
        onCancel={() => setpopupvisible(false)}
        title="Tutor Details"
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
                <Button danger key="" onClick={onReject}>
                  Remove from school
                </Button>,
                <Button type="primary" onClick={() => setpopupvisible(false)}>
                  Close Modal
                </Button>,
              ]
        }
      >
        {!mdataLoading ? (
          <Descriptions layout="vertical">
            <Descriptions.Item label="Name">
              {modalData.tutor.username}
            </Descriptions.Item>
            <Descriptions.Item label="telephone Number">
              {modalData.tutor.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {modalData.tutor.email}
            </Descriptions.Item>
            <Descriptions.Item label="Qualification" span={3}>
              {modalData.qualification}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {modalData.discription}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Spin />
        )}
      </Modal>
      <Content
        style={{
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
          <TabPane tab="New Tutor requests" key="1">
            <Card title="Pending Requests" className="teacherclscard">
              <List
                itemLayout="horizontal"
                dataSource={pendingList}
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
                      title={item.tutor.username}
                      description={item.tutor.email}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          <TabPane tab="Approved Tutors" key="2">
            {/* <Col xs={24} xl={24}> */}
            <Card title="Tutor List" className="teacherclscard">
              <List
                itemLayout="horizontal"
                dataSource={activeList}
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
                      title={item.tutor.username}
                      description={item.tutor.email}
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
