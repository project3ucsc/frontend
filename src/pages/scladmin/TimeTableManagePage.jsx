import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Select,
  Button,
  Typography,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
import TimeTableManager from "components/TimeTableManager";
import classroomservice from "services/classroom.service";
const { Option } = Select;
const { Title } = Typography;

const data = [
  { key: 1, time: "08.00-09.10", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1 },
  { key: 2, time: "09.10-10.30", mon: 1, tue: 2, wed: 1, thu: 1, fri: 1 },
  { key: 3, time: "11.10-12.10", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1 },
  { key: 4, time: "12.10-13.30", mon: 1, tue: 1, wed: 1, thu: 1, fri: 1 },
];

const subjects = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Gen. English" },
];
const str =
  '{"classdetail":{"id":23,"subject_detail":[{"id":1,"teacher_id":4,"subject":{"name":"Combined Mathematics"}},{"id":2,"teacher_id":11,"subject":{"name":"Physics"}},{"id":3,"teacher_id":13,"subject":{"name":"Chemistry"}},{"id":9,"teacher_id":7,"subject":{"name":"General English"}}]},"timeslotdata":[{"period":{"id":4,"starttime":"1970-01-01T02:30:00.000Z","endtime":"1970-01-01T03:40:00.000Z"},"timeslots":[{"id":1,"teacher_id":4,"sdid":1,"weekday":1},{"id":2,"teacher_id":4,"sdid":1,"weekday":2},{"id":3,"teacher_id":4,"sdid":1,"weekday":3},{"id":4,"teacher_id":4,"sdid":1,"weekday":5}]},{"period":{"id":5,"starttime":"1970-01-01T03:40:00.000Z","endtime":"1970-01-01T05:00:00.000Z"},"timeslots":[{"id":5,"teacher_id":13,"sdid":3,"weekday":1}]},{"period":{"id":6,"starttime":"1970-01-01T05:20:00.000Z","endtime":"1970-01-01T06:40:00.000Z"},"timeslots":[]},{"period":{"id":7,"starttime":"1970-01-01T06:40:00.000Z","endtime":"1970-01-01T08:00:00.000Z"},"timeslots":[{"id":6,"teacher_id":13,"sdid":3,"weekday":2}]}]}';

const timedata = JSON.parse(str);

export default function TimeTableManagePage() {
  const [gradeclassform] = Form.useForm();

  const [gradesnclasses, setGradesnclasses] = useState([]);
  const [gradecount, setGradecount] = useState([]);

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

  const onGradeChange = (val) => {
    const data = val.split(".");
    setGradecount(parseInt(data[1]));
    gradeclassform.setFieldsValue({ class: null });
  };

  const { Content } = Layout;
  // const [classroomid, setClassroomid] = useState(0);
  const onClassRoomSelect = ({ grade, classname }) => {
    const gradesplt = grade.split(".")[0];
    // console.log(gradesplt, classname);
    console.log(timedata);
  };
  return (
    <ContentLayout
      title="TimeTable Management"
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
        <Title level={4}>Enter number of classes in each grade</Title>
        <Title type="secondary" level={5}>
          If your school doesn't have particular sections uncheck them
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
                  {gradesnclasses.map((gradesnclass, i) => {
                    return (
                      <Option
                        key={i}
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
                name="classname"
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
                    <Option key={i} value={i + 1}>
                      {i + 1}
                    </Option>
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
        <Row style={{ justifyContent: "center" }}>
          <Col>
            <TimeTableManager {...timedata} />
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
