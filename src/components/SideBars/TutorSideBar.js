import React from "react";
import { Link } from "react-router-dom";

import { Layout, Menu } from "antd";
// const { SubMenu} = Menu;

import {
  HomeOutlined,
  DesktopOutlined,
  DollarOutlined,
  FormOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export default function TutorSideBar() {
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
        <Menu.Item key="7" icon={<DollarOutlined />}>
          <Link to="/paymentslipcheck">Payments</Link>
        </Menu.Item>

        <Menu.Item key="8" icon={<DollarOutlined />}>
          <Link to="/subjectPage">Lesson</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<FormOutlined />}>
          <Link to="/applicationform">Application Form</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<PlusCircleOutlined />}>
          <Link to="/addnewclasses">Add New Class</Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>

        {/* <SubMenu></SubMenu> */}
      </Menu>
    </Layout.Sider>
  );
}
