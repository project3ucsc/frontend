import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import Login from "Pages/Login";
import Home from "Pages/Home";
import Dashboard from "Pages/Dashboard";
import { history, Role } from "Utils/common";
import auth from "Services/authentication.service";

import PrivateRoute from "Utils/PrivateRoute";
import PublicRoute from "Utils/PublicRoute";

function App() {
  const [currentUser, setCurrentUser] = useState();

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
        <Layout.Header className="header">
          <div className="logo" />

          {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Button type="primary" onClick={toggleCollapsed}>
                <MenuUnfoldOutlined />
              </Button>
            </Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>

            {currentUser && <Menu.Item key="3">logout</Menu.Item>}
          </Menu> */}

          <Button type="primary" onClick={logout}>
            <LogoutOutlined />
          </Button>
        </Layout.Header>

        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} currentUser={currentUser} />}
            />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/dashboard"
              roles={[Role.SCHOOLADMIN, Role.STUDENT, Role.PRINCIPAl]}
              component={Dashboard}
            />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
