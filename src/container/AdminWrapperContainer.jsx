import React from "react";
import Navbar from "./Navbar";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ImportData from "../components/adminComponents/ImportData";
import ManageCompany from "../components/adminComponents/manageCompany/ManageCompany";
import ManageExchange from "../components/adminComponents/manageExchange/ManageExchange";
import ManageIPO from "../components/adminComponents/manageIPO/ManageIPO";

import ManageSector from "../components/adminComponents/manageSector/ManageSector";

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
          <Route path={`/admin/ipo`}>
            <ManageIPO />
          </Route>
          <Route path={`/admin/sector`}>
            <ManageSector />
          </Route>
          <Route path={`/admin`}>
            <ImportData />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default AdminWrapperContainer;
