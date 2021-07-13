import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Form, Select, Button, Space } from "antd";
import ContentLayout from "components/ContentLayout";
import "./ClassRoomManagePage.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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

export default function ClassRoomManagePage() {
  const { Content } = Layout;
  const [SubjectDetails, setSubjectDetails] = useState([
    { subject: subjects[0].id, teacher: teachers[0].id },
    { subject: subjects[1].id, teacher: teachers[1].id },
    { subject: subjects[2].id, teacher: teachers[2].id },
  ]);
  const [subjectform] = Form.useForm();

  useEffect(() => {
    subjectform.setFieldsValue({ subjects: SubjectDetails });
  }, [subjectform, SubjectDetails]);

  const onClassRoomSelect = (val) => {
    setSubjectDetails([{ subject: subjects[1].id, teacher: teachers[1].id }]);
    console.log(val);
  };
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <ContentLayout
      title="Classroom Management"
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
                // form={clsselectform}
                onFinish={onClassRoomSelect}
              >
                <Form.Item
                  name="grade"
                  label="Grade"
                  rules={[
                    {
                      required: true,
                      message: "Please select grade!",
                    },
                  ]}
                >
                  <Select placeholder="select grade" style={{ minWidth: 100 }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="class"
                  label="Class"
                  rules={[
                    {
                      required: true,
                      message: "Please select class!",
                    },
                  ]}
                >
                  <Select placeholder="select class" style={{ minWidth: 100 }}>
                    <Option value="2">A</Option>
                    <Option value="3">B</Option>
                    <Option value="4">C</Option>
                    <Option value="5">D</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col sm={24} xl={24}>
              <Form
                form={subjectform}
                initialValues={{
                  subjects: SubjectDetails,
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
