import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  List,
  Card,
  message,
  Badge,
  Spin,
  Tabs,
  Input,
  Tag,
  Button,
  InputNumber,
} from "antd";
import ContentLayout from "components/ContentLayout";
import "./physics.scss";
import { useParams } from "react-router-dom";
import subjectdetailservice from "services/subjectdetail.service";
import { getLearnMatUrl } from "services/azureblob.service";
import { getResourceIcon } from "components/Resources";
import { getDateTxt, getDaybyNumber, apiurl } from "utils/common";
import AssesmentListStu from "components/AssesmentListStu";
import reliefservice from "services/relief.service";

import axios from "axios";
import { authHeader } from "utils/authheader";
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

export default function Subpage() {
  const [learnMats, setLearnMats] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  let { sdid } = useParams();

  useEffect(() => {
    setLoading(true);

    subjectdetailservice
      .getSubDetailAllDataforStudent(sdid)
      .then((data) => {
        setLoading(false);

        setTitle(data.subject.name);
        setLearnMats(data.resource_section);
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
            {!loading && <MeetingUrl sdid={sdid} />}
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
                      dataSource={section.resource_details}
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
                <AssesmentListStu sdid={sdid} />
              </Card>
            </TabPane>
          </Tabs>
        </Col>

        {/* <Col xl={1}></Col> */}
      </Row>
    </ContentLayout>
  );
}

export function MeetingUrl({ sdid }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relifTxt, setRelifTxt] = useState("");
  const [attcode, setAttcode] = useState(0);
  const [att, setAtt] = useState({ status: "a", code: 0, id: 0 });
  const [atloading, setatloading] = useState(false);
  useEffect(() => {
    const today = new Date();
    setLoading(true);
    let day = today.getDay() > 5 ? 1 : today.getDay();
    subjectdetailservice
      .getMeetingDetailsforStudent(sdid, day)
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);

        axios
          .get(`${apiurl}/attendance/isAtttakenToday/${data.id}`, authHeader())
          .then(({ data }) => {
            if (data.status === "b") {
              let date = localStorage.getItem("attdate" + sdid);

              if (today.toLocaleDateString() !== date)
                setAtt({ status: "b", code: data.randomnum, id: data.id });
            }
          })
          .catch((e) => {
            message.error(e.response.data.message);
          });

        reliefservice
          .checkRelifinStudent(data.id, sdid)
          .then((txt) => {
            setRelifTxt(txt);
            console.log(txt);
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((e) => {
        message.error(e.message);
      });
    // chekin att is taking
  }, [sdid]);

  const onCodeSubmit = async () => {
    const today = new Date();
    try {
      setatloading(true);
      console.log(attcode);
      if (attcode !== att.code) message.error("Invalid attendance code");
      else {
        const { data } = await axios.patch(
          `${apiurl}/attendance/stuclick`,
          { id: att.id },
          authHeader()
        );
        setatloading(false);

        localStorage.setItem("attdate" + sdid, today.toLocaleDateString());
        setAtt({ status: "a", code: 0, id: 0 });
        message.success("Attendance taking successful");
      }
      setatloading(false);
    } catch (err) {
      message.error(err.response.data.message);
      setAtt({ status: "a", code: 0, id: 0 });
      setatloading(false);
    }
  };
  // const lastupdated = new Date(data.lastupdated);
  return !loading ? (
    <>
      <p>{relifTxt}</p>
      <ul class="ant-list-items">
        <li class="ant-list-item" style={{ padding: 0 }}>
          <Badge.Ribbon
            text={`${getDaybyNumber(data.weekday)} ${getDateTxt(
              data.period_time.starttime,
              data.period_time.endtime,
              "h12"
            )}`}
            placement="start"
          >
            <Col xs={24} className="meetingUrlcol">
              <Row style={{ marginBottom: 30 }}></Row>
              <Row>
                <Col sm={15}>
                  <a href={data.meetingurl} class="linkspan">
                    Go to Link
                  </a>
                  {att.status === "b" && (
                    <div
                      style={{
                        border: "#1990fc 1px solid",
                        padding: 10,
                        marginTop: 5,
                      }}
                    >
                      <p style={{ fontFamily: "serif" }}>
                        To get the attendance, enter the code given by teacher
                      </p>
                      <p style={{ margin: 0 }}>
                        Enter Attendance Code :{" "}
                        <InputNumber
                          onChange={(val) => setAttcode(val)}
                          style={{ width: 150, margin: "0 5px" }}
                          color="blue"
                        />
                        <Button loading={atloading} onClick={onCodeSubmit}>
                          Submit
                        </Button>
                      </p>
                    </div>
                  )}
                </Col>
                <Col sm={9}>
                  <p style={{ float: "right" }}>
                    Last updated :{" "}
                    {new Date(data.lastupdated).toLocaleDateString()}
                  </p>
                </Col>
              </Row>
            </Col>
          </Badge.Ribbon>
        </li>
      </ul>
    </>
  ) : (
    <Spin />
  );
}
