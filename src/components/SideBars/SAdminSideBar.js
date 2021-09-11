import React from "react";
import { Link } from "react-router-dom";
import {
  TableOutlined,
  BorderOuterOutlined,
  DesktopOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
const { SubMenu } = Menu;
export default function SAdminSideBar() {
  return (
    <Layout.Sider
      width={200}
      className="site-layout-background"
      breakpoint={"md"}
      // trigger={null}
      collapsedWidth={50}
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
          <Link to="/managesections">Sections</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined />}>
          <Link to="/manageclasses">ClassRooms</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ScheduleOutlined />}>
          <Link to="/timeslots">TimeSlots</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TableOutlined />}>
          <Link to="/timetables">TimeTables</Link>
        </Menu.Item>

        <SubMenu
          key="m"
          icon={<UsergroupAddOutlined />}
          title={"User Management"}
        >
          <Menu.Item key="m1">
            <Link to="/StudentManagement">Student Management</Link>
          </Menu.Item>

          <Menu.Item key="m2">
            <Link to="/TeacherManagement">Teacher Management</Link>
          </Menu.Item>

          <Menu.Item key="m3">
            <Link to="/TutorManagement">Tutor Management</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Sider>
  );
}
