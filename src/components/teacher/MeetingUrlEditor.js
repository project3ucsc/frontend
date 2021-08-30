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
} from "antd";
import moment from "moment";
// import ContentLayout from "components/ContentLayout";
import {
  DownOutlined,
  EditOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import subjectdetailservice from "services/subjectdetail.service";
import { getDateTxt, getDaybyNumber } from "utils/common";

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
    subjectdetailservice
      .getMeetingDetails(sdid, day)
      .then((data) => {
        console.log(data);

        if (day !== 6) {
          setMeetingData(data);
        } else {
          setMeetingArr(data);
        }
        setLoading(false);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [day]);

  function handleDayChange(value) {
    console.log(`selected ${value}`);
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
        {!loading && day !== 6 && <MeetingUrl data={meetingData} />}
        {!loading &&
          day === 6 &&
          meetingArr.map((data, i) => <MeetingUrl key={i} data={data} />)}
      </ul>
    </Card>
  );
}

export function MeetingUrl({ data }) {
  const [modalvisible, setModalvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTyp, setModalTyp] = useState("editl");
  const [mdata, setMdata] = useState(data);

  const [modalform] = Form.useForm();

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

        const st = val.timerange[0].format("HH:mm");
        const en = val.timerange[1].format("HH:mm");

        const sttime = moment(thedate + " " + st);
        const endtime = moment(thedate + " " + en);
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
          <Row style={{ marginBottom: 30 }}></Row>
          <Row>
            <Col sm={12}>
              <a href={mdata.meetingurl} class="linkspan">
                Go to Link
              </a>
            </Col>
            <Col sm={12}>
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
