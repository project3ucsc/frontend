import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Checkbox,
  Form,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import ContentLayout from "components/ContentLayout";
import "./Sectionmanage.scss";
import classroomservice from "services/classroom.service";

const { Title } = Typography;

const grades = {
  primary: [
    { id: "G1", name: "1" },
    { id: "G2", name: "2" },
    { id: "G3", name: "3" },
    { id: "G4", name: "4" },
    { id: "G5", name: "5" },
  ],
  ol: [
    { id: "G6", name: "6" },
    { id: "G7", name: "7" },
    { id: "G8", name: "8" },
    { id: "G9", name: "9" },
    { id: "G10", name: "10" },
    { id: "G11", name: "11" },
  ],
  al: [
    { id: "G12MATH", name: "12 Maths" },
    { id: "G12BIO", name: "12 Bio" },
    { id: "G12COM", name: "12 Com" },
    { id: "G12ART", name: "12 Art" },
    { id: "G12TECH", name: "12 Tech" },
    { id: "G13MATH", name: "13 Maths" },
    { id: "G13BIO", name: "13 Bio" },
    { id: "G13COM", name: "13 Com" },
    { id: "G13ART", name: "13 Art" },
    { id: "G13TECH", name: "13 Tech" },
  ],
};

function GradeCard({ grades, title }) {
  return (
    <Row>
      <Col xs={24} xl={24}>
        <Card title={title} style={{ marginTop: 10 }}>
          <div className="card-flex-wrap">
            {grades.map((grade) => (
              <Form.Item
                key={grade.id}
                name={grade.id}
                label={"Grade " + grade.name}
                rules={[
                  {
                    required: true,
                    message: "Enter class count!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default function SectionManagePage() {
  const { Content } = Layout;
  const [isPrimary, setIsPrimary] = useState(true);
  const [isOL, setIsOL] = useState(true);
  const [isAL, setIsAL] = useState(true);

  const [loading, setLoading] = useState(false);

  function onFinish(val) {
    setLoading(true);
    classroomservice
      .CreateConfigureClasses(val)
      .then((data) => {
        setLoading(false);
        console.log(data);
        message.success("done");
      })
      .catch((e) => {
        setLoading(false);

        message.error(e.message);
      });
  }

  return (
    <ContentLayout
      title="Section Configure"
      paths={["SchoolAdmin", "Dashboard"]}
    >
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="container-back" style={{ width: "auto", padding: 50 }}>
          <Form onFinish={onFinish}>
            <Title level={4}>Enter number of classes in each grade</Title>
            <Title type="secondary" level={5}>
              If your school doesn't have particular sections uncheck them
            </Title>
            <Row>
              <Col xs={24} sm={8}>
                <Checkbox
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                >
                  Primary Section
                </Checkbox>
              </Col>
              <Col xs={24} sm={8}>
                <Checkbox
                  checked={isOL}
                  onChange={(e) => setIsOL(e.target.checked)}
                >
                  6-11 Section
                </Checkbox>
              </Col>
              <Col xs={24} sm={8}>
                <Checkbox
                  checked={isAL}
                  onChange={(e) => setIsAL(e.target.checked)}
                >
                  Al Section
                </Checkbox>
              </Col>
            </Row>
            {isPrimary && (
              <GradeCard title="Primary Section" grades={grades.primary} />
            )}
            {isOL && <GradeCard title="6-11 Section" grades={grades.ol} />}
            {isAL && <GradeCard title="Al Section" grades={grades.al} />}
            <Form.Item>
              <Button
                loading={loading}
                style={{ marginTop: 20, float: "right" }}
                type="primary"
                htmlType="submit"
              >
                Create Classes
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </ContentLayout>
  );
}
