import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Layout, Menu, message } from "antd";
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "services/authentication.service";

import {
  HomeOutlined,
  DesktopOutlined,
  DollarOutlined,
  FormOutlined,
  UserOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

export default function TutorSideBar() {

  const [subLinks, setSubLinks] = useState([]);
  useEffect(() => {
    let userid = authenticationservice.currentUserValue.id;
    axios
      .get(`${apiurl}/tutor/classes/list/${userid}`, authHeader())
      .then((res) => {
        setSubLinks(res.data);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }, []);

  return (
    <Layout.Sider
      width={200}
      className="site-layout-background"
      breakpoint={"md"}
      collapsedWidth={50}
      collapsible
    >
      <Menu defaultSelectedKeys={["2"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="My Classes">
          {subLinks.map((item) => (
            <Menu.Item key={"s" + item.id}>
              <Link to={"/classpage/" + item.id}>
                {item.subject + " | Grade " + item.grade}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>

        <Menu.Item key="7" icon={<DollarOutlined />}>
                    <Link to="/managepayments">Manage Payments</Link>
            </Menu.Item>

        {/* <Menu.Item key="8" icon={<DollarOutlined />}>
          <Link to="/subjectPage">Lesson</Link>
        </Menu.Item> */}
        <Menu.Item key="9" icon={<FormOutlined />}>
          <Link to="/applicationform">Application Form</Link>
        </Menu.Item>
        {/* <Menu.Item key="10" icon={<PlusCircleOutlined />}>
          <Link to="/addnewclasses">Add New Class</Link>
        </Menu.Item> */}
        <Menu.Item key="11" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>

        {/* <SubMenu></SubMenu> */}
      </Menu>
    </Layout.Sider>
  );

}
