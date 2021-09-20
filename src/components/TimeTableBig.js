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
              {data.map((row, index) => {
                const datestr = getDateTxt(
                  row.period.starttime,
                  row.period.endtime,
                  "h23"
                );
                const days = [1, 2, 3, 4, 5];
                return (
                  <tr
                    key={index}
                    className="ant-table-row ant-table-row-level-0"
                  >
                    {days.map((day, i) => {
                      const ts = row.timeslots.filter(
                        (ts) => ts.weekday === day
                      );
                      let subname = "";
                      let sdid = 0;
                      if (ts.length === 0) {
                        subname = "None";
                      }

                      if (ts.length === 1) {
                        sdid = ts[0].sdid;
                        subname = ts[0].subject_detail.subject.name;
                      }

                      if (ts.length > 1) {
                        sdid = ts[0].sdid;

                        subname = ts.reduce(
                          (a, b) =>
                            a.subject_detail.subject.name +
                            "/" +
                            b.subject_detail.subject.name
                        );
                      }

                      return (
                        <td key={i} className="ant-table-cell">
                          <Timecard sdid={sdid} time={datestr} name={subname} />
                        </td>
                      );
                    })}
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
