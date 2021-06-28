import React from "react";
import { Layout } from "antd";
import ContentLayout from "Components/ContentLayout";

import SideBar from "Components/SideBar";
export default function Dashboard() {
  const { Content } = Layout;
  return (
    <Layout>
      <SideBar />

      <ContentLayout paths={["Home", "Dashboard"]}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Bla bla dzfg;ihdfb dshb
        </Content>
      </ContentLayout>
    </Layout>
  );
}
