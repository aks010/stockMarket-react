import React from "react";
import { Link } from "react-router-dom";
import API from "../../../Api";
import UpdateCompany from "./UpdateCompany";

class ListAllCompanies extends React.Component {
  state = {
    companyList: [],
  };

  componentDidMount = async () => {
    const response = await API.get("company/list");
    console.log(response.data);
    this.setState({ companyList: response.data });
  };

  renderList = () => {
    let ui = [];
    return this.state.companyList.map((company) => {
      let exchangeList = [];
      company.compStockMap.forEach((o) =>
        exchangeList.push(o.stockExchange.exchangeName)
      );

      let exchanges = "";
      exchangeList.forEach((o) => (exchanges += o + ", "));

      return (
        <div class="row mt-3 p-3 bg-light">
          <div class=" col col-sm-3 m-3">{company.companyName}</div>
          <div class="col col-sm-3 m-3">{exchanges}</div>
          <div class="col col-sm-4 m-3">{company.companyBrief}</div>
          <Link
            to={`/admin/company/update/${company.companyName}`}
            class="col col-sm m-3 btn btn-outline-success btn-sm align-self-center"
          >
            Edit
          </Link>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            List of Companies
          </h4>
          <div class="d-flex">
            <Link
              type="button"
              to="/admin/company/new"
              class="btn btn-outline-success btn-sm ms-3 md-3 "
              style={{ display: "flex", alignItems: "center" }}
            >
              Add New Company
            </Link>
          </div>
        </div>

        <div class="container mt-5 d-flex justify-content-between">
          <div>COMPANIES</div>
          <div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Filter
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Company Name"
                aria-label="queryCompany"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
          </div>
        </div>

        <div class="mt-3 .bg-light">{this.renderList()}</div>
      </div>
    );
  }
}

export default ListAllCompanies;
