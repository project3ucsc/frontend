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
  Modal,
  Dropdown,
  Badge,
  Menu,
} from "antd";
import { EditOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";

import ContentLayout from "components/ContentLayout";

import "../teacher/subpage.scss";
import LearnMatSectionTutor from "components/teacher/LearnMatSectionTutor";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/tutorsubject.service";
import PAddAssesmentForm from "components/tutor/PAddAssesmentForm";
import PAssesmentListTec from "components/tutor/PAssesmentListTec";
import { getDateTxt } from "utils/common";

const { TabPane } = Tabs;

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};
const meetingcardstyle = {
  marginBottom: 10,
  marginRight: 10,

  minHeight: 100,
};

export default function SubPage() {
  const [sections, setSections] = useState([]);
  const [meetdata, setMeetdata] = useState({ id: -1, day: "" });
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  let { sdid } = useParams();
  useEffect(() => {
    setLoading(true);
    subjectdetailservice
      .getSubDetailAllDataforTeacher(sdid)
      .then((data) => {
        setTitle(`${data.subject} - Grade ${data.grade}`);
        const { presource_section, ...rest } = data;
        setSections(presource_section);
        setMeetdata(rest);
        console.log(rest);
        setLoading(false);

        // console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
        // setLoading(false);
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
        { id: secid, name: title, presource_details: [] },
      ]);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <ContentLayout title={title} paths={["Home", title]}>
      <Row>
        <Col xs={24}>
          {!loading && <MeetingUrltut data={meetdata} />}
          <Tabs type="card">
            <TabPane tab="Lessons" key="1">
              <Card title="My Lessons" className="lesson-card" style={cstyle}>
                <br />
                {sections.map((sec, i) => {
                  return (
                    <LearnMatSectionTutor
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
                <PAssesmentListTec sdid={sdid} />
              </Card>
            </TabPane>

            <TabPane tab="Add Assesment" key="3">
              <Card
                title="Add New Assesment"
                className="lessoncard"
                style={cstyle}
              >
                <PAddAssesmentForm sdid={sdid} />
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </ContentLayout>
  );
}

export function MeetingUrltut({ data }) {
  const [modalvisible, setModalvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [mdata, setMdata] = useState(data);
  const [modalform] = Form.useForm();

  const showModal = () => {
    setModalvisible(true);
  };

  const handleOk = () => {
    modalform.validateFields().then(async (val) => {
      // setConfirmLoading(true);
      console.log(val);

      try {
        setConfirmLoading(true);
        const upmeet = await subjectdetailservice.editMeetingUrl(
          mdata.id,
          val.url
        );
        setMdata({ ...mdata, ...upmeet });
        setConfirmLoading(false);
        setModalvisible(false);
        message.success("Meeting url updated succussfuly");
      } catch (error) {
        setConfirmLoading(false);
        message.error(error.message);
      }

      //   setModalvisible(false);
      //   setConfirmLoading(false);
    });

    // setTimeout(() => {

    // }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setModalvisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          showModal();
        }}
      >
        <EditOutlined /> Edit meeting URL
      </Menu.Item>
      {/* <Menu.Item
        onClick={() => {
          showModal();
        }}
      >
        <FieldTimeOutlined /> Change the time
      </Menu.Item> */}
    </Menu>
  );

  // const lastupdated = new Date(mdata.lastupdated);
  return (
    <Card
      title="Online lessons"
      className="lesson-card"
      style={meetingcardstyle}
    >
      <ul className="ant-list-items">
        <li className="ant-list-item" style={{ padding: 0 }}>
          <Badge.Ribbon
            text={`${mdata.day} ${getDateTxt(
              mdata.sttime,
              mdata.endtime,
              "h12"
            )}`}
            placement="start"
          >
            <Col xs={24} className="meetingUrlcol">
              <Row style={{ marginBottom: 30 }}></Row>
              <Row>
                <Col sm={12}>
                  <a href={mdata.meetingurl} className="linkspan">
                    Go to Link
                  </a>
                </Col>
                <Col sm={12}>
                  <p style={{ float: "right" }}>
                    {/* Last updated : {lastupdated.toLocaleDateString()} */}
                  </p>
                </Col>
              </Row>
            </Col>
          </Badge.Ribbon>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button type="link">
              <SettingOutlined />
              <DownOutlined />
            </Button>
          </Dropdown>

          <Modal
            title="Edit Meeting URL"
            visible={modalvisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form form={modalform} name="control-hooks">
              <Form.Item
                name="url"
                label="Enter meeting URL"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </li>{" "}
      </ul>
    </Card>
  );
}
