import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackLayout from "components/BackLayout";
import { Row, Col, Card, Typography, message, Spin, Tag } from "antd";
import {
  enum_submissionStatus,
  getClassName,
  getDaybyNumber,
  getTimeAgo,
} from "utils/common";
import AttachUpload from "components/AttachUpload";
import assmntservice from "services/assmnt.service";
import { containers, getFileUrl } from "services/azureblob.service";
import { TextRow } from "components/TextRow";

const { Paragraph, Text } = Typography;

export default function AssessmentStuPage() {
  const { assid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duedate, setDuedate] = useState(new Date());
  const [submitData, setSubmitData] = useState(null);

  useEffect(() => {
    setLoading(true);
    assmntservice
      .getAssmntByIdWithSubmisstion(assid)
      .then((data) => {
        setData(data);
        setSubmitData(data.submission);
        setDuedate(new Date(data.assmnt.duedate));
        setLoading(false);
        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [assid]);
  const getAttchLink = () =>
    data.assmnt.filename !== "NA" ? (
      <a href={getFileUrl(data.assmnt.filename, containers.attachments)}>
        {data.assmnt.filename.split("-nm-")[1]}
      </a>
    ) : (
      "No Attachments"
    );

  const getSubmitStatusText = (status) => {
    if (status === enum_submissionStatus.noattempt) {
      return "No attempt";
    } else {
      return "Submitted";
    }
  };
  const tagstyle = { whiteSpace: "normal" };
  const getTimeRemainigTxt = (status) => {
    if (status === enum_submissionStatus.noattempt) {
      return (
        <Tag style={tagstyle} color="blue">
          {getTimeAgo(new Date(), duedate, false)}
        </Tag>
      );
    }
    if (status === enum_submissionStatus.submitearly) {
      return (
        <Tag style={tagstyle} color="green">
          {`Assessment was submitted ${getTimeAgo(
            new Date(submitData.submitdate),
            duedate,
            false
          )} early`}
        </Tag>
      );
    }
    if (status === enum_submissionStatus.submitlate) {
      return (
        <Tag
          style={tagstyle}
          color="red"
        >{`Assessment was submitted ${getTimeAgo(
          new Date(submitData.submitdate),
          duedate,
          false
        )} late`}</Tag>
      );
    }
    return "";
  };

  const getLastModDate = (date) =>
    `${getDaybyNumber(date.getDay())}, ${date.toLocaleString()}`;

  return (
    <BackLayout title={getClassName()} subtitle="Assessment Page">
      <Row>
        <Col xs={24}>
          {!loading ? (
            <Card title={data.assmnt.title} className="lesoncard">
              <Paragraph style={{ whiteSpace: "pre-wrap", fontSize: 16 }}>
                {data.assmnt.discription}
              </Paragraph>
              <TextRow label="Attachments">{getAttchLink()}</TextRow>
              <Card title="" className="f">
                <TextRow label="Due Date">
                  <Tag style={tagstyle} color="geekblue">
                    {`${getDaybyNumber(
                      duedate.getDay()
                    )}, ${duedate.toLocaleString()}`}{" "}
                  </Tag>
                </TextRow>

                <TextRow label="Time remaining">
                  {getTimeRemainigTxt(submitData.status)}
                </TextRow>

                <TextRow label="Submission status">
                  {getSubmitStatusText(submitData.status)}
                </TextRow>
                <TextRow label="Last modified">
                  {submitData.filename === "NA"
                    ? "-"
                    : getLastModDate(new Date(submitData.submitdate))}
                </TextRow>
                <TextRow label="Submission">
                  <AttachUpload
                    dbid={assid + "." + submitData.id}
                    duedate={duedate}
                    setSubmissionStaus={setSubmitData}
                    container={containers.submissions}
                    file={
                      submitData.filename !== "NA"
                        ? { bool: true, filename: submitData.filename }
                        : { bool: false, filename: "" }
                    }
                  />
                </TextRow>
              </Card>
            </Card>
          ) : (
            <Spin />
          )}
        </Col>
      </Row>
    </BackLayout>
  );
}

export function EditableTxt({ txt, label, property, assid }) {
  const [editableStr, setEditableStr] = useState(txt);
  var strval = txt;
  // useEffect(() => {
  //   setEditableStr(txt);
  // }, [txt]);

  const onChange = (val) => {
    setEditableStr(val);
    strval = val;
  };
  const onFinish = async () => {
    console.log(editableStr);
    console.log(strval);
    try {
      await assmntservice.updateAssmnt(assid, property, strval);
      message.success(label + " updated");
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Row>
      <Col xs={8} md={6}>
        <Paragraph style={{ fontSize: 16 }}>{label + " :"}</Paragraph>
      </Col>
      <Col xs={16} md={18}>
        <Paragraph
          style={{ fontSize: 15 }}
          editable={{
            onChange: onChange,
            onEnd: onFinish,

            // onCancel: () => setEditableStr(txt),
          }}
        >
          {editableStr}
        </Paragraph>
      </Col>
    </Row>
  );
}
