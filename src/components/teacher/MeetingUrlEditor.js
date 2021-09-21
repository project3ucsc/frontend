import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  Card,
  Form,
  Select,
  Badge,
  Modal,
  Input,
  DatePicker,
  TimePicker,
  message,
  Tag,
} from "antd";
// import moment from "moment";
// import ContentLayout from "components/ContentLayout";
import {
  DownOutlined,
  EditOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import subjectdetailservice from "services/subjectdetail.service";
import { getDateTxt, getDaybyNumber, apiurl } from "utils/common";

import axios from "axios";
import { authHeader } from "utils/authheader";
import authenticationservice from "services/authentication.service";

const meetingcardstyle = {
  marginBottom: 10,
  marginRight: 10,

  minHeight: 100,
};

const { Option } = Select;

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

export default function MeetingUrlEditor({ sdid }) {
  const today = new Date();
  const [day, setDay] = useState(today.getDay());
  const [meetingData, setMeetingData] = useState(null);
  const [meetingArr, setMeetingArr] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    subjectdetailservice
      .getMeetingDetails(sdid, day)
      .then((data) => {
        console.log(data);

        if (day !== 6) {
          setMeetingData(data);
        } else {
          setMeetingData(data[0]);

          setMeetingArr(data);
        }
        setLoading(false);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [day, sdid]);

  function handleDayChange(value) {
    setDay(value);
  }

  return (
    <Card
      title="Online lessons"
      className="lesson-card"
      style={meetingcardstyle}
      extra={
        <>
          Day :
          <Select
            style={{ marginLeft: 5 }}
            defaultValue={today.getDay()}
            onChange={handleDayChange}
          >
            <Option value={6}>All</Option>
            <Option value={1}>Mon</Option>
            <Option value={2}>Tue</Option>
            <Option value={3}>Wed</Option>
            <Option value={4}>Thu</Option>
            <Option value={5}>Fri</Option>
          </Select>
        </>
      }
    >
      <ul class="ant-list-items">
        {!loading && day !== 6 && <MeetingUrl sdid={sdid} data={meetingData} />}
        {!loading &&
          day === 6 &&
          meetingArr.map((data, i) => (
            <MeetingUrl sdid={sdid} key={i} data={data} />
          ))}
      </ul>
    </Card>
  );
}

export function MeetingUrl({ data, sdid }) {
  const today = new Date();
  const [modalvisible, setModalvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTyp, setModalTyp] = useState("editl");
  const [mdata, setMdata] = useState(data);
  const [modalform] = Form.useForm();

  const [att, setAtt] = useState({ status: "a", code: 0, id: 0 });

  useEffect(() => {
    axios
      .get(`${apiurl}/attendance/isAtttakenToday/${mdata.id}`, authHeader())
      .then(({ data }) => {
        setAtt({ status: data.status, code: data.randomnum, id: data.id });
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  const markAtt = async () => {
    // console.log(code);

    try {
      const code = Math.floor(Math.random() * 9000 + 1000);

      const teacherid = authenticationservice.currentUserValue.id;
      const { data } = await axios.post(
        `${apiurl}/attendance/startAttSession`,
        { teacherid, tsid: mdata.id, sdid: parseInt(sdid), code },
        authHeader()
      );
      setAtt({ status: "b", code: code, id: data.id });
      message.success("Taking attendance started successfully");
      // return res.data;
    } catch (err) {
      message.error(err.response.data.message);
    }
  };

  const stopAtt = async () => {
    try {
      const teacherid = authenticationservice.currentUserValue.id;

      setAtt({ status: "c", code: att.code });
      await axios.patch(
        `${apiurl}/attendance/stopAttSession`,
        { id: att.id, sdid: parseInt(sdid), teacherid },
        authHeader()
      );
      message.success("Taking attendance stopped successfully");
      // return res.data;
    } catch (err) {
      message.error(err.response.data.message);
    }
  };

  const showModal = () => {
    setModalvisible(true);
  };

  const handleOk = () => {
    modalform.validateFields().then(async (val) => {
      // setConfirmLoading(true);
      console.log(val);

      if (modalTyp === "editl") {
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
      }

      if (modalTyp === "chgtime") {
        const thedate = val.date.format("YYYY-MM-DD");
        console.log(thedate);

        // const st = val.timerange[0].format("HH:mm");
        // const en = val.timerange[1].format("HH:mm");
        // const sttime = moment(thedate + " " + st);
        // const endtime = moment(thedate + " " + en);
        message.success("Time Updated  successfuly");
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
      {today.getDay() === mdata.weekday && (
        <Menu.Item disabled={att.status !== "a"} onClick={markAtt}>
          <FieldTimeOutlined /> Mark Attendance
        </Menu.Item>
      )}
      {att.status === "b" && (
        <Menu.Item onClick={stopAtt}>
          <FieldTimeOutlined /> Stop taking Attendance
        </Menu.Item>
      )}

      <Menu.Item
        onClick={() => {
          setModalTyp("editl");
          showModal();
        }}
      >
        <EditOutlined /> Edit meeting URL
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setModalTyp("chgtime");
          showModal();
        }}
      >
        <FieldTimeOutlined /> Change the time
      </Menu.Item>
    </Menu>
  );

  const lastupdated = new Date(mdata.lastupdated);
  return (
    <li class="ant-list-item" style={{ padding: 0 }}>
      <Badge.Ribbon
        text={`${getDaybyNumber(mdata.weekday)} ${getDateTxt(
          mdata.period_time.starttime,
          mdata.period_time.endtime,
          "h12"
        )}`}
        placement="start"
      >
        <Col xs={24} className="meetingUrlcol">
          <Row style={{ marginBottom: 30 }}> </Row>
          <Row>
            <Col sm={12} md={12}>
              <a href={mdata.meetingurl} class="linkspan">
                Go to Link
              </a>
              {att.status === "b" && (
                <div style={{ border: "#1990fc 1px solid", padding: 10 }}>
                  <p style={{ fontSize: 16 }}>
                    Attendance Code :{" "}
                    <Tag style={{ fontSize: 20 }} color="blue">
                      {att.code}
                    </Tag>
                  </p>
                  <p style={{ fontSize: 16 }}>
                    Students count :{" "}
                    <Tag style={{ fontSize: 20 }} color="green">
                      {13}
                    </Tag>
                  </p>
                </div>
              )}
            </Col>
            <Col sm={12} md={12}>
              <p style={{ float: "right" }}>
                Last updated : {lastupdated.toLocaleDateString()}
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
          {modalTyp === "chgtime" ? (
            <>
              <Form.Item name="date" label="Select Date" {...config}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="timerange"
                label="Select time range"
                {...rangeConfig}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="url"
              label="Enter meeting URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </li>
  );
}
