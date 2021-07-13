import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Form, Select, Button, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import ContentLayout from "components/ContentLayout";

const { Option } = Select;

const spacestyle = {
  display: "flex",
  marginBottom: 8,
  justifyContent: "center",
};

const teachers = [
  { id: 1, name: "Mr.Perera" },
  { id: 2, name: "Mr.Shamalii" },
  { id: 3, name: "Mrs.Sewwandi" },
];

const subjects = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Gen. English" },
];
export default function TimeSlotManagePage() {
  const [level, setLevel] = useState("pri");
  const [teacher, setTeacher] = useState([
    { subject: subjects[0].id, teacher: teachers[0].id },
  ]);
  const { Content } = Layout;
  const [clsselectform] = Form.useForm();
  const [timeslotform] = Form.useForm();
  useEffect(() => {
    timeslotform.setFieldsValue({ subjects: teacher });
  }, [timeslotform, teacher]);

  const LevelChange = ({ level }) => {
    setTeacher([{ subject: subjects[1].id, teacher: teachers[1].id }]);
    console.log(level);
  };
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <ContentLayout
      title="TimeSlot Management"
      paths={["SchoolAdmin", "Dashboard"]}
    >
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="container-back">
          <Row>
            <Col sm={24} xl={24}>
              <Form
                style={{ justifyContent: "center" }}
                layout="inline"
                form={clsselectform}
                onFinish={LevelChange}
                initialValues={{ level: level }}
              >
                <Form.Item
                  name="level"
                  label="Level"
                  rules={[
                    {
                      required: true,
                      message: "Please select grade!",
                    },
                  ]}
                >
                  <Select placeholder="select grade" style={{ minWidth: 100 }}>
                    <Option value="pri">Primary</Option>
                    <Option value="ol">Ordinary Level</Option>
                    <Option value="al">Advanced Level</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Select
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col sm={24} xl={24}>
              <Form
                form={timeslotform}
                initialValues={{
                  subjects: teacher,
                }}
                style={{ justifyContent: "center", marginTop: 30 }}
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.List name="subjects">
                  {(fields, { add, remove }) => {
                    // console.log(fields);

                    return (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} align="baseline" style={spacestyle}>
                            <Form.Item
                              {...restField}
                              name={[name, "subject"]}
                              fieldKey={[fieldKey, "subject"]}
                              rules={[
                                { required: true, message: "Missing subject" },
                              ]}
                            >
                              <Select
                                placeholder="select subject"
                                style={{ minWidth: 150 }}
                              >
                                {subjects.map((subject) => (
                                  <Option key={subject.id} value={subject.id}>
                                    {subject.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "teacher"]}
                              fieldKey={[fieldKey, "teacher"]}
                              rules={[
                                { required: true, message: "Missing teacher" },
                              ]}
                            >
                              <Select
                                placeholder="select teacher"
                                style={{ minWidth: 150 }}
                              >
                                {teachers.map((teacher) => (
                                  <Option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Space align="baseline" style={spacestyle}>
                          <Form.Item>
                            <Button
                              style={{ width: 350, minWidth: 260 }}
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Subject
                            </Button>
                          </Form.Item>
                        </Space>
                      </>
                    );
                  }}
                </Form.List>
                <Space align="baseline" style={spacestyle}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </ContentLayout>
  );
}
