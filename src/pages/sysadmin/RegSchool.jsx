import React from "react";
import { Layout, Row, Col, Table } from "antd";
import ContentLayout from "components/ContentLayout";

export default function RegSchool() {
  const { Content } = Layout;
  const columns = [
    {
      title: "Principle Name",
      dataIndex: "name",
      filters: [
        {
          text: "G.T.S.Sathindra",
          value: "G.T.S.Sathindra",
        },
        {
          text: "P.R.S.T.Sandeepani",
          value: "P.R.S.T.Sandeepani",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },

    {
      title: "School Admin Name",
      dataIndex: "s_name",
      filters: [
        {
          text: "W.E.R.Perera",
          value: "W.E.R.Perera",
        },
        {
          text: "P.R.Saman",
          value: "P.R.Saman",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.s_name.indexOf(value) === 0,
      sorter: (a, b) => a.s_name.length - b.s_name.length,
      sortDirections: ["descend"],
    },

    {
      title: "Grade",
      dataIndex: "grade",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.grade - b.grade,
    },
    {
      title: "School Address",
      dataIndex: "address",
      filters: [
        {
          text: "Prince of Wales College, Moratuwa",
          value: "Prince of Wales College, Moratuwa",
        },
        {
          text: "St.Thomas College, Mnt Lavinia",
          value: "St.Thomas College, Mnt Lavinia",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  const data = [
    {
      key: "1",
      name: "G.T.S.Sathindra",
      s_name: "W.E.N Anusara",
      grade: 2,
      address: "Princess of Wales College, Moratuwa",
    },
    {
      key: "2",
      name: "P.R.S.T.Sandeepani",
      s_name: "W.E.R.Perera",
      grade: 1,
      address: "St.Pauls College,Milagiriya",
    },
    {
      key: "3",
      name: "Lakshan Sandaruwan",
      s_name: "P.R Saman",
      grade: 3,
      address: "St.Thomas College, Mnt Lavinia",
    },
    {
      key: "4",
      name: "Sewwandi Harischandra",
      s_name: "W.E.R.Parackrama",
      grade: 2,
      address: "Royal College,Kurunagala",
    },

    {
      key: "5",
      name: "G.T Jayantha",
      s_name: "W.E.R.Sanjaya",
      grade: 2,
      address: "Prince of Wales College, Moratuwa",
    },
    {
      key: "6",
      name: "Lakmal Sandaruwan",
      s_name: "W.E. Kamal",
      grade: 3,
      address: "Ananda College, Maradana",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <ContentLayout
      title="School Managment"
      paths={["Home", "School Managment"]}
    >
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          <Col xs={24} xl={24}>
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </Col>
        </Row>
      </Content>
    </ContentLayout>
  );
}
