import React from "react";
import { Link } from "react-router-dom";
import API from "../../Api";

class ListAllCompanies extends React.Component {
  state = {
    filter: {
      exchange: "",
      company: "",
    },
    prevFilter: {
      exchange: "",
      company: "",
    },
    companyList: [],
    exchangeList: [],
  };

  handleFilterInput = (e) => {
    const filter = this.state.filter;
    filter[e.target.name] = e.target.value;
    this.setState({ filter });
  };

  clearCompanyFilter = () => {
    const filter = this.state.filter;
    filter["company"] = "";
    this.setState({ filter });
  };

  clearExchangeFilter = () => {
    const filter = this.state.filter;
    filter["exchange"] = "";
    this.setState({ filter });
  };

  componentDidMount = async () => {
    const response = await API.get("company/list");
    console.log(response.data);
    const exchangeResponse = await API.get("/stockExchange/list");

    const exchangeList = exchangeResponse.data.map((o) => {
      return o.exchangeName;
    });
    this.setState({ companyList: response.data, exchangeList });
  };

  componentDidUpdate = async () => {
    const prevFilter = this.state.prevFilter;
    const filter = this.state.filter;
    console.log("INSIDE UPDATE CYCLE");
    console.log(prevFilter);
    console.log(filter);
    if (
      filter.company != prevFilter.company ||
      filter.exchange != prevFilter.exchange
    ) {
      console.log("WILL BE UPDATE");
      if (filter.company.length < 2) {
        const response = await API.get("company/list");
        const companyList = response.data;

        if (filter.exchange != "") {
          const filteredCompanyList = companyList.filter((o) => {
            for (let i = 0; i < o.compStockMap.length; i++) {
              if (
                o.compStockMap[i].stockExchange.exchangeName == filter.exchange
              )
                return true;
            }
            return false;
          });
          this.setState({
            prevFilter: { company: filter.company, exchange: filter.exchange },
            companyList: filteredCompanyList,
          });
        } else {
          this.setState({
            prevFilter: { company: filter.company, exchange: filter.exchange },
            companyList,
          });
        }
      } else {
        const response = await API.get(
          `company/list/pattern/${filter.company}`
        );
        const companyList = response.data;

        if (filter.exchange != "") {
          const filteredCompanyList = companyList.filter((o) => {
            for (let i = 0; i < o.compStockMap.length; i++) {
              if (
                o.compStockMap[i].stockExchange.exchangeName == filter.exchange
              )
                return true;
            }
            return false;
          });
          this.setState({
            prevFilter: { company: filter.company, exchange: filter.exchange },
            companyList: filteredCompanyList,
          });
        } else {
          this.setState({
            prevFilter: { company: filter.company, exchange: filter.exchange },
            companyList,
          });
        }
      }
    }
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
          <div class="col col-sm-2.5 m-3">{company.companyName}</div>
          <div class="col col-sm-2.5 m-3">{exchanges}</div>
          <div class="col col-sm-3 m-3">{company.companyBrief}</div>
          <div class="col col-sm-2 m-3">{company.sector.sectorName}</div>
        </div>
      );
    });
  };

  renderExchangeList = () => {
    return this.state.exchangeList.map((el) => {
      return <option>{el}</option>;
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            List of Companies
          </h4>
        </div>

        <div class="container mt-5">
          <div class="row mt-5 p-3 ">
            <div class="col col-sm-2.5 ms-3 me-3">COMPANY NAME</div>
            <div class="col col-sm-2.5 ms-3 me-3">EXCHANGES</div>
            <div class="col col-sm-3 ms-3 me-3">BRIEF</div>
            <div class="col col-sm-2 ms-3 me-3">SECTOR</div>
          </div>
          <div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Company
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Company Name"
                aria-label="queryCompany"
                aria-describedby="inputGroup-sizing-sm"
                name="company"
                value={this.state.filter.company}
                onChange={this.handleFilterInput}
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={this.clearCompanyFilter}
              >
                X
              </button>
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Stock Exchange
              </span>

              <select
                class="form-select"
                id="exchange"
                required
                name={"exchange"}
                onChange={this.handleFilterInput}
                value={this.state.filter.exchange}
              >
                <option selected disabled value="">
                  Choose...
                </option>
                {this.renderExchangeList()}
              </select>
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={this.clearExchangeFilter}
              >
                X
              </button>
            </div>
          </div>
        </div>

        <div class="mt-3 .bg-light">{this.renderList()}</div>
      </div>
    );
  }
}

export default ListAllCompanies;
