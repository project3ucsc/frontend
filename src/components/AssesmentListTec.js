import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, message, Button } from "antd";
import assmntservice from "services/assmnt.service";

const initdata = [
  { title: "sdvcsdvs", duedate: "2021/3/30 - 12.00pm" },
  { title: "sdvcsdvs", duedate: "2021/3/30 - 12.00pm" },
];

export default function AssesmentListTec({ sdid }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    assmntservice
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
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button type="link" key="list-loadmore-edit">
              {" "}
              <Link to={"/assessment/" + item.id}>edit</Link>
            </Button>,
            <Button key="list-loadmore-more">
              <Link to={"/assessment/submisstions/" + item.id}>
                submisstions
              </Link>
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.duedate}
          />
        </List.Item>
      )}
    />
  );
}
