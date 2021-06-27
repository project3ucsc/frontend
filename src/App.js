import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Button } from "antd";

import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { history } from "./utils/common";
import auth from "./services/authentication.service";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.currentuser.subscribe((v) => {
      setCurrentUser(v);
    });
  }, []);

  const logout = () => {
    auth.logout();
    history.push("/login");
  };

  return (
    <div className="App">
      {currentUser && <Button onClick={logout}>logout</Button>}

      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} currentUser={currentUser} />}
          />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
