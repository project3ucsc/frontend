import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  List,
  Timeline,
  Card,
  message,
  Badge,
  Tabs,
} from "antd";
import ContentLayout from "components/ContentLayout";
import { ClockCircleOutlined } from "@ant-design/icons";
import "./physics.scss";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/tutorsubject.service";
import { getLearnMatUrl } from "services/azureblob.service";
import { getResourceIcon } from "components/Resources";
import { getDateTxt } from "utils/common";
import PAssesmentListStu from "components/tutor/PAssesmentListStu";
import PaymentSlipUploadForm from "components/PaymentSlipUploadForm";

const cstyle = {
  marginBottom: 0,
  marginRight: 10,
  minHeight: 280,
};
const meetingcardstyle = {
  marginBottom: 10,
  marginRight: 10,
  // height: 194,
  minHeight: 100,
};
const { TabPane } = Tabs;

export default function PSubpage() {
  const [learnMats, setLearnMats] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [meetdata, setMeetdata] = useState({ id: -1, day: "" });

  let { sdid } = useParams();

  useEffect(() => {
    setLoading(true);

    subjectdetailservice
      .getSubDetailAllDataforStudent(sdid)
      .then((data) => {
        setLoading(false);
        const { presource_section, ...rest } = data;
        setMeetdata(rest);
        setTitle(data.subject);
        setLearnMats(presource_section);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [sdid]);

  const getResourceLink = (type, filename, name) => {
    if (type === "link") {
      return filename;
    } else if (type === "vid") {
      return `/resource/${name}/${filename}`;
    } else {
      return getLearnMatUrl(filename);
    }
  };

  return (
    <ContentLayout title={title} paths={["Home", title]}>
      <Row>
        <Col xs={24} xl={24}>
          <Card
            title="Online lessons"
            className="lesson-card"
            style={meetingcardstyle}
          >
            {!loading && <MeetingUrl data={meetdata} />}
          </Card>

          <Tabs type="card">
            <TabPane tab="Lessons" key="1">
              <Card title="My Lessons" className="lessoncard" style={cstyle}>
                {learnMats.map((section) => {
                  return (
                    <List
                      key={section.id}
                      style={{ textAlign: "left" }}
                      header={<div>{section.name}</div>}
                      bordered
                      dataSource={section.presource_details}
                      renderItem={(item) => (
                        <List.Item>
                          <a
                            href={getResourceLink(
                              item.type,
                              item.filename,
                              `${section.name}/${item.name}`
                            )}
                            className="linkspan"
                          >
                            {getResourceIcon(item.type)} {item.name}
                          </a>
                        </List.Item>
                      )}
                    />
                  );
                })}
              </Card>
            </TabPane>
            <TabPane tab="Assesments" key="2">
              <Card title="Assesments" className="lessoncard" style={cstyle}>
                <PAssesmentListStu sdid={sdid} />
              </Card>
            </TabPane>
            <TabPane tab="Payment" key="3">
              <Card
                title="Upload Payment slip"
                className="lessoncard"
                style={cstyle}
              >
                <PaymentSlipUploadForm sdid={sdid} />
              </Card>
            </TabPane>
          </Tabs>
        </Col>

        {/* <Col xl={1}></Col> */}
      </Row>
    </ContentLayout>
  );
}

export function MeetingUrl({ data }) {
  // const today = new Date();
  // let day = today.getDay() > 5 ? 1 : today.getDay();

  return (
    <>
      <ul class="ant-list-items">
        <li class="ant-list-item" style={{ padding: 0 }}>
          <Badge.Ribbon
            text={`${data.day} ${getDateTxt(data.sttime, data.endtime, "h12")}`}
            placement="start"
          >
            <Col xs={24} className="meetingUrlcol">
              <Row style={{ marginBottom: 30 }}></Row>
              <Row>
                <Col sm={12}>
                  <a href={data.meetingurl} class="linkspan">
                    Go to Link
                  </a>
                </Col>
                <Col sm={12}>
                  <p style={{ float: "right" }}>
                    {/* Last updated :{" "} */}
                    {/* {new Date(data.lastupdated).toLocaleDateString()} */}
                  </p>
                </Col>
              </Row>
            </Col>
          </Badge.Ribbon>
        </li>
      </ul>
    </>
  );
}
