import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { getLearnMatUrl } from "services/azureblob.service";
import { PageHeader } from "antd";
import "./VideoPage.scss";
import BackLayout from "components/BackLayout";

export default function VideoPage() {
  const { secname, name, filename } = useParams();
  return (
    <BackLayout title={secname} subTitle={name}>
      <ReactPlayer
        width="100%"
        className="vid"
        controls
        url={getLearnMatUrl(filename)}
      />
    </BackLayout>
  );
}
