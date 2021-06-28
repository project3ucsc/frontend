import React from "react";
import { Layout, Breadcrumb } from "antd";

import "./ContentLayout.scss";

export default function ContentLayout(props) {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {props.paths.map((path, index) => {
          return <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
      {props.children}
    </Layout>
  );
}
