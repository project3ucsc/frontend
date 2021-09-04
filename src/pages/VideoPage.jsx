import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { getLearnMatUrl } from "services/azureblob.service";
import { PageHeader } from "antd";
import "./VideoPage.scss";
import ContentLayout from "components/ContentLayout";

export default function VideoPage() {
  const { secname, name, filename } = useParams();
  return (
    <ContentLayout title="" paths={[]}>
      <PageHeader
        style={{
          marginBottom: 10,
          backgroundColor: "#ffffff",
        }}
        className="site-page-header"
        onBack={() => window.history.back()}
        title={secname}
        subTitle={name}
      />
      <ReactPlayer
        width="100%"
        className="vid"
        controls
        url={getLearnMatUrl(filename)}
      />
    </ContentLayout>
  );
}
