import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Form,
  Input,
  message,
  Tabs,
  Upload,
  Divider,
  DatePicker,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ContentLayout from "components/ContentLayout";

import "../teacher/subpage.scss";
import LearnMatSection from "components/teacher/LearnMatSection";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";
import MeetingUrlEditor from "components/teacher/MeetingUrlEditor";

const { TabPane } = Tabs;

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};
function onChange(date, dateString) {
  console.log(date, dateString);
}

export default function SubjectPage() {
  const onfinish = (val) => {
    console.log(val);
  };
  const [sections, setSections] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  let { sdid } = useParams();
  useEffect(() => {
    setLoading(true);
    subjectdetailservice
      .getSubDetailAllDataforTeacher(sdid)
      .then((data) => {
        setTitle(
          `${data.classroom.grade}-${data.classroom.name} ${data.subject.name}`
        );
        setSections(data.resource_section);
        setLoading(false);

        // console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
        setLoading(false);
      });
  }, [sdid]);

  const deleteSection = async (id) => {
    //delete call to backend
    await subjectdetailservice.deleteResouceSection(id);
    // update ui
    setSections(sections.filter((sec) => sec.id !== id));
  };

  const addSection = async ({ title }) => {
    try {
      //add call to backend
      const newsection = await subjectdetailservice.addResouceSection(
        sdid,
        title
      );
      const secid = newsection.id;
      // update ui
      setSections([
        ...sections,
        { id: secid, name: title, resource_details: [] },
      ]);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <ContentLayout
      title={"Science | Nimal Fernando "}
      paths={["Home", "Science"]}
    >
      <Row>
        <Col xs={24}>
          <Form
            name="basic"
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Payment Month" name="month">
              <DatePicker onChange={onChange} picker="month" />
            </Form.Item>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Form>
          <Divider />
          <Tabs type="card">
            <TabPane tab="Lessons" key="1">
              <Card title="My Lessons" className="lesson-card" style={cstyle}>
                <br />
                {sections.map((sec, i) => {
                  return (
                    <LearnMatSection
                      key={sec.id}
                      deleteSection={deleteSection}
                      section={sec}
                    />
                  );
                })}

                <Card title="Add new section">
                  <Form onFinish={addSection} layout="inline">
                    <Form.Item name="title" label="Section Title">
                      <Input
                        style={{ width: "auto" }}
                        placeholder="Enter title"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Card>
            </TabPane>
            <TabPane tab="Assesments" key="2">
              <Card title="Assesments" className="lessoncard" style={cstyle}>
                <Card title="Add new Assigment">
                  <Form onFinish={addSection} layout="inline">
                    <Form.Item name="title" label="Assigment Title">
                      <Input
                        style={{ width: "auto" }}
                        placeholder="Enter title"
                      />
                    </Form.Item>
                    <Form.Item name="link" label="Assigment Link">
                      <Input
                        style={{ width: "auto" }}
                        placeholder="Enter number of the assigment"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Card>
            </TabPane>
            <TabPane tab="Payment History" key="3">
              <Card
                title="Payment History"
                className="lesson-card"
                style={cstyle}
              >
                <br />
                {sections.map((sec, i) => {
                  return (
                    <LearnMatSection
                      key={sec.id}
                      deleteSection={deleteSection}
                      section={sec}
                    />
                  );
                })}
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </ContentLayout>
  );
}
