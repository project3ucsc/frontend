import { Row, Col, Typography } from "antd";

const { Paragraph } = Typography;

export function TextRow({ children, label }) {
  return (
    <Row>
      <Col xs={8} md={6}>
        <Paragraph style={{ fontSize: 16 }}>{label + " :"}</Paragraph>
      </Col>
      <Col xs={16} md={18}>
        <Paragraph style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>
          {children}
        </Paragraph>
      </Col>
    </Row>
  );
}
