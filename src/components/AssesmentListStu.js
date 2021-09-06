import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";

const initdata = [
  { title: "sdvcsdvs", duedate: "2021/3/30 - 12.00pm" },
  { title: "sdvcsdvs", duedate: "2021/3/30 - 12.00pm" },
];

export default function AssesmentListStu({ sdid }) {
  const [data, setData] = useState(initdata);
  useEffect(() => {}, [sdid]);
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
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
