import React from "react";
import { Layout, Breadcrumb } from "antd";

import "./ContentLayout.scss";

export default function ContentLayout(props) {
  return (
    <Layout style={{ padding: "0 10px 10px" }}>
      <Breadcrumb style={{ margin: "10px 0" }}>
        {props.paths.map((path, index) => {
          return <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
      {props.children}
    </Layout>
  );
}
