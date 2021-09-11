import React from "react";
import { Layout, Row, Col } from "antd";
import { Form, Input, Button, TimePicker, Select, Upload, Space, InputNumber } from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import ContentLayout from "components/ContentLayout";


export default function ApplicationForm() {
  const { Content } = Layout;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const { TextArea } = Input;

  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  return (
    <ContentLayout
      title="Tutor Class Application Form"
      paths={["Home", "Application Form"]}
    >
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
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
              >
                <Input placeholder="Input your name here.." />
              </Form.Item>

              <Form.Item
                label="ID Number"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Please input ID number!",
                  },
                ]}
              >
                <Input placeholder="Input your ID number here.." />
              </Form.Item>

              <Form.Item
                label="E-mail Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input e-mail address!",
                  },
                ]}
              >
                <Input placeholder="Input your email address here.." />
              </Form.Item>

              <Form.Item
                label="Contact Number"
                name="telnum"
                rules={[
                  {
                    required: true,
                    message: "Please input contact number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Qualification"
                name="qualification"
                rules={[
                  {
                    required: true,
                    message: "Please input qualification details!",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Input your relevant qualification details here.." />
              </Form.Item>

              <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                          required: true,
                          message: "Please upload qualification documents!",
                        },
                      ]}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload qualification documents</Button>
                    </Upload>
                </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea rows={4} placeholder="Enter any additional details that you want to add .." />
              </Form.Item>

            <Form.Item name="classdetails" label="Class Details">
              <Form.List name="tutorclasses">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                       
                        <Form.Item
                            {...restField}
                            name={[name, 'grade']}
                            fieldKey={[fieldKey, 'grade']}
                            rules={[{ required: true, message: 'Missing Grade' }]}
                            >
                            <InputNumber placeholder="Grade" min={1} max={13} />
                        </Form.Item>

                        <Form.Item
                            {...restField}
                            
                            name={[name, 'subject']}
                            fieldKey={[fieldKey, 'subject']}
                            rules={[{ required: true, message: 'Missing Subject' }]}
                            >
                            <Select style={{ width: 100 }} placeholder="subject">
                                <Option value="Combined Maths"> Combined Maths</Option>
                                <Option value="Physics"> Physics </Option>
                                <Option value="Chemistry">Chemistry </Option>
                                <Option value="IT"> IT </Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            {...restField}
                            name={[name, 'day']}
                            fieldKey={[fieldKey, 'day']}
                            rules={[{ required: true, message: 'Missing Day' }]}
                            >
                            <Select style={{ width: 100 }} placeholder="Day">
                                <Option value="monday">Monday</Option>
                                <Option value="tuesday">Teusday</Option>
                                <Option value="wednesday">Wednesday</Option>
                                <Option value="thursday">Thursday</Option>
                                <Option value="saturday">Saturday</Option>
                                <Option value="sunday">Sunday</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            {...restField}
                            name={[name, 'timerange']}
                            fieldKey={[fieldKey, 'timerange']}
                            rules={[{ required: true, message: 'Missing Time Range' }]}
                            >
                            
                            <TimePicker.RangePicker style={{ width: 250 }}  />,
                        </Form.Item>

                        <Form.Item
                            {...restField}
                            name={[name, 'fee']}
                            fieldKey={[fieldKey, 'fee']}
                            rules={[{ required: true, message: 'Missing Fee' }]}
                            >
                            <InputNumber  placeholder="Fee" max={1200} />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />

                    </Space>
                    ))}

                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
            </Form.Item>

              
              <Form.Item style={{ float: "right" }}>
                <Button htmlType="button">Cancel</Button>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
