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
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FileUpload from "components/FileUpload";
import subjectdetailservice from "services/tutorsubject.service";
import {
  containers,
  deleteBlobFiile,
  getLearnMatUrl,
} from "services/azureblob.service";
import { getResourceIcon } from "components/Resources";

const { Panel } = Collapse;

export default function LearnMatSectionTutor({ deleteSection, section }) {
  // for delete popup
  const [deleteconfirmvisible, setDeleteconfirmvisible] = useState(false);
  //   const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setDeleteconfirmvisible(true);
  };
  const [learnmat, setLearnmat] = useState(section.presource_details);

  const handleDelete = async (e) => {
    try {
      const id = parseInt(e.currentTarget.id);
      console.log(id);
      const mat = learnmat.find((l) => l.id === id);
      if (mat.type !== "link") {
        // delete in azure blob
        const deletedFile = await deleteBlobFiile(
          mat.filename,
          containers.learnmats
        );
        console.log(deletedFile);
      }
      // delete in db
      const delrecord = await subjectdetailservice.deleteResouce(id);
      console.log(delrecord);
      // update ui
      setLearnmat(learnmat.filter((l) => l.id !== id));
      message.success("deleted ");
    } catch (error) {
      message.error(error.message);
    }
  };

  const AddForm = () => {
    const [filetype, setFiletype] = useState("img");
    const [filename, setFilename] = useState("NA");

    const handleAdd = async (values) => {
      console.log(values);
      console.log(filename);

      if (values.type !== "link" && filename === "NA") {
        message.error("First select and upload a file");
        return;
      }

      try {
        let secid = section.id;
        // add to db
        const newres = await subjectdetailservice.addResouce({
          ...values,
          filename,
          secid,
        });

        // updateui
        setLearnmat([...learnmat, newres]);
        message.success("Leaning meatirial added succesfully");

        setFilename("");
      } catch (error) {
        message.error(error.message);
      }
    };

    return (
      <>
        <Form layout="vertical" onFinish={handleAdd}>
          <Form.Item
            on
            label="Resource type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please select type",
              },
            ]}
          >
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

          <Form.Item
            name="name"
            label="Resource Name"
            rules={[
              {
                required: true,
                message: "Please input name",
              },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          {filetype !== "link" ? (
            <FileUpload
              setFilename={setFilename}
              container={containers.learnmats}
              sectionid={4}
            />
          ) : (
            <>
              <Form.Item
                name="link"
                label="Resource URL"
                rules={[
                  {
                    required: true,
                    message: "Please input URL",
                  },
                ]}
              >
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
        <span>{section.name}</span>
        <Popconfirm
          visible={deleteconfirmvisible}
          title="Are you sure to delete this section?"
          onConfirm={() => {
            setDeleteconfirmvisible(false);
            deleteSection(section.id);
          }}
          onCancel={() => setDeleteconfirmvisible(false)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger onClick={showPopconfirm}>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
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

  const Resource = ({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(item.name);
    const [name, setName] = useState(item.name);

    const handleEdit = async () => {
      if (isEditing) {
        if (newName === "") {
          message.error("Name is empty");
          return;
        }
        try {
          // update db
          await subjectdetailservice.updateResouceName({
            id: item.id,
            name: newName,
          });
          setName(newName);
          setIsEditing(false);
          message.success("Name updated Successfully");
          return;
        } catch (error) {
          message.error(error.message);
        }
      }
      setIsEditing(true);
    };

    const getResourceLink = (type, filename, name) => {
      if (type === "link") {
        return filename;
      } else if (type === "vid") {
        return `/resource/${name}/${filename}`;
      } else {
        return getLearnMatUrl(filename);
      }
    };

    return (
      <List.Item>
        {!isEditing ? (
          <a
            href={getResourceLink(
              item.type,
              item.filename,
              `${section.name}/${item.name}`
            )}
            className="linkspan"
          >
            {getResourceIcon(item.type)} {name}
          </a>
        ) : (
          <>
            New name :
            <Input
              style={{ width: "60%" }}
              label="Enter new name"
              placeholder="Enter new name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </>
        )}

        <span>
          {/* edit */}
          <Button size="small" type="primary" id={item.id} onClick={handleEdit}>
            {!isEditing ? <EditOutlined /> : <CheckOutlined />}
          </Button>
          {isEditing && (
            <Button
              style={{ marginRight: 10 }}
              size="small"
              type="default"
              danger
              onClick={() => setIsEditing(false)}
            >
              <CloseOutlined />
            </Button>
          )}

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
          {/* <Button
            id={item.id}
            size="small"
            type="primary"
            disabled
            onClick={() => console.log("sdvsdv")}
          >
            <EyeOutlined />
          </Button> */}

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
    );
  };

  return (
    <List
      style={{ textAlign: "left", marginBottom: 20 }}
      header={headerCollapse}
      bordered
      dataSource={learnmat}
      renderItem={(item) => <Resource item={item} />}
    />
  );
}
