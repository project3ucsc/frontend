import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BackLayout from "components/BackLayout";
import {
  Row,
  Col,
  Card,
  Typography,
  DatePicker,
  Button,
  message,
  Spin,
} from "antd";
import { enum_BtnState, getClassName } from "utils/common";
import moment from "moment";
import StateIndicator from "components/StateIndicator";
import AttachUpload from "components/AttachUpload";
import assmntservice from "services/assmnt.service";
import { containers } from "services/azureblob.service";

const { Paragraph } = Typography;

export default function AssessmentPage() {
  const { assid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duedate, setDuedate] = useState("2021-09-27 22:54:55");

  const indicator = useRef();

  useEffect(() => {
    setLoading(true);
    assmntservice
      .getAssmntByID(assid)
      .then((data) => {
        setData(data);
        setLoading(false);

        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [assid]);

  function onDueDateChange(value, dateString) {
    setDuedate(value);
    indicator.current.setState(enum_BtnState.dirty);
  }

  async function onDueDateSet() {
    try {
      await assmntservice.updateAssmnt(assid, "duedate", duedate);
      indicator.current.setState(enum_BtnState.success);
      message.success("Duedate Set succecessfully");
    } catch (error) {
      indicator.current.setState(enum_BtnState.err);
      message.error(error.message);
    }
  }

  return (
    <BackLayout title="Manage Assesment" subtitle={getClassName()}>
      <Row>
        <Col xs={24}>
          {!loading ? (
            <Card title="" className="lessoncard">
              <EditableTxt
                assid={assid}
                property="title"
                label="Title"
                txt={data.title}
              />
              <EditableTxt
                assid={assid}
                property="discription"
                label="Discription"
                txt={data.discription}
              />

              <Row>
                <Col xs={8} md={6}>
                  <Paragraph style={{ fontSize: 16 }}>Due Date :</Paragraph>
                </Col>
                <Col xs={16} md={18}>
                  <DatePicker
                    defaultValue={moment(data.duedate)}
                    showTime
                    size="small"
                    onChange={onDueDateChange}
                  />
                  <Button size="small" type="primary" onClick={onDueDateSet}>
                    Set
                  </Button>
                  <StateIndicator
                    ref={indicator}
                    initstate={enum_BtnState.success}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={8} md={6}>
                  <Paragraph style={{ fontSize: 16 }}>Attachments :</Paragraph>
                </Col>
                <Col xs={16} md={18}>
                  <AttachUpload
                    dbid={assid}
                    container={containers.attachments}
                    file={
                      data.filename !== "NA"
                        ? { bool: true, filename: data.filename }
                        : { bool: false, filename: "" }
                    }
                  />
                </Col>
              </Row>
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
          style={{ whiteSpace: "pre-wrap", fontSize: 15 }}
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
