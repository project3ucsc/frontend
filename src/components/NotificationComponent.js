import React, { useState, useEffect } from "react";

import { Button, Avatar, List, message, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import notificationservice from "services/notification.service";

export default function NotificationComponent({
  setNotifiCount,
  onNotiDrawerClose,
  notifivisible,
  currentUser,
}) {
  const [notidata, setnotidata] = useState([]);
  const onClose = async (e) => {
    try {
      console.log(e.target.id);
      const id = parseInt(e.target.id);
      await notificationservice.deleteNotification(id);
      setnotidata(notidata.filter((item) => item.id !== id));
    } catch (error) {
      message.error("Couldn't clear the notification");
    }
  };

  useEffect(() => {
    if (currentUser)
      notificationservice
        .getNotifications()
        .then((data) => {
          setnotidata(data);
          setNotifiCount(data.length);
        })
        .catch((e) => message.error(e.message));
  }, [currentUser]);

  useEffect(() => {
    setNotifiCount(notidata.length);
  }, [notidata]);

  return (
    <Drawer
      width={350}
      style={{ marginTop: 64 }}
      className="noti-drawer"
      title="Notifications"
      placement="right"
      closable={true}
      onClose={onNotiDrawerClose}
      visible={notifivisible}
    >
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
                title={<Link to={item.onClickTo}>{item.title}</Link>}
                // title={<a href={item.onClickTo}>{item.title}</a>}
                description={item.discription}
              />
            </List.Item>
          )}
        />
      </div>
    </Drawer>
  );
}
