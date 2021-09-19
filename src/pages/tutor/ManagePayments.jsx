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
} from "antd";

import { Form, Input, message } from "antd";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

import ContentLayout from "components/ContentLayout";
import "./PaymentSlipCheck.scss";

const { Content } = Layout;
const { Option } = Select;

const paidList = [
  {
    id: 1001,
    name: "Shashini Tharuka",
    email: "shashinit@gmail.com",
    telnum: "0710019452",
    submit: "03-09-2021",
  },
  {
    id: 1002,
    name: "Lakshan Sandaruwan",
    email: "lakshan@gmail.com",
    telnum: "0718519452",
    submit: "01-09-2021",
  },
  {
    id: 1003,
    name: "Shamali Sathindra",
    email: "shamali@gmail.com",
    telnum: "0718919452",
    submit: "08-09-2021",
  },
  {
    id: 1004,
    name: "Sewwandi Navodya",
    email: "sewwandi@gmail.com",
    telnum: "0710011022",
    submit: "12-09-2021",
  },
];

const notPaidList = [
  {
    id: 1021,
    name: "Thenura Perera",
    email: "thenura@gmail.com",
    telnum: "0711519452",
  },
  {
    id: 1007,
    name: "Mewantha Fernando",
    email: "mewantha@gmail.com",
    telnum: "0718009452",
  },
  {
    id: 1008,
    name: "Sahan Viraj",
    email: "sahanviraj@gmail.com",
    telnum: "0718519300",
  },
  {
    id: 1015,
    name: "Chethaka Kalmith",
    email: "chethaka@gmail.com",
    telnum: "0779519452",
  },
];

export default function ManagePayments() {
  const [classRoom, setClassRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

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
    try {
      setLoading(true);

      setLoading(false);
    } catch (error) {}
  };

  const [paidvisible, setpaidvisible] = useState(false);
  const [notpaidvisible, setnotpaidvisible] = useState(false);

  return (
    <ContentLayout title="Manage Payments" paths={["Home", "Manage Payments"]}>
      <Modal
        visible={paidvisible}
        onCancel={() => setpaidvisible(false)}
        footer={[
          <Button key="back" onClick={() => setpaidvisible(false)}>
            Cancel
          </Button>,
          <Button danger key="" onClick={() => setpaidvisible(false)}>
            Reject
          </Button>,
          <Button type="primary" key="" onClick={() => setpaidvisible(false)}>
            Approve
          </Button>,
        ]}
      >
        <Image
          width={450}
          height={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />

        <Descriptions>
          <Descriptions.Item label="Student ID">1001</Descriptions.Item>
          <Descriptions.Item label="Name" span={3}>
            Shashini Tharuka
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            shashini@gamil.com
          </Descriptions.Item>
          <Descriptions.Item label="Contact Number" span={3}>
            0718956123
          </Descriptions.Item>
          <Descriptions.Item label="Submitted Date" span={3}>
            13-09-2021
          </Descriptions.Item>
        </Descriptions>

        {/* <p><b>Student ID :</b>   </p>
                <p><b>Name : </b>   </p>
                <p><b>Email :</b>    </p>
                <p><b>Contact Number :</b>   </p>
                <p><b>Submitted Date :</b>   </p>*/}
      </Modal>
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
        <Descriptions>
          <Descriptions.Item label="Student ID">1021</Descriptions.Item>
          <Descriptions.Item label="Name" span={3}>
            Sahan Viraj
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            sahanviraj@gamil.com
          </Descriptions.Item>
          <Descriptions.Item label="Contact Number" span={3}>
            0718956123
          </Descriptions.Item>
        </Descriptions>

        {/*<p><b>Student ID :</b> </p>
                <p><b>Name : </b>      </p>
                <p><b>Email : </b>     </p>
                <p><b>Contact Number : </b>  </p>*/}
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
              name="pclass"
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
            {/* <Form.Item
              name="grade"
              rules={[{ required: true, message: "Please input grade!" }]}
            >
              <Input
                type="number"
                min="1"
                max="13"
                placeholder="Grade"
                width="400"
              />
            </Form.Item> */}
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
                  <List.Item onClick={() => setpaidvisible(true)}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ margin: 10 }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      }
                      title={item.id + "      " + item.name}
                      description={"Submit Date -   " + item.submit}
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
                dataSource={notPaidList}
                renderItem={(item) => (
                  <List.Item onClick={() => setnotpaidvisible(true)}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ margin: 10 }}
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                      }
                      title={item.id + "      " + item.name}
                      description={item.telnum}
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
