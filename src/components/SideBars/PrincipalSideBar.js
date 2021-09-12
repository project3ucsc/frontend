import React from "react";
import { Link } from "react-router-dom";
import {
  UsergroupAddOutlined,
  DesktopOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";

export default function PrincipalSideBar() {
  return (
    <Layout.Sider
      width={200}
      className="site-layout-background"
      breakpoint={"md"}
      collapsedWidth={50}
      collapsible
    >
      <Menu
        defaultSelectedKeys={["2"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
          <Link to="/SclAdminManagement">School Admin Management</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
