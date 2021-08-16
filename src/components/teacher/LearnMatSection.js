import "./LearnMatSection.scss";
import React, { useState } from "react";
import {
  Button,
  List,
  Collapse,
  Row,
  Col,
  Divider,
  Form,
  Radio,
  Input,
  message,
} from "antd";
import {
  PlusOutlined,
  FilePdfTwoTone,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FileUpload from "components/FileUpload";

const { Panel } = Collapse;

export default function LearnMatSection({ sectionid, deleteSection, data }) {
  const [learnmat, setLearnmat] = useState(data.data);

  const handleEdit = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
  };
  const handleDelete = (e) => {
    const id = parseInt(e.currentTarget.id);
    console.log(id);
    setLearnmat(learnmat.filter((l) => l.id !== id));
  };

  const AddForm = () => {
    const [filetype, setFiletype] = useState("img");
    const [filename, setFilename] = useState("");

    const handleAdd = (values) => {
      console.log(values);
      console.log(filename);
      if (filename === "") {
        message.error("First select and upload a file");
        return;
      }
      console.log("filename");
    };

    return (
      <>
        <Form layout="vertical" onFinish={handleAdd}>
          <Form.Item on label="Resource type" name="type">
            <Radio.Group
              onChange={(e) => setFiletype(e.target.value)}
              value={filetype}
            >
              <Radio.Button value="link">Link</Radio.Button>
              <Radio.Button value="img">Image</Radio.Button>
              <Radio.Button value="doc">Document</Radio.Button>
              <Radio.Button value="vid">Video</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="name" label="Resource Name">
            <Input placeholder="Enter name" />
          </Form.Item>

          {filetype !== "link" ? (
            <FileUpload setFilename={setFilename} sectionid={4} />
          ) : (
            <>
              <Form.Item name="link" label="Resource URL">
                <Input placeholder="Enter url" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
  const headerCollapse = (
    <Col>
      <Row className="section-header">
        <span>{data.title}</span>
        <Button danger onClick={() => deleteSection(sectionid)}>
          Remove
          <DeleteOutlined />
        </Button>
      </Row>
      <Divider />
      <Collapse expandIconPosition="right">
        <Panel
          header={
            <>
              <PlusOutlined style={{ marginRight: 8 }} />
              Add new resource
            </>
          }
          key="1"
        >
          <AddForm />
        </Panel>
      </Collapse>
    </Col>
  );

  return (
    <List
      style={{ textAlign: "left", marginBottom: 20 }}
      header={headerCollapse}
      bordered
      dataSource={learnmat}
      renderItem={(item) => (
        <List.Item>
          <a href={item.link} className="linkspan">
            <FilePdfTwoTone twoToneColor="#cf1322" /> {item.name}
          </a>
          <span>
            {/* edit */}
            <Button
              size="small"
              type="primary"
              id={item.id}
              onClick={handleEdit}
            >
              <EditOutlined />
            </Button>
            {/* hide */}
            <Button
              id={item.id}
              size="small"
              type="default"
              onClick={() => console.log("sdvsdv")}
            >
              <EyeInvisibleOutlined />
            </Button>
            {/* show */}
            <Button
              id={item.id}
              size="small"
              type="primary"
              disabled
              onClick={() => console.log("sdvsdv")}
            >
              <EyeOutlined />
            </Button>

            {/* delete */}
            <Button
              id={item.id}
              size="small"
              type="primary"
              danger
              onClick={handleDelete}
            >
              <DeleteOutlined />
            </Button>
          </span>
        </List.Item>
      )}
    />
  );
}
