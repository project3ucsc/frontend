import React from "react";
import { Link } from "react-router-dom";
import {
  TableOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  HomeOutlined,
  AuditOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
const { SubMenu } = Menu;

export default function TeacherSideBar() {
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

        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Subjects">
          {/* {subjects.map((subject, index) => (
            <Menu.Item key={"s" + index}>{subject}</Menu.Item>
          ))} */}
          <Menu.Item key="phy">
            <Link to="/Physics">Com.Maths</Link>
          </Menu.Item>
          <Menu.Item key="ph">
            <Link to="/subject">Physics</Link>
          </Menu.Item>
          <Menu.Item key="py">
            <Link to="/Physics">Chemistry</Link>
          </Menu.Item>
          <Menu.Item key="hy">
            <Link to="/Physics">Gen.English</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="4" icon={<SolutionOutlined />}>
          <Link to="/manageclasses">ClassRooms</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ScheduleOutlined />}>
          <Link to="/timeslots">TimeSlots</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TableOutlined />}>
          <Link to="/timetables">TimeTables</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<AuditOutlined />}>
          <Link to="/applyleave">ApplyLeave</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<FolderOpenOutlined />}>
          <Link to="/classincharge">ClassInCharge</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
