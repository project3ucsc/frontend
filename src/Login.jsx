import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox , Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { setSessionData,removeSessionData } from './utils/common'

import './login.scss';
import logo from './img/logo.png'



const Login = ({history}) => {
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState('')


  
  const onFinish = ({username,password}) => {
    setLoading(true)

    axios.post( 'http://localhost:3001/login' ,{ username, password }).then(res => {
      setLoading(false)
      setSessionData(res.data)
      history.push('/dashboard')
    }).catch(err => {
      setLoading(false)

      if (err.response.status === 500 )
        seterror('Usename or password incorrect')
      else if ( err.response.status === 401 )
        seterror('Authentication Failed')
      else
        seterror('Unknown error occured')

      // console.log(err.response.data);
    })

    
  };

  return (
        
    <div className="login-container" >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <img  src={logo} alt='logo' />

        {(error !== '') &&
           <Alert
           message="Error Text"
           description={error}
           type="error"
           closable
           onClose={() => seterror('')}
         />
        }

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button loading={loading}  type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a>register now!</a>
        </Form.Item>
      </Form>
    </div>
   
    
  );
};

export default Login;