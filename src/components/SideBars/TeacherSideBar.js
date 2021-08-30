import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TableOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  HomeOutlined,
  AuditOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import classroomservice from "services/classroom.service";
const { SubMenu } = Menu;

export default function TeacherSideBar() {
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    classroomservice
      .getSubDetailsforTeacher()
      .then((data) => {
        setSubLinks(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
          {subLinks.map((item) => (
            <Menu.Item key={"s" + item.id}>
              <Link to={"/subject/" + item.id}>
                {" "}
                {`${item.classroom.grade}-${item.classroom.name} ${item.subject.name}`}
              </Link>
            </Menu.Item>
          ))}
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
      </Menu>
    </Layout.Sider>
  );
}
