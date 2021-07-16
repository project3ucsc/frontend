import React from "react";
import { Link } from "react-router-dom";
import {
  TableOutlined,
  BorderOuterOutlined,
  DesktopOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";

export default function SystemAdminSideBar() {
  return (
    <Layout.Sider
      width={200}
      className="site-layout-background"
      breakpoint={"md"}
      // trigger={null}
      collapsedWidth={65}
      collapsible

      // collapsed={collapsed}
    >
      <Menu
        defaultSelectedKeys={["2"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        // theme="dark"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<BorderOuterOutlined />}>
          <Link to="/School">New School Requests</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined />}>
          <Link to="/eduProg">Education Programmes</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ScheduleOutlined />}>
          <Link to="/timeslots">Analysis</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TableOutlined />}>
          <Link to="/timetables">Tutor Managment</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
