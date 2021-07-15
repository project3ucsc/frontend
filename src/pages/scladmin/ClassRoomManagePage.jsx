import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Select,
  Button,
  Space,
  Typography,
  message,
  Input,
} from "antd";
import ContentLayout from "components/ContentLayout";
import "./ClassRoomManagePage.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import classroomservice from "services/classroom.service";

const { Option } = Select;
const { Title } = Typography;

const spacestyle = {
  display: "flex",
  marginBottom: 8,
  justifyContent: "center",
};

export default function ClassRoomManagePage() {
  const { Content } = Layout;
  const [SubjectDetails, setSubjectDetails] = useState([]);

  // states for upper form
  const [gradeclassform] = Form.useForm();
  const [gradesnclasses, setGradesnclasses] = useState([]);
  const [gradecount, setGradecount] = useState([]);

  const [grade, setGrade] = useState("");
  const [classno, setClassno] = useState();

  // states for down form
  const [subjectform] = Form.useForm();
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    classroomservice
      .getsection_and_no_classes()
      .then((data) => {
        setGradesnclasses(data);
        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  useEffect(() => {
    subjectform.setFieldsValue({ subjects: SubjectDetails });
  }, [subjectform, SubjectDetails]);

  const onClassRoomSelect = async (val) => {
    const splitedgrade = val.grade.split(".");
    setGrade(splitedgrade[0]);
    setClassno(val.class);
    try {
      let data = await classroomservice.getclassdetails(
        splitedgrade[0],
        val.class
      );
      setSubjects(data.subjects);
      setTeachers(data.teachers);
      console.log(data);

      if (data.allsubjectdetails.subject_detail.length === 0) {
        setIsConfigured(false);
        let compulsorysubs = data.subjects.filter((sub) => {
          return sub.subjectgroup === "COMP";
        });
        // let mappedsubdetails = data.allsubjectdetails.subject_detail.map(
        let mappedsubdetails = compulsorysubs.map((subject) => {
          return {
            subject: subject.id,
            teacher: null,
          };
        });
        setSubjectDetails(mappedsubdetails);
      } else {
        // setIsConfigured(true);

        let mappedsubdetails = data.allsubjectdetails.subject_detail.map(
          (subject_detail) => {
            // let mappedsubdetails = compulsorysubs.map((subject) => {
            return {
              subject: subject_detail.subject.id,
              teacher: subject_detail.teacher.id,
            };
          }
        );
        setSubjectDetails(mappedsubdetails);
      }

      // console.log(mappedsubdetails);
    } catch (error) {
      console.log(error);
    }
  };

  const onGradeChange = (val) => {
    const data = val.split(".");
    setGradecount(parseInt(data[1]));
    gradeclassform.setFieldsValue({ class: null });
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
          <Title level={4}>
            Configuring subjects and teachers of each class
          </Title>
          <Title type="secondary" level={5}>
            Select grade ans class name
          </Title>
          <Row>
            <Col sm={24} xl={24}>
              <Form
                form={gradeclassform}
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
                  <Select
                    placeholder="select grade"
                    style={{ minWidth: 100 }}
                    onChange={onGradeChange}
                  >
                    {gradesnclasses.map((gradesnclass) => {
                      return (
                        <Option
                          value={
                            gradesnclass.grade + "." + gradesnclass.classcount
                          }
                        >
                          {gradesnclass.grade}
                        </Option>
                      );
                    })}
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
                    {[...Array(gradecount)].map((e, i) => (
                      <Option value={i + 1}>{i + 1}</Option>
                    ))}
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
              {!isConfigured && (
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
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Space
                                key={key}
                                align="baseline"
                                style={spacestyle}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "sdid"]}
                                  fieldKey={[fieldKey, "sdid"]}
                                >
                                  <Input defaultValue="null" hidden />
                                </Form.Item>

                                <Form.Item
                                  {...restField}
                                  name={[name, "subject"]}
                                  fieldKey={[fieldKey, "subject"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing subject",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="select subject"
                                    style={{ minWidth: 150 }}
                                  >
                                    {subjects.map((subject) => (
                                      <Option
                                        key={subject.id}
                                        value={subject.id}
                                      >
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
                                    {
                                      required: true,
                                      message: "Missing teacher",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="select teacher"
                                    style={{ minWidth: 150 }}
                                  >
                                    {teachers.map((teacher) => (
                                      <Option
                                        key={teacher.id}
                                        value={teacher.id}
                                      >
                                        {teacher.username}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => {
                                    remove(name);
                                    console.log(fieldKey);
                                  }}
                                />
                              </Space>
                            )
                          )}
                          <Space align="baseline" style={spacestyle}>
                            <Form.Item>
                              <Button
                                style={{ width: 330, minWidth: 260 }}
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
                      <Button
                        style={{ marginRight: 25 }}
                        type="default"
                        htmlType="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ marginLeft: 25 }}
                        type="primary"
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
              )}
              {isConfigured && (
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
                  <Space align="baseline" style={spacestyle}>
                    <Form.Item>
                      <Button
                        style={{ marginRight: 25 }}
                        type="default"
                        htmlType="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ marginLeft: 25 }}
                        type="primary"
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
              )}{" "}
            </Col>
          </Row>
        </div>
      </Content>
    </ContentLayout>
  );
}
