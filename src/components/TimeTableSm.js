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

export default function TimeTableSm({ data, day }) {
  return (
    <div className="ant-table ant-table-bordered">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table style={{ tableLayout: "auto" }}>
            <colgroup></colgroup>
            {/* <thead className="ant-table-thead">
              <tr>
                <th className="ant-table-cell">{day}</th>
              </tr>
            </thead> */}
            <tbody className="ant-table-tbody">
              {data.map((row) => {
                return (
                  <tr
                    key={row.key}
                    className="ant-table-row ant-table-row-level-0"
                  >
                    <td className="ant-table-cell">
                      {day === "mon" && (
                        <Timecard time={row.time} name={row.mon} />
                      )}
                      {day === "tue" && (
                        <Timecard time={row.time} name={row.tue} />
                      )}
                      {day === "wed" && (
                        <Timecard time={row.time} name={row.wed} />
                      )}
                      {day === "thu" && (
                        <Timecard time={row.time} name={row.thu} />
                      )}
                      {day === "fri" && (
                        <Timecard time={row.time} name={row.fri} />
                      )}
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
