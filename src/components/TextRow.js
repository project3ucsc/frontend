import { Row, Col, Typography } from "antd";

const { Paragraph } = Typography;

export function TextRow({ labelspan, children, label }) {
  return (
    <Row>
      <Col xs={labelspan[0]} md={labelspan[1]}>
        <Paragraph style={{ fontSize: 16 }}>{label + " :"}</Paragraph>
      </Col>
      <Col xs={24 - labelspan[0]} md={24 - labelspan[1]}>
        <Paragraph style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>
          {children}
        </Paragraph>
      </Col>
    </Row>
  );
}
