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
  Popconfirm,
  Divider,
  Empty,
} from "antd";
import ContentLayout from "components/ContentLayout";
import "./ClassRoomManagePage.scss";
import { PlusOutlined } from "@ant-design/icons";
import classroomservice from "services/classroom.service";

const { Option } = Select;
const { Title } = Typography;

const spacestyle = {
  display: "flex",
  marginBottom: 0,
  height: 51,
  justifyContent: "center",
};
const searchpropsforSelect = {
  showSearch: true,
  optionFilterProp: "children",
  filterOption: (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
};

function SubTeacherListItem({ teachers, subjects, sd, remove }) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showdeletePopconfirm = () => {
    setVisible(true);
  };

  const handleOkdelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);

      // update ui
      remove(sd.id);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const onFinish = async (val) => {
    try {
      if (!disabled) {
        setLoading(true);
        console.log(val);
        await classroomservice.updateSubjectDetail(val, sd.id);
        message.success("Subject detail upadted succesfully");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }

    setDisabled(!disabled);
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        subject: sd.subjectid,
        teacher: sd.teacher_id,
      }}
    >
      <Space
        // key={key}
        align="baseline"
        style={spacestyle}
      >
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "Missing subject",
            },
          ]}
        >
          <Select
            {...searchpropsforSelect}
            disabled={disabled}
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
          name="teacher"
          rules={[
            {
              required: true,
              message: "Missing teacher",
            },
          ]}
        >
          <Select
            {...searchpropsforSelect}
            placeholder="select teacher"
            style={{ minWidth: 150 }}
            disabled={disabled}
          >
            {teachers.map((teacher) => (
              <Option key={teacher.id} value={teacher.id}>
                {teacher.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button htmlType="submit" loading={loading}>
          {disabled ? "Edit" : "Save"}
        </Button>
        <Popconfirm
          title="Are you sure to remove？"
          visible={visible}
          onConfirm={handleOkdelete}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <Button danger onClick={showdeletePopconfirm}>
            Remove
          </Button>
        </Popconfirm>
      </Space>
    </Form>
  );
}

export default function ClassRoomManagePage() {
  const { Content } = Layout;

  // states for upper form
  const [gradeclassform] = Form.useForm();
  const [gradesnclasses, setGradesnclasses] = useState([]);
  const [gradecount, setGradecount] = useState([]);

  // states for down form
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [SubjectDetails, setSubjectDetails] = useState([]);
  const [classroomid, setclassroomid] = useState(0);
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

  const onClassRoomSelect = async (val) => {
    const splitedgrade = val.grade.split(".");

    try {
      // get subjects and teachers and current subdetails for the class
      let data = await classroomservice.getclassdetails(
        splitedgrade[0],
        val.class
      );
      setSubjects(data.subjects);
      setTeachers(data.teachers);
      setclassroomid(data.allsubjectdetails.id);
      // console.log(data);
      console.log(data.allsubjectdetails);
      setSubjectDetails(data.allsubjectdetails.subject_detail);

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

  const onAddSubjectDetail = async ({ subject, teacher }) => {
    try {
      // add new sd to database
      const new_sd = await classroomservice.addSubjectDetail(
        subject,
        teacher,
        classroomid
      );
      // update the ui
      setSubjectDetails([
        ...SubjectDetails,
        { id: new_sd.id, subjectid: subject, teacher_id: teacher },
      ]);
      message.success("New subject detail added succesfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const removeSubjectDetail = async (id) => {
    try {
      // remove sd from database
      await classroomservice.removeSubjectDetail(id);
      // update the ui
      setSubjectDetails(SubjectDetails.filter((sd) => sd.id !== id));
      message.success("The subject detail deleted succesfully");
    } catch (error) {
      message.error(error.message);
    }
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
            Select grade and class name
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
                    {...searchpropsforSelect}
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
                  <Select
                    placeholder="select class"
                    style={{ minWidth: 100 }}
                    {...searchpropsforSelect}
                  >
                    {[...Array(gradecount)].map((e, i) => (
                      <Option value={i + 1}>{i + 1}</Option>
                    ))}
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
          <Divider />

          <Row>
            <Col sm={24} xl={24}>
              <Form
                style={{ justifyContent: "center" }}
                name="dynamic_form_nest_item"
                onFinish={onAddSubjectDetail}
                autoComplete="off"
              >
                <Title style={{ textAlign: "center" }} level={5}>
                  Add subjects and teachers for the class
                </Title>
                <Space
                  // key={key}
                  align="baseline"
                  style={spacestyle}
                >
                  <Form.Item
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: "Missing subject",
                      },
                    ]}
                  >
                    <Select
                      {...searchpropsforSelect}
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
                    name="teacher"
                    rules={[
                      {
                        required: true,
                        message: "Missing teacher",
                      },
                    ]}
                  >
                    <Select
                      {...searchpropsforSelect}
                      placeholder="select teacher"
                      style={{ minWidth: 150 }}
                    >
                      {teachers.map((teacher) => (
                        <Option key={teacher.id} value={teacher.id}>
                          {teacher.username}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
                <Space align="baseline" style={spacestyle}>
                  <Form.Item>
                    <Button
                      style={{ width: 330, minWidth: 260 }}
                      type="dashed"
                      htmlType="submit"
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Subject and Teacher
                    </Button>
                  </Form.Item>
                </Space>
              </Form>

              <Divider />
              <Title style={{ textAlign: "center" }} level={5}>
                Current subjects and teachers in the class
              </Title>

              {SubjectDetails.length === 0 && <Empty />}
              {SubjectDetails.map((sd) => (
                <SubTeacherListItem
                  classid={classroomid}
                  key={sd.id}
                  sd={sd}
                  teachers={teachers}
                  subjects={subjects}
                  remove={removeSubjectDetail}
                />
              ))}
            </Col>
          </Row>
        </div>
      </Content>
    </ContentLayout>
  );
}
