import "./Timetable.scss";
import "./Timetablebig.scss";
import { Card } from "antd";
import { getDateTxt } from "utils/common";
import { Link } from "react-router-dom";

function Timecard({ sdid, name, time }) {
  return sdid === 0 ? (
    <Card
      className="timecard"
      style={{ textAlign: "center" }}
      size="small"
      title={time}
    >
      {name}
    </Card>
  ) : (
    <Link to={"/subject/" + sdid}>
      <Card
        className="timecard"
        style={{ textAlign: "center" }}
        size="small"
        title={time}
      >
        {name}
      </Card>
    </Link>
  );
}

export default function TimeTableSm({ data, day }) {
  var newdata = [];
  data.forEach((row) => {
    const datetime = getDateTxt(
      row.period.starttime,
      row.period.endtime,
      "h23"
    );

    const ts = row.timeslots.filter((ts) => ts.weekday === day);
    let subname = "";
    let sdid = 0;
    if (ts.length === 0) subname = "None";
    if (ts.length === 1) {
      subname = ts[0].subject_detail.subject.name;
      sdid = ts[0].sdid;
    }

    if (ts.length > 1) {
      subname = ts.reduce(
        (a, b) =>
          a.subject_detail.subject.name + "/" + b.subject_detail.subject.name
      );
      sdid = ts[0].sdid;
    }
    newdata.push({ datetime, subname, sdid });
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
                      <Timecard
                        sdid={row.sdid}
                        time={row.datetime}
                        name={row.subname}
                      />
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
