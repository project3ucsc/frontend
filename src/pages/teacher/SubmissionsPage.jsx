import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackLayout from "components/BackLayout";
import { Row, Col, Card, List, Avatar } from "antd";
import { getClassName, getTimeAgo } from "utils/common";

const initdata = [
  { title: "sdvcsdvs", submitdate: "9/6/2021", regid: "24241" },
];

export default function SubmissionsPage() {
  const { assid } = useParams();
  const [data, setData] = useState(initdata);

  useEffect(() => {
    getTimeAgo(new Date("9/6/2021"), new Date());
  }, [assid]);
  return (
    <BackLayout title={getClassName()} subtitle={"bla bla"}>
      <Row>
        <Col xs={24}>
          <Card title="Assesments" className="lessoncard">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.regid}
                  />
                  <div>
                    submitted{" "}
                    {getTimeAgo(new Date(item.submitdate), new Date())}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </BackLayout>
  );
}
