import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  HomeOutlined,
  UserOutlined,
  ReadOutlined,
  FolderAddOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import classroomservice from "services/classroom.service";

export default function StudentSideBar() {
  const { SubMenu } = Menu;
  const [subLinks, setSubLinks] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [classroonName, setClassroonName] = useState("");

  useEffect(() => {
    classroomservice
      .getSubDetailsforStudent()
      .then((data) => {
        setLoadingSubs(false);
        setSubLinks(data.subs);
        setClassroonName(`${data.classroom.grade}-${data.classroom.name}`);
        localStorage.setItem(
          "clsname",
          `${data.classroom.grade}-${data.classroom.name}`
        );
        console.log(data);
      })
      .catch((e) => {
        console.log(e.message);
        if (e.message === "notenrolled") {
          setLoadingSubs(false);
        }
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
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to="/Dashboard">Dashboard</Link>
        </Menu.Item>
        {!loadingSubs && subLinks.length !== 0 && (
          <SubMenu
            key="sub1"
            icon={<AppstoreOutlined />}
            title={"Subjects " + classroonName}
          >
            {subLinks.map((item) => (
              <Menu.Item key={"s" + item.id}>
                <Link to={"/subject/" + item.id}>{item.subject.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        )}

        {!loadingSubs && subLinks.length === 0 && (
          <Menu.Item key="en" icon={<AppstoreOutlined />}>
            <Link to="/subject">Subjects</Link>
          </Menu.Item>
        )}

        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to="/timetable">Time Table</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/Profile">Profile</Link>
        </Menu.Item>

        <Menu.Item key="7" icon={<UserOutlined />}>
          <Link to="/tvprogramme">Suggest Free Programmes</Link>
        </Menu.Item>

        <Menu.Item key="8" icon={<HomeOutlined />}>
          <Link to="/tuitionHome">Extra Classes</Link>
        </Menu.Item>

        <Menu.Item key="9" icon={<SnippetsOutlined/>}>
          <Link to="/viewpublicresources">Public Resources</Link>
        </Menu.Item>

        {/* <SubMenu key="sub2" icon={<MailOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>

        </SubMenu> */}
      </Menu>
    </Layout.Sider>
  );
}
