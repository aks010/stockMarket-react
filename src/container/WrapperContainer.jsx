import React from "react";
import Navbar from "./Navbar";

import { Redirect } from "react-router";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminWrapperContainer from "./AdminWrapperContainer";
import UserWrapperContainer from "./UserWrapperContainer";
import LoginComponent from "../components/LoginComponent";
import { SetUserRole, GetUserRole, ADMIN, USER } from "../globals/configs";

class WrapperContainer extends React.Component {
  state = {
    userRole: null,
    user: null,
  };

  componentDidMount() {
    // fetch userRole
    const userRole = "user";
    // set userRole
    SetUserRole(userRole);
    this.setState({ userRole: GetUserRole() });
  }

  handleLogout = () => {
    SetUserRole(null);
    this.setState({ userRole: GetUserRole() });
  };

  render() {
    console.log(this.state.userRole);
    console.log(this.state.userRole == USER || this.state.userRole == ADMIN);
    return (
      <div>
        <Navbar userRole={this.state.userRole} />
        <div className="container">
          <Switch>
            <Route path="/admin">
              {this.state.userRole == ADMIN ? (
                <AdminWrapperContainer handleLogout={this.handleLogout} />
              ) : (
                <div>Unauthorized</div>
              )}
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/user">
              {this.state.userRole == USER || this.state.userRole == ADMIN ? (
                <UserWrapperContainer handleLogout={this.handleLogout} />
              ) : (
                //todo
                <div>Redirect to login</div>
              )}
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WrapperContainer;
