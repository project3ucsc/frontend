import React, { useState } from "react";

import { Form, Input, Button, Checkbox, message,Row,Col } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import auth from "services/authentication.service";
import "./LandingP.scss";
import logo from "img/logo.png";
import img1 from "../img/ab2.svg";
import { LinkedinOutlined, InstagramOutlined, FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";


const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await auth.login(email, password);
      console.log(data);
      history.push("/dashboard");
    } catch (err) {
      setLoading(false);
      message.error(err.message);
    }
  };

  return (
    <div className="landing-container">
      <Col span={24}>
            <Row className="header">
                {/*<Col span={8}>col-8</Col>
                <Col span={8} offset={8}>
                    col-8
                </Col>*/}
                <Col span={9}></Col>
                <Col span={3}>
                <Button type="link" style={{color:"white",}} block>
                    Home
                </Button>
                </Col>
                <Col span={3}>
                <Button type="link" style={{color:"white",}} block>
                    About Us
                </Button>
                </Col>
                <Col span={3}>
                <Button type="link" style={{color:"white",}} block>
                    Instructions
                </Button>
                </Col>
                <Col span={3} >
                <Button ghost style={{color:"white", width:100, }} block>
                    Login
                </Button>
                </Col>
                <Col span={3} gutter={10}>
                <Button ghost style={{color:"white",width:100,}} block>
                    Sign Up
                </Button>
                </Col>
                
                
                
            </Row>
            <Row className="middle">
                {/*<Col span={6} offset={6}>
                    col-6 col-offset-6
                </Col>
                <Col span={6} offset={6}>
                    col-6 col-offset-6
                </Col>*/}
                <Col span={12}>
                    <h1 className="MidText">
                        Let's Get Started ....
                    </h1>
                    
                        <p>If you want to be a part of this system</p>
                        <p>you must have a user account.</p>
                        <p>If you are new to KnowledgeHub,</p>
                        <Button type="primary" shape="round" className="btn" >
                            Click on Me
                        </Button>
                        
        
                    
                </Col>
                <Col span={12}>
                    <img style={{ width: 600, height:500 }} src={img1} alt="img1" />
                </Col>
            </Row>
            <Row className="footer">
                <Col span={8}><h2>KnowledgeHub</h2></Col>
                <Col><h2>KnowledgeHub</h2></Col>
            </Row>

      </Col>
    </div>
  );
};

export default Login;
