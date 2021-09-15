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
  Row,
  Col,
  Typography,
} from "antd";

import ContentLayout from "components/ContentLayout";
import "./ClassInCharge.scss";
import classroomservice from "services/classroom.service";
import { enum_releifStatus, Enum_std_detail_status } from "utils/common";
import reliefservice from "services/relief.service";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

export default function ReliefPage() {
  const [popupvisible, setpopupvisible] = useState(false);
  const [reqList, setReqList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("1");
  //const handleCancel = () => setpopupvisible(false);

  useEffect(() => {
    reliefservice
      .getAllReleifs()
      .then((data) => {
        console.log(data);
        const reqs = data.filter(
          (rel) => rel.status === enum_releifStatus.pending
        );
        const active = data.filter(
          (rel) => rel.status === enum_releifStatus.active
        );
        setReqList(reqs);
        setActiveList(active);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  const onListitemClick = async (e) => {
    try {
      const relid = e.currentTarget.id;
      setMdataLoading(true);
      const data = await reliefservice.getReleif(relid);
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
      await reliefservice.setStatus(modalData.id, enum_releifStatus.active);
      setpopupvisible(false);
      message.success("Student accepted successfully");

      // update ui
      let pending = reqList.filter((req) => req.id !== modalData.id);
      setReqList(pending);

      let acepptedreq = reqList.find((req) => req.id === modalData.id);
      setActiveList([...activeList, acepptedreq]);
    } catch (error) {
      message.error(error.message);
    }
  };
  const onReject = async () => {
    try {
      await reliefservice.setStatus(modalData.id, enum_releifStatus.rejected);
      setpopupvisible(false);
      message.success("Student rejected successfully");

      // update ui
      let pending = reqList.filter((req) => req.id !== modalData.id);
      setReqList(pending);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <ContentLayout title="Relief Classes" paths={["Teacher", "Relief Classes"]}>
      <Modal
        visible={popupvisible}
        onCancel={() => setpopupvisible(false)}
        title="New relief class request"
        footer={[
          <Button key="back" onClick={() => setpopupvisible(false)}>
            Cancel
          </Button>,
          <Button danger onClick={onReject}>
            Reject
          </Button>,
          <Button type="primary" onClick={onAccept}>
            Accept
          </Button>,
        ]}
      >
        {!mdataLoading ? (
          <>
            <Title
              level={5}
            >{`${modalData.teachername} is won't able to do his/her class on ${modalData.date},Because you are free that period, you are requsted to take the relief class `}</Title>
            <Descriptions
              column={{ md: 2, xs: 1 }}
              // title="Class Details"
              layout="vertical"
            >
              <Descriptions.Item label="Subject">
                {modalData.subname}
              </Descriptions.Item>
              <Descriptions.Item label="Classroom">
                {modalData.classname}
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ backgroundColor: "#2196f3", color: "white" }}
                label="Date"
              >
                {modalData.date}
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ backgroundColor: "#2196f3", color: "white" }}
                label="Time"
              >
                {modalData.time}
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
        <Row>
          <Col xl={16} md={12} xs={24}>
            <Card title="Relief classes" className="mobilecard">
              <List
                itemLayout="horizontal"
                dataSource={activeList}
                renderItem={(item) => (
                  <Link to={"reliefclass/" + item.id}>
                    <List.Item
                      key={item.id}
                      id={item.id}
                      // onClick={onListitemClick}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{ margin: 10 }}
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          />
                        }
                        title={item.title}
                        description={item.date}
                      />
                      {/* <div>{item.date}</div> */}
                    </List.Item>
                  </Link>
                )}
              />
            </Card>
          </Col>
          <Col xl={8} md={12} xs={24}>
            <Card title="New relief class requests" className="mobilecard">
              <List
                itemLayout="horizontal"
                dataSource={reqList}
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
                      title={item.title}
                      description={item.date}
                    />
                    {/* <div>{item.date}</div> */}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
