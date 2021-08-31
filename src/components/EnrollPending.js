import React, { useEffect, useState } from "react";
import { Typography, message, Button, Row, Spin, Popconfirm } from "antd";
import classroomservice from "services/classroom.service";
import { Enum_std_detail_status } from "utils/common";
const { Title } = Typography;
const tstyle = { textAlign: "center", marginTop: 0 };

export default function EnrollPending({ classid, setStdStatus }) {
  const [clsdata, setClsdata] = useState(null);
  const [loading, setLoading] = useState(true);

  const [deleteconfirmvisible, setDeleteconfirmvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    classroomservice
      .getClass(classid)
      .then((data) => {
        // console.log(data);
        setClsdata(data);
        setLoading(false);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  const showPopconfirm = () => {
    setDeleteconfirmvisible(true);
  };

  const onUnenroll = async () => {
    try {
      setConfirmLoading(true);
      await classroomservice.unenrollStudent(classid);
      message.success("Unenrolled successfully");

      setConfirmLoading(false);
      setDeleteconfirmvisible(false);

      setStdStatus(Enum_std_detail_status.NO_ENROll);
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
      setConfirmLoading(false);
      setDeleteconfirmvisible(false);
    }
  };

  return !loading ? (
    <div>
      <Title style={tstyle} level={4}>
        You have requested to enroll to {clsdata.grade + " - " + clsdata.name}{" "}
        class
      </Title>
      <Title style={tstyle} level={5}>
        Please wait till class teacher accept your request
      </Title>
      <Row>
        <Popconfirm
          visible={deleteconfirmvisible}
          title="Are you sure to Unenroll from this class?"
          onConfirm={onUnenroll}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={() => setDeleteconfirmvisible(false)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            style={{ margin: "auto" }}
            onClick={showPopconfirm}
            disabled={loading}
          >
            Unenroll
          </Button>
        </Popconfirm>
      </Row>
    </div>
  ) : (
    <Row>
      <Spin size="large"></Spin>
    </Row>
  );
}
