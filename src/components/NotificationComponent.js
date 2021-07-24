import React, { useState, useEffect } from "react";

import { Button, Avatar, List } from "antd";
import { CloseOutlined } from "@ant-design/icons";

var ndata = [
  {
    id: 1,
    title: "Notification Title 1",
    dis: "This is a sample notification",
  },
  {
    id: 2,
    title: "Notification Title 2",
    dis: "This is a sample notification",
  },
  {
    id: 3,
    title: "Notification Title 3",
    dis: "This is a sample notification",
  },
  {
    id: 4,
    title: "Notification Title 4",
    dis: "This is a sample notification",
  },
];

export default function NotificationComponent({ setNotifiCount }) {
  const [notidata, setnotidata] = useState(ndata);
  const onClose = (e) => {
    console.log(e.target.id);
    const id = parseInt(e.target.id);
    setnotidata(notidata.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setNotifiCount(notidata.length);
  }, [notidata]);

  return (
    <div className="noti-con">
      <List
        itemLayout="horizontal"
        dataSource={notidata}
        renderItem={(item) => (
          <List.Item
            style={{ alignItems: "flex-start" }}
            actions={[
              <Button id={item.id} onClick={onClose} type="text">
                <CloseOutlined style={{ pointerEvents: "none" }} />
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.dis}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
