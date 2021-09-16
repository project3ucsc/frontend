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
  FolderOpenOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import classroomservice from "services/classroom.service";
import authenticationservice from "services/authentication.service";
const { SubMenu } = Menu;

export default function TeacherSideBar() {
  const [subLinks, setSubLinks] = useState([]);
  const teacher_id = authenticationservice.currentUserValue.id;
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

        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Subjects">
          {subLinks.map((item) => (
            <Menu.Item
              icon={
                teacher_id === item.classroom.classteacher_id ? (
                  <TableOutlined style={{ marginRight: 0 }} />
                ) : (
                  ""
                )
              }
              key={"s" + item.id}
            >
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
        <Menu.Item key="8" icon={<FolderOpenOutlined />}>
          <Link to="/classincharge">ClassInCharge</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
