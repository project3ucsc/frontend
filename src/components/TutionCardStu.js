import React from "react";
import { useState } from "react";
import { Button, Tag, Popover, message } from "antd";
import { getDateTxt, apiurl } from "utils/common";

import axios from "axios";
import { authHeader } from "utils/authheader";
import authenticationservice from "services/authentication.service";

export default function TutionCardStu({ i, cls }) {
  const classsuffix = (i % 3) + 1;
  const [enroll, setEnroll] = useState({ bool: false, txt: "Enroll" });
  const [loading, setLoading] = useState(false);
  const onEnroll = async () => {
    try {
      setLoading(true);
      const stuid = authenticationservice.currentUserValue.id;
      await axios.post(
        `${apiurl}/tutor/studenttution`,
        { pclassid: cls.id, stuid },
        authHeader()
      );
      setLoading(false);

      setEnroll({ bool: true, txt: "Request Sent" });

      message.success("Enroll request sent to the tutor successfully");
      // return res.data;
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  return (
    <div
      style={{ margin: 10 }}
      key={i}
      className={"card-body" + classsuffix}
      bordered={true}
    >
      <Tag className="title" color="magenta">
        {cls.subject + " | Grade " + cls.grade}
        <div className="details">
          <p> {cls.tutor.username} </p>
          <p>
            {cls.day} at {getDateTxt(cls.sttime, cls.endtime, "h12")}
          </p>
          <p> Monthly Fee {cls.fee} LKR </p>
        </div>
        <Button
          className={"enroll" + classsuffix}
          type="primary"
          colour={"black"}
          disabled={enroll.bool}
          loading={loading}
          onClick={onEnroll}
        >
          {enroll.txt}
        </Button>
        <Popover
          content={
            <div>
              <p>{cls.discription}</p>
            </div>
          }
          title="Discriptin"
        >
          <Button className={"view" + classsuffix} type="primary">
            View More
          </Button>
        </Popover>
      </Tag>
    </div>
  );
}
