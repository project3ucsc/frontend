import React, { useState, useEffect } from "react";
import { Avatar, List, message } from "antd";
import { Link } from "react-router-dom";

import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

export default function StudentPclassList() {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let userid = authenticationservice.currentUserValue.id;
    axios
      .get(`${apiurl}/tutor/studenttution/${userid}`, authHeader())
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={classes}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<Link to={"subjectPage/" + item.id}>{item.name}</Link>}
            description={item.tutor}
          />
        </List.Item>
      )}
    />
  );
}
