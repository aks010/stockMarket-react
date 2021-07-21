import React from "react";
import Navbar from "./Navbar";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ImportData from "../components/adminComponents/ImportData";
import ManageCompany from "../components/adminComponents/manageCompany/ManageCompany";
import ManageExchange from "../components/adminComponents/ManageExchange";
import UpdateIPODetails from "../components/adminComponents/UpdateIPODetails";

class AdminWrapperContainer extends React.Component {
  state = {
    role: null,
    user: null,
  };

  componentDidMount() {
    // fetch role
  }

  render() {
    return (
      <div class="mt-5">
        <Switch>
          <Route path={`/admin/importdata`}>
            <ImportData />
          </Route>
          <Route path={`/admin/company`}>
            <ManageCompany />
          </Route>
          <Route path={`/admin/exchange`}>
            <ManageExchange />
          </Route>
          <Route path={`/admin/ipo/update`}>
            <UpdateIPODetails />
          </Route>
          <Router path="/user">{/* <UserWrapperContainer /> */}</Router>
        </Switch>
      </div>
    );
  }
}

export default AdminWrapperContainer;
