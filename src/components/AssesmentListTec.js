import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, message, Button } from "antd";
import assmntservice from "services/assmnt.service";
import "./AssesmentList.scss";
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
  // new Date().toLocaleDateString()
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

            <Button className="editbtn" type="link" key="list-loadmore-edit">
              <Link to={"/assessment/" + item.id}>edit</Link>
            </Button>
            <Button type="link" key="list-loadmore-more">
              <Link to={"/assessment/submisstions/" + item.id}>
                submisstions
              </Link>
            </Button>
          </List.Item>
        );
      }}
    />
  );
}
