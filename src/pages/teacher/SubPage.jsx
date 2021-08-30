import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Form, Input, message } from "antd";
import ContentLayout from "components/ContentLayout";

import "./subpage.scss";
import LearnMatSection from "components/teacher/LearnMatSection";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";
import MeetingUrlEditor from "components/teacher/MeetingUrlEditor";

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
    <ContentLayout title={title} paths={["Home", title]}>
      <Row>
        <Col xs={24}>
          {!loading && <MeetingUrlEditor sdid={sdid} />}

          <Card title="My Lessons" className="lesson-card" style={cstyle}>
            {/* <List
              header={<div>Upcoming lesson</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <span className="linkspan">{item}</span>
                  <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <Button type="link">
                      Options
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                </List.Item>
              )}
            /> */}
            <br />

            {sections.map((sec, i) => {
              return (
                <LearnMatSection
                  key={sec.id}
                  // sectionid={sec}
                  deleteSection={deleteSection}
                  section={sec}
                />
              );
            })}

            <Card title="Add new section">
              <Form onFinish={addSection} layout="inline">
                <Form.Item name="title" label="Section Title">
                  <Input style={{ width: "auto" }} placeholder="Enter title" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
}
