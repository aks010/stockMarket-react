import React from "react";
import AddNewCompany from "./AddNewCompany";
import ListCompanies from "./ListCompanies";
import UpdateCompany from "./UpdateCompany";
import { Switch, Route } from "react-router-dom";

class ManageCompany extends React.Component {
  render() {
    console.log("HELLP");
    console.log(this.props);
    let currPath = "/admin/company";
    return (
      <div>
        <Switch>
          <Route path={`${currPath}/new`}>
            <AddNewCompany />
          </Route>
          <Route path={`${currPath}/update/:companyName`}>
            <UpdateCompany />
          </Route>
          <Route path={`${currPath}/list`}>
            <ListCompanies />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ManageCompany;
