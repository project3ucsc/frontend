import React from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";

export default function SAdminSideBar() {
  const { SubMenu } = Menu;
  const subjects = ["Maths", "Chemistry", "Physics", "English"];
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
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to="/dashboard">Home</Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to="/managesections">Sections</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ContainerOutlined />}>
          <Link to="/manageclasses">ClassRooms</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ContainerOutlined />}>
          <Link to="/timeslots">TimeSlots</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ContainerOutlined />}>
          <Link to="/timetables">TimeTables</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
