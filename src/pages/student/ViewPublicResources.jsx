import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  List,
  Avatar,
  Button,
  Descriptions,
  Select,
} from "antd";

import { Form, Input, message } from "antd";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";
import { DownloadOutlined,FolderOpenTwoTone,ScheduleTwoTone,SnippetsFilled,CopyFilled,PushpinFilled } from '@ant-design/icons';

import ContentLayout from "components/ContentLayout";
import "../tutor/PaymentSlipCheck.scss";

const { Content } = Layout;
const { Option } = Select;

{/*const publicList = [
  {
    id: 1001,
    name: "Shashini Tharuka",
    email: "shashinit@gmail.com",
  },
  {
    id: 1002,
    name: "Lakshan Sandaruwan",
    email: "lakshan@gmail.com",
  },
  {
    id: 1003,
    name: "Shamali Sathindra",
    email: "shamali@gmail.com",
  },
  {
    id: 1004,
    name: "Sewwandi Navodya",
    email: "sewwandi@gmail.com",
  },
];*/}

export default function ManagePayments() {
  const [classRoom, setClassRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  /*useEffect(() => {
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
  }, []);*/

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);

      setLoading(false);
    } catch (error) {}
  };

  return (
    <ContentLayout title="Public Resources" paths={["Home", "Public Resources"]}>
      
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
              name="grade"
              label="Grade"
              rules={[{ required: true, message: "Please select grade!" }]}
            >
              <Select placeholder="Grade" style={{ width: 80 }}>
                <Option value={"G1"}>1</Option>
                <Option value={"G2"}>2</Option>
                <Option value={"G3"}>3</Option>
                <Option value={"G4"}>4</Option>
                <Option value={"G5"}>5</Option>
                <Option value={"G6"}>6</Option>
                <Option value={"G7"}>7</Option>
                <Option value={"G8"}>8</Option>
                <Option value={"G9"}>9</Option>
                <Option value={"G10"}>10</Option>
                <Option value={"G11"}>11</Option>
                <Option value={"G12MATH"}>12 Maths</Option>
                <Option value={"G12BIO"}>12 Bio</Option>
                <Option value={"G12ART"}>12 Art</Option>
                <Option value={"G12COM"}>12 Commerce</Option>
                <Option value={"G12TECH"}>12 Tech</Option>
                <Option value={"G13MATH"}>13 Maths</Option>
                <Option value={"G13BIO"}>13 Bio</Option>
                <Option value={"G13ART"}>13 Art</Option>
                <Option value={"G13COM"}>13 Commerce</Option>
                <Option value={"G13TECH"}>13 Tech</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please select the subject!" }]}
            >
              <Select placeholder="Subject" style={{ width: 180 }}>
                {classRoom.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.subject}
                  </Option>
                ))}
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
          <Col xs={24} xl={24}>

            
            <Card title="Public Resources" className="paymentcard">
              <List
                itemLayout="horizontal"
                //dataSource={publicList}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                          <PushpinFilled style={{ fontSize: '18px', color: '#08c',margin: 20 }} />
                          
                      }
                      title={"Name/Title of the resources"}
                      description={"Section -   " }
                    />

                    <Col className="editbtn">
                      <Row>
                       {/* <a
                          style={{ marginLeft: 15 }}
                          //href={}
                        >
                          Download Resource
                       </a>*/}

                      <Button style={{ margin: 8 }} type="primary"  icon={<DownloadOutlined />} >
                        Download
                      </Button>
                      </Row>
                  </Col>

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
