import React from "react";
import { Layout, Row, Col, Card } from "antd";
import ContentLayout from "components/ContentLayout";
import { Link } from "react-router-dom"; 

import { Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


export default function Dashboard() {
  const classes = ["Maths", "Chemistry", "Physics", "English", "IT"];
  const { Content } = Layout;

  const { Meta } = Card;
  
  return (
    <ContentLayout title="Dashboard" paths={["Home", "Dashboard"]}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row>
          
            <div className="card-wrapper">
              {classes.map((classt, index) => {
                return (
                    
                  <Link to="/classdetails">
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={classt}
                        description="Grade Day Time"
                      />
                      
                    </Card>
                  </Link>
                

                );
              })}
            </div>
          
          
        </Row>
      </Content>
    </ContentLayout>
  );
}
