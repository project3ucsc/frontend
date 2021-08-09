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
  const initTslots = timeslotdata.map((ts) => ts.sdid + "." + ts.teacher_id);

  const [currentTimeslots, setCurrentTimeslots] = useState(
    timeslotdata.map((ts) => {
      return { id: ts.id, val: ts.sdid + "." + ts.teacher_id };
    })
  );

  const [val, setval] = useState(timeslotdata[0].id !== -1 ? initTslots : []);
  const [loading, setloading] = useState(false);
  const [btnstate, setBtnstate] = useState(
    timeslotdata[0].id !== -1 ? st.success : st.dirty
  );
  const onBtnClick = async () => {
    setloading(true);

    val.forEach(async (v) => {
      try {
        const [sdid, teacherid] = v.split(".");
        // console.log("init:" + initTimeslots);

        const data = {
          period_id: periodid,
          teacher_id: parseInt(teacherid),
          class_id: classid,
          sd_id: parseInt(sdid),
          weekday: weekday,
        };
        if (!currentTimeslots.some((ts) => ts.val === v)) {
          const ts = await timeslotservice.addTimeslot(data);
          setCurrentTimeslots([...currentTimeslots, { id: ts.id, val: v }]);
          // currnttsid = ts.id;
          // await setTimslot(val);
          setloading(false);
          setBtnstate(st.success);
          message.success("Success");
        } else {
          setloading(false);
          setBtnstate(st.success);
          // message.info("");
        }
      } catch (error) {
        setloading(false);
        setBtnstate(st.err);
        message.error(error.message);
      }
    });
  };
  const onChange = (value) => {
    console.log(value);
    setval(value);
    setBtnstate(st.dirty);
  };
  const onItemClear = async (value) => {
    console.log("cleared : " + value);
    const ts = currentTimeslots.find((t) => t.val === value);
    try {
      if (ts) {
        await timeslotservice.deleteTimeslot(ts.id);
        setCurrentTimeslots(currentTimeslots.filter((t) => t.val !== value));
        message.info("Timeslot cleared");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Row>
      <Select
        mode="multiple"
        allowClear
        onDeselect={onItemClear}
        className="table-select"
        defaultValue={val}
        // value={val}
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
                      let ts = row.timeslots.filter((ts) => ts.weekday === day);
                      if (ts.length === 0)
                        ts = [{ id: -1, teacher_id: "", sdid: "" }];

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
