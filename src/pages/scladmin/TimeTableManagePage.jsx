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
  Empty,
  Skeleton,
  Spin,
} from "antd";
import "./timetablepage.scss";
import ContentLayout from "components/ContentLayout";
import TimeTableManager from "components/TimeTableManager";
import classroomservice from "services/classroom.service";
import timeslotservice from "services/timeslot.service";
const { Option } = Select;
const { Title } = Typography;

export default function TimeTableManagePage() {
  const [gradeclassform] = Form.useForm();

  const [gradesnclasses, setGradesnclasses] = useState([]);
  const [gradecount, setGradecount] = useState([]);
  const [loading, setLoading] = useState(false);

  const [timedata, setTimedata] = useState([]);

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

  const onClassRoomSelect = async ({ grade, classname }) => {
    const gradesplt = grade.split(".")[0];

    try {
      setLoading(true);
      const data = await timeslotservice.getTimeslotsSclAdmin(
        gradesplt,
        classname
      );
      setTimedata(data);
      setLoading(false);

      console.log(data);
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
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
            {timedata.length !== 0 && !loading && (
              <TimeTableManager {...timedata} />
            )}
            {timedata.length === 0 && !loading && (
              <Skeleton title paragraph={{ rows: 4 }} />
            )}
            {loading && <Spin size="large" style={{ marginTop: 50 }} />}
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
