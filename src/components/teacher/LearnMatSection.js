import "./LearnMatSection.scss";
import React, { useState } from "react";
import { Button, List, Collapse, Row, Col, Divider } from "antd";
import {
  PlusOutlined,
  FilePdfTwoTone,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

export default function LearnMatSection({ data }) {
  const [learnmat, setLearnmat] = useState(data);

  const handleAdd = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
  };
  const handleEdit = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
  };
  const handleDelete = (e) => {
    const id = parseInt(e.currentTarget.id);
    console.log(id);
    setLearnmat(learnmat.filter((l) => l.id !== id));
  };

  const headerCollapse = (
    <Col>
      <Row className="section-header">
        <span>Mechnics</span>
        <Button danger>
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
          <p>dvfasdva</p>
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
