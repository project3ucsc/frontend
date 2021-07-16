import "./Timetable.scss";
import { Form, Select, Button } from "antd";

const { Option } = Select;

function SelectSub({ subs, name }) {
  return (
    <Form.Item
      className="table-form-item"
      name={name}
      rules={[
        {
          required: true,
          message: "Please select grade!",
        },
      ]}
    >
      <Select placeholder="select subject" style={{ minWidth: 50 }}>
        {subs.map((sub) => (
          <Option key={sub.id} value={sub.id}>
            {sub.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default function TimeTableManager({ data, subs }) {
  const onFinish = (val) => {
    console.log(JSON.stringify(val));
  };
  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        "1-0": 2,
        "1-1": 4,
        "1-2": 2,
        "1-3": 3,
        "1-4": 3,
        "2-0": 2,
        "2-1": 2,
        "2-2": 2,
        "2-3": 2,
        "2-4": 4,
        "3-0": 2,
        "3-1": 3,
        "3-2": 3,
        "3-3": 3,
        "3-4": 1,
        "4-0": 3,
        "4-1": 1,
        "4-2": 4,
        "4-3": 3,
        "4-4": 2,
      }}
    >
      <div className="ant-table ant-table-bordered">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table style={{ tableLayout: "auto" }}>
              <colgroup></colgroup>
              <thead className="ant-table-thead">
                <tr>
                  <th className="ant-table-cell">Period</th>
                  <th className="ant-table-cell">Time</th>
                  <th className="ant-table-cell">Mon</th>
                  <th className="ant-table-cell">Tue</th>
                  <th className="ant-table-cell">Wed</th>
                  <th className="ant-table-cell">Thu</th>
                  <th className="ant-table-cell">Fri</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {data.map((row) => {
                  return (
                    <tr
                      key={row.key}
                      className="ant-table-row ant-table-row-level-0"
                    >
                      <td className="ant-table-cell">{row.key}</td>
                      <td className="ant-table-cell">{row.time}</td>

                      <td className="ant-table-cell">
                        <SelectSub name={row.key + "-0"} subs={subs} />
                      </td>
                      <td className="ant-table-cell">
                        <SelectSub name={row.key + "-1"} subs={subs} />
                      </td>
                      <td className="ant-table-cell">
                        <SelectSub name={row.key + "-2"} subs={subs} />
                      </td>
                      <td className="ant-table-cell">
                        <SelectSub name={row.key + "-3"} subs={subs} />
                      </td>
                      <td className="ant-table-cell">
                        <SelectSub name={row.key + "-4"} subs={subs} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Form.Item>
        <Button
          style={{ marginRight: 20, float: "right" }}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
        <Button
          style={{ marginRight: 20, float: "right" }}
          type="default"
          htmlType="button"
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
