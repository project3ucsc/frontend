import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackLayout from "components/BackLayout";
import { Row, Col, Card, List, Avatar, Typography, message } from "antd";
import { getClassName, getTimeAgo } from "utils/common";
import assmntservice from "services/assmnt.service";
import { containers, getFileUrl } from "services/azureblob.service";

const initdata = [
  { title: "sdvcsdvs", submitdate: "9/6/2021", regid: "24241" },
];
const { Paragraph } = Typography;
export default function SubmissionsPage() {
  const { assid } = useParams();
  const [loading, setLoading] = useState(true);
  const [duedate, setDuedate] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    assmntservice
      .getSubmissions(assid)
      .then((data) => {
        setData(data.submissions);
        setDuedate(data.duedate);
        setLoading(false);
        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [assid]);
  return (
    <BackLayout title={getClassName()} subtitle={"bla bla"}>
      <Row>
        <Col xs={24}>
          <Card title="Submissions" className="lessoncard">
            <List
              className="res-list"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={
                      <a href="https://ant.design">{item.user.username}</a>
                    }
                    description={item.user.studentdetail.regid}
                  />

                  <Col className="editbtn">
                    <Row>
                      <a
                        style={{ marginLeft: 15 }}
                        href={getFileUrl(item.filename, containers.submissions)}
                      >
                        Download Submission
                      </a>
                    </Row>
                    <Row>
                      {" "}
                      <Paragraph style={{ marginLeft: 15 }}>
                        submitted{" "}
                        {getTimeAgo(
                          new Date(item.submitdate),
                          new Date(duedate),
                          true
                        )}
                      </Paragraph>
                    </Row>
                  </Col>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </BackLayout>
  );
}
