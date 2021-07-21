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
      exchangeList.forEach((o) => (exchanges += o));

      return (
        <div class="row mt-3 p-3 bg-light">
          <div class=" col col-sm-3 m-3">{company.companyName}</div>
          <div class="col col-sm-3 m-3">{exchanges}</div>
          <div class="col col-sm-4 m-3">{company.companyBrief}</div>
          <Link
            to={`/admin/company/update/${company.companyName}`}
            class="col col-sm m-3 btn btn-outline-success btn-sm"
          >
            Edit
          </Link>
        </div>
      );
    });
    // console.log("Print");
    // console.log(ui);

    return <div>Hello</div>;
  };

  render() {
    console.log(this.renderList());

    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            List All Company
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
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm ms-3 md-3"
            >
              Back
            </button>
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

        <div class="mt-3 .bg-light">
          {this.renderList()}
          {/* <div>
            <div class="row mt-3 p-3 bg-light">
              <div class=" col col-sm-3 m-3">Company Name</div>
              <div class="col col-sm-3 m-3">Stock Exchange List </div>
              <div class="col col-sm-4 m-3">Brief</div>
              <button class="col col-sm m-3 btn btn-outline-success btn-sm">
                Edit
              </button>
            </div>
            <div class="row mt-3 p-3 bg-light">
              <div class=" col col-sm-3 m-3">Company Name</div>
              <div class="col col-sm-3 m-3">Stock Exchange List </div>
              <div class="col col-sm-4 m-3">Brief</div>
              <button class="col col-sm m-3 btn btn-outline-success btn-sm">
                Edit
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ListAllCompanies;
