import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Form, Input, message, Tabs } from "antd";
import ContentLayout from "components/ContentLayout";

import "./subpage.scss";
import LearnMatSection from "components/teacher/LearnMatSection";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";
import MeetingUrlEditor from "components/teacher/MeetingUrlEditor";
import AssesmentListTec from "components/AssesmentListTec";
import AddAssesmentForm from "components/AddAssesmentForm";

const { TabPane } = Tabs;

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};

export default function SubPage() {
  const [sections, setSections] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  let { sdid } = useParams();
  useEffect(() => {
    setLoading(true);
    subjectdetailservice
      .getSubDetailAllDataforTeacher(sdid, "0")
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
    <ContentLayout title={title} paths={["Home", title]}>
      <Row>
        <Col xs={24}>
          {!loading && <MeetingUrlEditor sdid={sdid} />}

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
                <AssesmentListTec sdid={sdid} />
              </Card>
            </TabPane>

            <TabPane tab="Add Assesment" key="3">
              <Card
                title="Add New Assesment"
                className="lessoncard"
                style={cstyle}
              >
                <AddAssesmentForm sdid={sdid} />
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </ContentLayout>
  );
}
