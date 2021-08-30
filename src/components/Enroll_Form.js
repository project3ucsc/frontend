import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Form, message, Button, Select, Typography } from "antd";

import classroomservice from "services/classroom.service";
import {
  Enum_std_detail_status,
  Enum_subjectgroup,
  getSectionFromGrade,
} from "utils/common";

const { Title } = Typography;

const { Option } = Select;

const tstyle = { textAlign: "center", marginTop: 0 };

export default function Enroll_Form({ setStdStatus, setClassid }) {
  const [gradeclassform] = Form.useForm();

  const [gradesnclasses, setGradesnclasses] = useState([]);
  const [gradecount, setGradecount] = useState(0);
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("none");
  const [opsubs, setOpsubs] = useState({
    g69: [],
    ol: { bucket1: [], bucket2: [], bucket3: [] },
    al: [],
  });

  useEffect(() => {
    classroomservice
      .getsection_and_no_classes()
      .then((data) => {
        setGradesnclasses(data);
        gradeclassform.setFieldsValue({ classname: null });
        // console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  const onGradeChange = (val) => {
    const data = val.split(".");
    setGrade(data[0]);
    // console.log(data[0]);
    setGradecount(parseInt(data[1]));
    // gradeclassform.setFieldsValue({ classname: null });
    gradeclassform.resetFields(["classname"]);
    setSection("none");
  };

  const onClassNameChange = async (classname) => {
    // console.log(classname);
    if (grade !== "") {
      try {
        const sec = getSectionFromGrade(grade);
        const { id, subject_detail } = await classroomservice.getSDsinClass(
          grade,
          classname
        );

        if (sec === "69") {
          setOpsubs({
            classid: id,
            ol: { bucket1: [], bucket2: [], bucket3: [] },
            al: [],
            g69: subject_detail.filter(
              (sd) => sd.subject.subjectgroup === Enum_subjectgroup.OPTIONAL_69
            ),
          });
        } else if (sec === "OL") {
          setOpsubs({
            classid: id,
            g69: [],
            al: [],
            ol: {
              bucket1: subject_detail.filter(
                (sd) =>
                  sd.subject.subjectgroup === Enum_subjectgroup.OL_BUCKET_1
              ),
              bucket2: subject_detail.filter(
                (sd) =>
                  sd.subject.subjectgroup === Enum_subjectgroup.OL_BUCKET_2
              ),
              bucket3: subject_detail.filter(
                (sd) =>
                  sd.subject.subjectgroup === Enum_subjectgroup.OL_BUCKET_3
              ),
            },
          });
        } else if (sec === "AL") {
          setOpsubs({
            classid: id,
            g69: [],
            ol: { bucket1: [], bucket2: [], bucket3: [] },
            al: subject_detail.filter(
              (sd) => sd.subject.subjectgroup !== Enum_subjectgroup.COMP
            ),
          });
        }

        setSection(sec);

        // console.log(subject_detail);
      } catch (error) {
        message.error(error.message);
      }
    }
    gradeclassform.resetFields([
      "OL_BUCKET_1",
      "OL_BUCKET_2",
      "OL_BUCKET_3",
      "OPTIONAL_AL",
      "OPTIONAL_69",
    ]);
  };

  const onFinish = async (val) => {
    const grade = val.grade.split(".")[0];

    const { classid } = opsubs;
    const data = { ...val, grade, classid, section };

    // console.log(data);

    // console.log(opsubs.classid);
    try {
      setLoading(true);
      await classroomservice.enrollStudent(data);
      setLoading(false);
      message.success("submitted");
      setClassid(classid);

      setStdStatus(Enum_std_detail_status.PENDING);
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };

  const selectRules = [
    {
      required: true,
      message: "Please select subject!",
    },
  ];
  const G69Select = (
    <Form.Item
      name={Enum_subjectgroup.OPTIONAL_69}
      label="Aesthetic Subject"
      rules={selectRules}
    >
      <Select placeholder="select subject" style={{ minWidth: 100 }}>
        {opsubs.g69.map((sub) => {
          return (
            <Option key={sub.id} value={sub.id}>
              {sub.subject.name}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  const OlSelect = (
    <>
      <Form.Item
        name={Enum_subjectgroup.OL_BUCKET_1}
        label="Subject (Bucket 1 )"
        rules={selectRules}
      >
        <Select placeholder="select subject" style={{ minWidth: 100 }}>
          {opsubs.ol.bucket1.map((sub) => {
            return (
              <Option key={sub.id} value={sub.id}>
                {sub.subject.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={Enum_subjectgroup.OL_BUCKET_2}
        label="Subject (Bucket 2 )"
        rules={selectRules}
      >
        <Select placeholder="select subject" style={{ minWidth: 100 }}>
          {opsubs.ol.bucket2.map((sub) => {
            return (
              <Option key={sub.id} value={sub.id}>
                {sub.subject.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={Enum_subjectgroup.OL_BUCKET_3}
        label="Subject (Bucket 3 )"
        rules={selectRules}
      >
        <Select placeholder="select subject" style={{ minWidth: 100 }}>
          {opsubs.ol.bucket3.map((sub) => {
            return (
              <Option key={sub.id} value={sub.id}>
                {sub.subject.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );

  const AlSelect = opsubs.al.length > 1 && (
    <Form.Item name="OPTIONAL_AL" label="Optional Subject" rules={selectRules}>
      <Select placeholder="select subject" style={{ minWidth: 100 }}>
        {opsubs.al.map((sub) => {
          return (
            <Option
              key={sub.id}
              value={sub.id + "." + sub.subject.subjectgroup}
            >
              {sub.subject.name}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <Form
      form={gradeclassform}
      onFinish={onFinish}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
    >
      <Title style={tstyle} level={4}>
        Enroll to a class
      </Title>
      <Title style={tstyle} level={5}>
        You haven't enrolled to a class yet
      </Title>
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
          {gradesnclasses.map((gradesnclass, i) => {
            return (
              <Option
                key={i}
                value={gradesnclass.grade + "." + gradesnclass.classcount}
              >
                {gradesnclass.grade}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="classname"
        label="Class"
        rules={[
          {
            required: true,
            message: "Please select class!",
          },
        ]}
      >
        <Select
          disabled={gradecount === 0}
          placeholder="select class"
          style={{ minWidth: 100 }}
          onChange={onClassNameChange}
        >
          {[...Array(gradecount)].map((e, i) => (
            <Option key={i} value={i + 1}>
              {i + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {section === "69" && G69Select}
      {section === "OL" && OlSelect}
      {section === "AL" && AlSelect}
      <Row>
        <Col sm={15}></Col>
        <Col sm={9}>
          <Button style={{ marginRight: 10 }} htmlType="button">
            Cancel
          </Button>

          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
