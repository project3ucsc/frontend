import React, { useState, useEffect } from "react";
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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import ContentLayout from "components/ContentLayout";

const { Option } = Select;

const spacestyle = {
  display: "flex",
  marginBottom: 8,
  justifyContent: "center",
};

const { Content } = Layout;
const { Title } = Typography;

export default function TimeSlotManagePage() {
  const [level, setLevel] = useState("pri");
  const [timeslots, setTimeslots] = useState([
    { range: [moment("06:11", "HH:mm"), moment("07:21", "HH:mm")] },
    { range: [moment("07:21", "HH:mm"), moment("07:21", "HH:mm")] },
    { range: [moment("06:11", "HH:mm"), moment("07:21", "HH:mm")] },
  ]);
  const [timeslotform] = Form.useForm();
  useEffect(() => {
    timeslotform.setFieldsValue({ timeslotlist: timeslots });
  }, [timeslotform, timeslots]);

  const LevelChange = ({ level }) => {
    setLevel(level);
    setTimeslots([
      { range: [moment("08:00", "HH:mm"), moment("09:20", "HH:mm")] },
      { range: [moment("09:25", "HH:mm"), moment("10:40", "HH:mm")] },
    ]);
    console.log(level);
  };
  const onFinish = ({ timeslotlist }) => {
    console.log(JSON.stringify(timeslotlist));
    let times = timeslotlist.map((timeslot) => {
      return [
        timeslot.range[0].format("HH:mm"),
        timeslot.range[1].format("HH:mm"),
      ];
    });
    console.log(times);
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
          <Title level={4}>Enter number of classes in each grade</Title>
          <Title type="secondary" level={5}>
            If your school doesn't have particular sections uncheck them
          </Title>
          <Row>
            <Col sm={24} xl={24}>
              <Form
                style={{ justifyContent: "center" }}
                layout="inline"
                onFinish={LevelChange}
                initialValues={{ level: level }}
              >
                <Form.Item
                  name="level"
                  label="Level"
                  rules={[
                    {
                      required: true,
                      message: "Please select grade!",
                    },
                  ]}
                >
                  <Select placeholder="select grade" style={{ minWidth: 100 }}>
                    <Option value="pri">Primary</Option>
                    <Option value="ol">Ordinary Level</Option>
                    <Option value="al">Advanced Level</Option>
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

          <Row>
            <Col sm={24} xl={24}>
              <Form
                form={timeslotform}
                initialValues={{
                  timeslotlist: timeslots,
                }}
                style={{ justifyContent: "center", marginTop: 30 }}
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.List name="timeslotlist">
                  {(fields, { add, remove }) => {
                    // console.log(fields);

                    return (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} align="baseline" style={spacestyle}>
                            <Form.Item
                              label={"Period " + (name + 1)}
                              {...restField}
                              name={[name, "range"]}
                              fieldKey={[fieldKey, "range"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Select time range",
                                },
                              ]}
                            >
                              <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Space align="baseline" style={spacestyle}>
                          <Form.Item>
                            <Button
                              style={{ width: 350, minWidth: 260 }}
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Subject
                            </Button>
                          </Form.Item>
                        </Space>
                      </>
                    );
                  }}
                </Form.List>
                <Space align="baseline" style={spacestyle}>
                  <Form.Item>
                    <Button
                      style={{ marginRight: 25 }}
                      type="default"
                      htmlType="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ marginLeft: 25 }}
                      type="primary"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </ContentLayout>
  );
}
