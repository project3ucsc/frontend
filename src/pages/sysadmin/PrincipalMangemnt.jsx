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
import { Role } from "utils/common";
import authenticationservice from "services/authentication.service";

const { TabPane } = Tabs;
const { Content } = Layout;

export default function PrincipalMangemnt() {
  const [popupvisible, setpopupvisible] = useState(false);
  const [activeList, setActiveList] = useState([]);
  const [pendingList, setPendingList] = useState([]);

  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("1");
  //const handleCancel = () => setpopupvisible(false);

  useEffect(() => {
    authenticationservice
      .getPendingNAciveAccounts(Role.PRINCIPAl)
      .then((data) => {
        // console.log(data);
        setActiveList(data.active);
        setPendingList(data.pending);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  const onListitemClick = async (e) => {
    try {
      const userid = e.currentTarget.id;
      setMdataLoading(true);
      const data = await authenticationservice.getUserDetail(userid);
      console.log(data);
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
      await authenticationservice.setAccountStatus("ACTIVE", modalData.id);
      setpopupvisible(false);
      message.success("Teacher accepted successfully");

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
      await authenticationservice.setAccountStatus("REVOKED", modalData.id);
      setpopupvisible(false);
      message.success("Teacher rejected successfully");

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
      title="Princpal Managment"
      paths={["SystemAdmin", "Princpal Managment"]}
    >
      <Modal
        visible={popupvisible}
        onCancel={() => setpopupvisible(false)}
        title="Principal Details"
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
                  Revoke Account
                </Button>,
                <Button type="primary" onClick={() => setpopupvisible(false)}>
                  Close Modal
                </Button>,
              ]
        }
      >
        {!mdataLoading ? (
          <>
            <Descriptions layout="vertical" title="Principal Info">
              <Descriptions.Item label="Name">
                {modalData.username}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {modalData.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {modalData.email}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {modalData.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {modalData.adr}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions layout="vertical" title="School Info">
              <Descriptions.Item label="Name">
                {modalData.school.name}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {modalData.school.address}
              </Descriptions.Item>
            </Descriptions>
          </>
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
          <TabPane tab="New Principal accounts" key="1">
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
                      title={item.username}
                      description={item.email}
                    />
                    <div>{item.school.name}</div>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          <TabPane tab="Approved Principals" key="2">
            {/* <Col xs={24} xl={24}> */}
            <Card title="Principal List" className="teacherclscard">
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
                      title={item.username}
                      description={item.email}
                    />
                    <div>{item.school.name}</div>
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
