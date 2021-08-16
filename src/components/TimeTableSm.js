import "./Timetable.scss";
import "./Timetablebig.scss";
import { Card } from "antd";
import { getDateTxt } from "utils/common";

function Timecard({ name, time }) {
  return (
    <Card style={{ textAlign: "center" }} size="small" title={time}>
      {name}
    </Card>
  );
}

export default function TimeTableSm({ data, day }) {
  var newdata = [];
  data.forEach((row) => {
    const datetime = getDateTxt(row.period.starttime, row.period.endtime);

    const ts = row.timeslots.filter((ts) => ts.weekday === day);
    let subname = "";

    if (ts.length === 0) subname = "None";
    if (ts.length === 1) subname = ts[0].subject_detail.subject.name;

    if (ts.length > 1)
      subname = ts.reduce(
        (a, b) =>
          a.subject_detail.subject.name + "/" + b.subject_detail.subject.name
      );
    newdata.push({ datetime, subname });
  });

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
              {newdata.map((row, i) => {
                return (
                  <tr key={i} className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">
                      <Timecard time={row.datetime} name={row.subname} />
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
