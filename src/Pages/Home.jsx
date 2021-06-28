import React from "react";
import { Layout } from "antd";
import ContentLayout from "Components/ContentLayout";

export default function Home() {
  const { Content } = Layout;

  return (
    <ContentLayout paths={["Home"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        Bla bla home
      </Content>
    </ContentLayout>
  );
}
