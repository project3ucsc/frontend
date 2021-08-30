import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import "./index.scss";
import { Layout, Button, Avatar, Drawer, Affix, Badge } from "antd";
import {
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import MainUserRouter from "components/routers";
import { history } from "utils/common";
import auth from "services/authentication.service";

import SideBar from "components/SideBars";
import PublicRoute from "utils/PublicRoute";
import ForgotPass from "pages/ForgotPass";
import NotificationComponent from "components/NotificationComponent";

function App() {
  const [currentUser, setCurrentUser] = useState();

  const [notifivisible, setNotifivisible] = useState(false);
  const [notifiCount, setNotifiCount] = useState(4);
  const onNotiDrawerClose = () => {
    setNotifivisible(false);
  };

  const onNotiDrawerShow = () => {
    setNotifivisible(!notifivisible);
  };

  useEffect(() => {
    auth.currentuser.subscribe((v) => {
      setCurrentUser(v);
    });
    // return function cleanup() {
    //   auth.currentuser.unsubscribe();
    // };
  }, []);

  const logout = () => {
    auth.logout();
    history.push("/login");
  };

  return (
    <div className="App">
      <Layout className="MainLayout">
        <Affix>
          <Layout.Header className="header">
            <div className="logo" onClick={() => history.push("/dashboard")}>
              KH
            </div>

            {currentUser ? (
              <>
                <Button type="default" className="logoutbtn" onClick={logout}>
                  <LogoutOutlined />
                </Button>
                <span className="logtext">
                  <Avatar size="small" icon={<UserOutlined />} />
                  {currentUser.username}
                </span>
                <span className="notification-bell" onClick={onNotiDrawerShow}>
                  <Badge size="small" count={notifiCount}>
                    <BellOutlined className="icon" />
                  </Badge>
                </span>
              </>
            ) : (
              <>
                <Button
                  type="default"
                  className="logoutbtn"
                  onClick={() => history.push("/login")}
                >
                  <LoginOutlined />
                </Button>{" "}
                <span className="logtext"> You are not logged in</span>
              </>
            )}
          </Layout.Header>
        </Affix>
        <Layout>
          <Router history={history}>
            <Affix offsetTop={64}>
              <SideBar />
            </Affix>

            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} />} />

              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute
                exact
                path="/forgot-password"
                component={ForgotPass}
              />
              <PublicRoute exact path="/register" component={Register} />
              <MainUserRouter />
            </Switch>
          </Router>
        </Layout>

        <Drawer
          width={350}
          style={{ marginTop: 64 }}
          className="noti-drawer"
          title="Notifications"
          placement="right"
          closable={true}
          onClose={onNotiDrawerClose}
          visible={notifivisible}
        >
          <NotificationComponent setNotifiCount={setNotifiCount} />
        </Drawer>
      </Layout>
    </div>
  );
}

export default App;
