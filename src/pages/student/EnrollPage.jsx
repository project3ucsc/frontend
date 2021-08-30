import React, { useState, useEffect } from "react";
import { Layout, Row, Col, message } from "antd";

import ContentLayout from "components/ContentLayout";
import classroomservice from "services/classroom.service";
import Enroll_Form from "components/Enroll_Form";
import { Enum_std_detail_status } from "utils/common";
import NotFound404 from "pages/NotFound404";
import Enroll_Pending from "components/Enroll_Pending";

const { Content } = Layout;

export default function EnrollPage() {
  const [stdStatus, setStdStatus] = useState("");
  const [classid, setClassid] = useState("");
  useEffect(() => {
    classroomservice
      .getsStudentEnrollStatus()
      .then((data) => {
        if (data.status === Enum_std_detail_status.PENDING) {
          setClassid(data.classid);
        }
        setStdStatus(data.status);
        // console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  return (
    <ContentLayout title="Subjects" paths={["Home", "Subjects"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={24}>
            {stdStatus === Enum_std_detail_status.NO_ENROll && (
              <Enroll_Form
                setStdStatus={setStdStatus}
                setClassid={setClassid}
              />
            )}
            {stdStatus === Enum_std_detail_status.PENDING && (
              <Enroll_Pending setStdStatus={setStdStatus} classid={classid} />
            )}
            {stdStatus === Enum_std_detail_status.ACTIVE && <NotFound404 />}
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
