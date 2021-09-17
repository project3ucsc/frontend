import React from "react";
import { Layout, PageHeader } from "antd";

import "./ContentLayout.scss";

export default function ContentLayout(props) {
  return (
    <Layout className="mainlayout" style={{ padding: "0 10px 10px" }}>
      <PageHeader
        style={{
          marginBottom: 10,
          backgroundColor: "#ffffff",
        }}
        className="site-page-header"
        onBack={() => window.history.back()}
        title={props.title}
        subTitle={props.subtitle}
      />

      {props.children}
    </Layout>
  );
}
