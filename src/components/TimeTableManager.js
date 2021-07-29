import "./Timetable.scss";
import React, { useState } from "react";

import { Select, Button, Row, message } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import timeslotservice from "services/timeslot.service";

const { Option } = Select;

const st = {
  dirty: "d",
  success: "s",
  err: "e",
};

function SelectSub({ subdetail, periodid, classid, weekday, timeslotdata }) {
  var currnttsid = timeslotdata.id;

  const [val, setval] = useState(
    timeslotdata.sdid + "." + timeslotdata.teacher_id
  );
  const [loading, setloading] = useState(false);
  const [btnstate, setBtnstate] = useState(
    timeslotdata.id !== -1 ? st.success : st.dirty
  );
  const onBtnClick = async () => {
    setloading(true);
    const [sdid, teacherid] = val.split(".");
    try {
      const data = {
        period_id: periodid,
        teacher_id: parseInt(teacherid),
        class_id: classid,
        sd_id: parseInt(sdid),
        weekday: weekday,
      };
      if (currnttsid === -1) {
        const ts = await timeslotservice.addTimeslot(data);
        currnttsid = ts.id;
        // await setTimslot(val);
        setloading(false);
        setBtnstate(st.success);
        message.success("Success");
      } else {
        await timeslotservice.updateTimeslot(data, currnttsid);
        // await setTimslot(val);
        setloading(false);
        setBtnstate(st.success);
        message.success("Success");
      }
    } catch (error) {
      setloading(false);
      setBtnstate(st.err);
      message.error(error.message);
    }
  };
  const onChange = (value) => {
    setval(value);
    setBtnstate(st.dirty);
  };
  return (
    <Row>
      <Select
        className="table-select"
        value={val}
        onChange={onChange}
        placeholder="select subject"
        style={{ minWidth: 50 }}
      >
        {subdetail.map((subdetail) => (
          <Option
            key={subdetail.id}
            value={subdetail.id + "." + subdetail.teacher_id}
          >
            {subdetail.subject.name}
          </Option>
        ))}
      </Select>
      <Button
        disabled={val === "select subject."}
        loading={loading}
        onClick={onBtnClick}
      >
        Set
      </Button>
      <Button type="text">
        {btnstate === st.success && (
          <CheckCircleOutlined style={{ fontSize: "20px", color: "green" }} />
        )}
        {btnstate === st.dirty && (
          <ExclamationCircleOutlined
            style={{ fontSize: "20px", color: "#acad16" }}
          />
        )}
        {btnstate === st.err && (
          <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
        )}
      </Button>
    </Row>
  );
}

export default function TimeTableManager({ timeslotdata, classdetail }) {
  const timeoptions = {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  };
  const days = [1, 2, 3, 4, 5];

  return (
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
              {timeslotdata.map((row, i) => {
                let st = new Date(row.period.starttime);
                let et = new Date(row.period.endtime);
                return (
                  <tr key={i} className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">{i + 1}</td>
                    <td className="ant-table-cell">
                      {`${st.toLocaleTimeString(
                        [],
                        timeoptions
                      )} - ${et.toLocaleTimeString([], timeoptions)}`}
                    </td>

                    {days.map((day) => {
                      let ts = row.timeslots.find((ts) => ts.weekday === day);
                      if (!ts)
                        ts = { id: -1, teacher_id: "", sdid: "select subject" };

                      const selectprops = {
                        periodid: row.period.id,
                        weekday: day,
                        classid: classdetail.id,
                        subdetail: classdetail.subject_detail,
                        timeslotdata: ts,
                      };
                      return (
                        <td key={i + day} className="ant-table-cell">
                          <SelectSub {...selectprops} />
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
