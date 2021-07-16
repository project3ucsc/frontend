import "./Timetable.scss";
import "./Timetablebig.scss";
import { Card } from "antd";

function Timecard({ name, time }) {
  return (
    <Card style={{ textAlign: "center" }} size="small" title={time}>
      {name}
    </Card>
  );
}

export default function TimeTableBig({ data }) {
  return (
    <div className="ant-table ant-table-bordered">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table style={{ tableLayout: "auto" }}>
            <colgroup></colgroup>
            <thead className="ant-table-thead">
              <tr>
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
                    <td className="ant-table-cell">
                      <Timecard key={row.key} time={row.time} name={row.mon} />
                    </td>
                    <td className="ant-table-cell">
                      <Timecard key={row.key} time={row.time} name={row.tue} />
                    </td>
                    <td className="ant-table-cell">
                      <Timecard key={row.key} time={row.time} name={row.wed} />
                    </td>
                    <td className="ant-table-cell">
                      <Timecard key={row.key} time={row.time} name={row.thu} />
                    </td>
                    <td className="ant-table-cell">
                      <Timecard key={row.key} time={row.time} name={row.fri} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
