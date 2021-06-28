import React from "react";
import { Layout, Breadcrumb } from "antd";

import "./Dashboard.scss";
import Nav from "Components/Nav";
export default function Dashboard({ collapsed }) {
  const { Content } = Layout;
  return (
    <Layout>
      <Nav />

      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
