import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Select,
  Button,
  TimePicker,
  Space,
  Typography,
  Divider,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import ContentLayout from "components/ContentLayout";
import periodservice from "services/period.service";

const { Option } = Select;

const spacestyle = {
  display: "flex",
  marginBottom: 8,
  justifyContent: "center",
};

const { Content } = Layout;
const { Title } = Typography;

export default function TimeSlotManagePage() {
  const [level, setLevel] = useState("");
  const [timeslots, setTimeslots] = useState([
    // {
    //   id: 1,
    //   starttime: moment("07:21", "HH:mm"),
    //   endtime: moment("09:10", "HH:mm"),
    // },
    // {
    //   id: 2,
    //   starttime: moment("10:00", "HH:mm"),
    //   endtime: moment("12:10", "HH:mm"),
    // },
  ]);

  const LevelChange = async (val) => {
    try {
      setLevel(val.level);
      const data = await periodservice.getPeriodSlots(val.level);
      const mappeddata = data.map((item) => {
        return {
          id: item.id,
          starttime: moment(item.starttime),
          endtime: moment(item.endtime),
        };
      });
      setTimeslots(mappeddata);
      console.log(level);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onAddTimeSlot = async ({ range }) => {
    try {
      console.log(JSON.stringify(range[0].format()), range[0].format("HH:mm"));
      // add ts to database
      const data = {
        starttime: range[0],
        endtime: range[1],
        section: level,
      };
      const res = await periodservice.addPeriodSlot(data);
      // update ui
      setTimeslots([
        ...timeslots,
        {
          id: res.id,
          starttime: range[0],
          endtime: range[1],
        },
      ]);
      message.success("Timeslot added successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const removeTimeSlot = (id) => {
    setTimeslots(timeslots.filter((ts) => ts.id !== id));
  };

  return (
    <ContentLayout
      title="TimeSlot Management"
      paths={["SchoolAdmin", "Dashboard"]}
    >
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="container-back">
          <Title level={4}>Configure periods(timeslots) for sections </Title>
          <Title type="secondary" level={5}>
            Select particular section and enter time ranges
          </Title>
          <Row>
            <Col sm={24} xl={24}>
              <Form
                style={{ justifyContent: "center" }}
                layout="inline"
                onFinish={LevelChange}
              >
                <Form.Item
                  name="level"
                  label="Level"
                  rules={[
                    {
                      required: true,
                      message: "Please select section!",
                    },
                  ]}
                >
                  <Select
                    placeholder="select section"
                    style={{ minWidth: 100 }}
                  >
                    <Option value="PRIMARY">Primary Section</Option>
                    <Option value="OL">6-11 Section</Option>
                    <Option value="AL">AL section</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Select
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col sm={24} xl={24}>
              <Form
                style={{ justifyContent: "center" }}
                name="dynamic_form_nest_item"
                onFinish={onAddTimeSlot}
                autoComplete="off"
              >
                <Space align="baseline" style={spacestyle}>
                  <Form.Item
                    label="Select time range"
                    name="range"
                    rules={[
                      {
                        required: true,
                        message: "Select time range",
                      },
                    ]}
                  >
                    <TimePicker.RangePicker format="HH:mm" />
                  </Form.Item>
                </Space>

                <Space align="baseline" style={spacestyle}>
                  <Form.Item>
                    <Button
                      style={{ width: 350, minWidth: 260 }}
                      type="dashed"
                      htmlType="submit"
                      block
                      icon={<PlusOutlined />}
                    >
                      Add new timeslot
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
              <Divider />
              {timeslots.map((ts, i) => (
                <TimeSlotListItem
                  key={ts.id}
                  index={i}
                  ts={ts}
                  remove={removeTimeSlot}
                />
              ))}
            </Col>
          </Row>
        </div>
      </Content>
    </ContentLayout>
  );
}

function TimeSlotListItem({ ts, remove }) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showdeletePopconfirm = () => {
    setVisible(true);
  };

  const handleOkdelete = async () => {
    setConfirmLoading(true);
    try {
      // add new sd to database
      await periodservice.deletePeriodSlot(ts.id);
      // update the ui
      remove(ts.id);
      message.success("Timeslot deleted successfully");
    } catch (error) {
      setConfirmLoading(false);
      setVisible(false);
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = async ({ range }) => {
    if (!disabled) {
      setLoading(true);
      try {
        // console.log([range[0].format("HH:mm"), range[1].format("HH:mm")]);
        // add ts to database
        const data = {
          starttime: range[0],
          endtime: range[1],
        };
        const res = await periodservice.updatePeriodSlot(data, ts.id);
        console.log(res);
        setLoading(false);
        message.success("Timeslot updated successfully");
      } catch (error) {
        setLoading(false);
        message.error(error.message);
      }
    }

    setDisabled(!disabled);
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{ range: [ts.starttime, ts.endtime] }}
    >
      <Space
        // key={key}
        align="baseline"
        style={spacestyle}
      >
        <Form.Item
          label="Select time range"
          name="range"
          rules={[
            {
              required: true,
              message: "Select time range",
            },
          ]}
        >
          <TimePicker.RangePicker format="HH:mm" disabled={disabled} />
        </Form.Item>
        <Button htmlType="submit" loading={loading}>
          {disabled ? "Edit" : "Save"}
        </Button>
        <Popconfirm
          title="Are you sure to remove？"
          visible={visible}
          onConfirm={handleOkdelete}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <Button danger onClick={showdeletePopconfirm}>
            Remove
          </Button>
        </Popconfirm>
      </Space>
    </Form>
  );
}
