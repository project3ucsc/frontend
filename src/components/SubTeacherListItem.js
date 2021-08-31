import React, { useState } from "react";
import { Form, Select, Button, Space, message, Popconfirm } from "antd";
import classroomservice from "services/classroom.service";

const { Option } = Select;

const spacestyle = {
  display: "flex",
  marginBottom: 0,
  height: 51,
  justifyContent: "center",
};
const searchpropsforSelect = {
  showSearch: true,
  optionFilterProp: "children",
  filterOption: (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
};

export default function SubTeacherListItem({ teachers, subjects, sd, remove }) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showdeletePopconfirm = () => {
    setVisible(true);
  };

  const handleOkdelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);

      // update ui
      remove(sd.id);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const onFinish = async (val) => {
    try {
      if (!disabled) {
        setLoading(true);
        console.log(val);
        await classroomservice.updateSubjectDetail(val, sd.id);
        message.success("Subject detail upadted succesfully");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }

    setDisabled(!disabled);
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        subject: sd.subjectid,
        teacher: sd.teacher_id,
      }}
    >
      <Space
        // key={key}
        align="baseline"
        style={spacestyle}
      >
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "Missing subject",
            },
          ]}
        >
          <Select
            {...searchpropsforSelect}
            disabled={disabled}
            placeholder="select subject"
            style={{ minWidth: 150 }}
          >
            {subjects.map((subject) => (
              <Option key={subject.id} value={subject.id}>
                {subject.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="teacher"
          rules={[
            {
              required: true,
              message: "Missing teacher",
            },
          ]}
        >
          <Select
            {...searchpropsforSelect}
            placeholder="select teacher"
            style={{ minWidth: 150 }}
            disabled={disabled}
          >
            {teachers.map((teacher) => (
              <Option key={teacher.id} value={teacher.id}>
                {teacher.username}
              </Option>
            ))}
          </Select>
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
