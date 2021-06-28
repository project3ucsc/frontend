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

export default function SideBar() {
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
          Dashboard
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Subjects">
          {subjects.map((subject, index) => (
            <Menu.Item key={"s" + index}>{subject}</Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="4" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>

        <SubMenu key="sub2" icon={<MailOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Layout.Sider>
  );
}