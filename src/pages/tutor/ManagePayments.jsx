import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  List,
  Avatar,
  Modal,
  Button,
  Image,
  Descriptions,
  Select,
  Spin,
} from "antd";

import { Form, Input, message } from "antd";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

import ContentLayout from "components/ContentLayout";
import "./PaymentSlipCheck.scss";
import {enum_payment } from "utils/common";
import { getFileUrl } from "services/azureblob.service";

const { Content } = Layout;
const { Option } = Select;

export default function ManagePayments() {
  const [classRoom, setClassRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const [paidList, setPaidList] = useState([]);
  const [notpaidList, setNotPaidList] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [mdataLoading, setMdataLoading] = useState(true);
  

  // To disable submit button at the beginning.
  useEffect(() => {
    form.setFieldsValue({ month: new Date().getMonth() + 1 });
    forceUpdate({});
    let userid = authenticationservice.currentUserValue.id;
    axios
      .get(`${apiurl}/tutor/classes/list/${userid}`, authHeader())
      .then((res) => {
        setClassRooms(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    axios
      .get(`${apiurl}/tutor/tutorpayment/all`, authHeader())
      .then((res) => {
        setPaidList(res.data.paid);
        setNotPaidList(res.data.notpaid);
        //console.log(res.data.paid);
        //console.log(res.data.notpaid);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });    
  };

  const [paidvisible, setpaidvisible] = useState(false);
  const [notpaidvisible, setnotpaidvisible] = useState(false);

  //view the modal for the paid items
  const onclickpaiditem = async (e) => {
    try {
      const paymntid = e.currentTarget.id;
      setMdataLoading(true);
      const { data } = await axios.get(
        `${apiurl}/tutor/tutorpayment/${paymntid}`,
        authHeader()
      );
      console.log(data);
      setModalData(data);
      setMdataLoading(false);

      setpaidvisible(true);
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  //view the modal for the not paid items
  const onclicknotpaiditem = async (e) => {
    try {
      const paymntid = e.currentTarget.id;
      setMdataLoading(true);
      const { data } = await axios.get(
        `${apiurl}/tutor/tutorpayment/${paymntid}`,
        authHeader()
      );
      console.log(data);
      setModalData(data);
      setMdataLoading(false);
      //setMdataLoading(true);

      setnotpaidvisible(true);
    } catch (e) {
      //message.error(e.response.data.message);
    }
  };

  const onApprove = async () => {
    try {
      // change db

      await axios.patch(
        `${apiurl}/tutor/tutorpayment/status`,
        { id: modalData.id, status: enum_payment.accepted },
        authHeader()
      );
      setpaidvisible(false);
      message.success("Accepted the students payment successfully");

      
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  const onReject = async () => {
    try {
      await axios.patch(
        `${apiurl}/tutor/tutorpayment/status`,
        { id: modalData.id, status: enum_payment.rejected },
        authHeader()
      );
      setpaidvisible(false);
      message.success("Rejected the students payment successfully");

      // update ui
      const activedstu = paidList.find(
        (student) => student.id === modalData.id
      );
      setNotPaidList([...notpaidList, activedstu]);
      setPaidList(
        paidList.filter((student) => student.id !== modalData.id)
      );
      
    } catch (error) {
      message.error(error.message);
    }
  };

  {/*setPendingList(
    pendingList.filter((student) => student.id !== modalData.id)
  );
  setActiveList(
    activeList.filter((student) => student.id !== modalData.id)
  );*/}
  

  return (
    <ContentLayout title="Manage Payments" paths={["Home", "Manage Payments"]}>

      {/* Modal for the paid items*/}
      <Modal
        visible={paidvisible}
        onCancel={() => setpaidvisible(false)}
        footer={
          [
          <Button key="back" onClick={() => setpaidvisible(false)}>
            Cancel
          </Button>,
          <Button danger key="" onClick={onReject}>
            Reject
          </Button>,
          <Button type="primary" key="" onClick={onApprove}>
            Approve
          </Button>,
        ]}
      >
        <Image
          width={450}
          height={200}
         // src= {getFileUrl(modalData.filename)}
          
          
        />
      {!mdataLoading ? (
        <Descriptions>
          <Descriptions.Item label="Student ID">{modalData.student.id}</Descriptions.Item>
          <Descriptions.Item label="Name" span={3}>
              {modalData.student.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {modalData.student.email}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Number" span={3}>
            {modalData.student.phone}
          </Descriptions.Item>
         {/* <Descriptions.Item label="Submitted Date" span={3}>
            13-09-2021
          </Descriptions.Item>*/}
        </Descriptions>
        ) : (
          <Spin />
        )}
      </Modal>

      {/* Modal for the not paid items*/}
      <Modal
        visible={notpaidvisible}
        onCancel={() => setnotpaidvisible(false)}
        footer={[
          <Button key="back" onClick={() => setnotpaidvisible(false)}>
            Cancel
          </Button>,
          <Button danger key="" onClick={() => setnotpaidvisible(false)}>
            Remove Access
          </Button>,
        ]}
      >
        {!mdataLoading ? (
        <Descriptions>
          <Descriptions.Item label="Student ID">{modalData.student.id}</Descriptions.Item>
          <Descriptions.Item label="Name" span={3}>
             {modalData.student.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {modalData.student.email}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Number" span={3}>
            {modalData.student.phone}
          </Descriptions.Item>
        </Descriptions>
        ) : (
          <Spin />
        )}
      </Modal>

      <Content
        // className="site-layout-background"
        style={{
          //   padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Card style={{ marginBottom: 10 }}>
          <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item
              name="pclassid"
              label="Class"
              rules={[{ required: true, message: "Please select class!" }]}
            >
              <Select placeholder="Class" style={{ width: 180 }}>
                {classRoom.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {" "}
                    {item.subject + " | Grade " + item.grade}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="month"
              label="Month"
              rules={[{ required: true, message: "Please select Month!" }]}
            >
              <Select placeholder="Month" style={{ width: 80 }}>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
                <Option value={6}>6</Option>
                <Option value={7}>7</Option>
                <Option value={8}>8</Option>
                <Option value={9}>9</Option>
                <Option value={10}>10</Option>
                <Option value={11}>11</Option>
                <Option value={12}>12</Option>
              </Select>
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                  loading={loading}
                >
                  Select
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>


        <Row gutter="10">
          <Col xs={24} xl={12}>
            <Card title="Paid Students" className="paymentcard">
              <List
                itemLayout="horizontal"
                dataSource={paidList}
                renderItem={(item) => (
                  <List.Item 
                    key={item.id}
                    id={item.id}
                    //onClick={() => setpaidvisible(true)}
                    onClick={onclickpaiditem}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ margin: 10 }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      }
                      title={item.student.username}
                      description={item.student.phone}
                    />
                  </List.Item>
                )}
              ></List>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card title="Not Paid Students" className="paymentcard">
              <List
                itemLayout="horizontal"
                dataSource={notpaidList}
                renderItem={(item) => (
                  <List.Item 
                    key={item.id}
                    id={item.id}
                    //onClick={() => setpaidvisible(true)}
                    onClick={onclicknotpaiditem}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ margin: 10 }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      }
                      title={item.student.username}
                      description={item.student.phone}
                    />
                  </List.Item>
                )}
              ></List>
            </Card>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
