import React from "react";
import { Layout, Breadcrumb, Typography } from "antd";

import "./ContentLayout.scss";

export default function ContentLayout(props) {
  const { Title } = Typography;
  return (
    <Layout style={{ padding: "0 10px 10px" }}>
      <div className="site-layout-top">
        <Breadcrumb style={{ margin: "10px 0" }}>
          {props.paths.map((path, index) => {
            return <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <Title level={3}>{props.title}</Title>
      </div>

      {props.children}
    </Layout>
  );
}
