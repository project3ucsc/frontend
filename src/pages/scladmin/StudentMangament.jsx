import React, { useState, useEffect } from "react";
import {
  Layout,
  Modal,
  Button,
  Descriptions,
  Card,
  List,
  Avatar,
  message,
  Spin,
} from "antd";

import ContentLayout from "components/ContentLayout";
import { Role } from "utils/common";
import authenticationservice from "services/authentication.service";

const { Content } = Layout;

export default function StudentMangament() {
  const [popupvisible, setpopupvisible] = useState(false);
  const [activeList, setActiveList] = useState([]);
  const [pendingList, setPendingList] = useState([]);

  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);

  useEffect(() => {
    authenticationservice
      .getPendingNAciveAccounts(Role.STUDENT)
      .then((data) => {
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

  // const onAccept = async () => {
  //   try {
  //     // change db
  //     await authenticationservice.setAccountStatus("ACTIVE", modalData.id);
  //     setpopupvisible(false);
  //     message.success("Teacher accepted successfully");

  //     // update ui
  //     const activedstu = pendingList.find(
  //       (student) => student.id === modalData.id
  //     );
  //     setActiveList([...activeList, activedstu]);
  //     setPendingList(
  //       pendingList.filter((student) => student.id !== modalData.id)
  //     );
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // };

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
      title="Student Management"
      paths={["SchoolAdmin", "Student Management"]}
    >
      <Modal
        visible={popupvisible}
        onCancel={() => setpopupvisible(false)}
        title="Student Details"
        footer={[
          <Button danger key="" onClick={onReject}>
            Revoke Account
          </Button>,
          <Button type="primary" onClick={() => setpopupvisible(false)}>
            Close Modal
          </Button>,
        ]}
      >
        {!mdataLoading ? (
          <Descriptions layout="vertical" title="User Info">
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
        <Card title="Student List" className="teacherclscard">
          <List
            itemLayout="horizontal"
            dataSource={activeList}
            renderItem={(item) => (
              <List.Item key={item.id} id={item.id} onClick={onListitemClick}>
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
                <div>{item.status}</div>
              </List.Item>
            )}
          />
        </Card>
      </Content>
    </ContentLayout>
  );
}
