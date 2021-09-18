import React, { useEffect, useState } from "react";
import { List, Avatar, message } from "antd";
import passmntservice from "services/passmnt.service";
import { Link } from "react-router-dom";

const initdata = [
  { title: "sdvcsdvs", duedate: "2021/3/30 - 12.00pm" },
  { title: "sdvcsdvs", duedate: "2021/3/30 - 12.00pm" },
];

export default function PAssesmentListStu({ sdid }) {
  const [data, setData] = useState(initdata);
  useEffect(() => {
    passmntservice
      .getAssmnts(sdid)
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [sdid]);

  return (
    <List
      className="res-list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => {
        let duedate = new Date(item.duedate);
        let duetdateTxt = duedate.toLocaleString();
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<Link to={"/assessment/" + item.id}>{item.title}</Link>}
              description={"Due Date : " + duetdateTxt}
            />
          </List.Item>
        );
      }}
    />
  );
}
