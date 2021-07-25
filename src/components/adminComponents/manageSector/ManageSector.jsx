import React from "react";
import AddNewSector from "./AddNewSector";
import ListSectors from "./ListSectors";
import UpdateSector from "./UpdateSector";
import { Switch, Route } from "react-router-dom";

class ManageCompany extends React.Component {
  render() {
    console.log("HELLP");
    console.log(this.props);
    let currPath = "/admin/sector";
    return (
      <div>
        <Switch>
          <Route path={`${currPath}/new`}>
            <AddNewSector />
          </Route>
          {/* <Route path={`${currPath}/map`}>
            <CompanyExchangeMap />
          </Route> */}
          <Route path={`${currPath}/update/:exchangeName`}>
            <UpdateSector />
          </Route>
          <Route path={`${currPath}/list`}>
            <ListSectors />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ManageCompany;
