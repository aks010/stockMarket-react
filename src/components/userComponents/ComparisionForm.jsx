import React from "react";
import { Link } from "react-router-dom";
import { IPO_JSON_FIELD } from "../../globals/configs";
import API from "../../Api";
import { GetAuthHeaderToken } from "../../globals/configs";
import { RenderMessage } from "../../globals/helper";

class CompanyExchangeMap extends React.Component {
  state = {
    data: {
      type: "",
      exchangeName: "",
      sectorName: "",
      companyName: "",
    },
    exchangeList: [],
    sectorList: [],
    companyList: [],
    displayMessage: false,
    messageUI: null,
  };

  componentDidMount = () => {
    this.setState(this.props.data);
  };

  handleFormInput = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    const key = this.props.formId;
    console.log(key);
    this.props.addData(key, data);
    this.setState({ data });
  };
  handleTypeInput = async (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    const type = data[e.target.name];
    const key = this.props.formId;

    if (type == "sector") {
      const response = await API.get("/sectors/list/", {
        headers: {
          Authorization: GetAuthHeaderToken(),
        },
      });
      const sectorList = response.data.map((o) => {
        return o.sectorName;
      });
      sectorList.sort();
      this.setState({ sectorList });
    } else if (type == "company") {
      const response = await API.get("/stockExchange/list/", {
        headers: {
          Authorization: GetAuthHeaderToken(),
        },
      });
      const exchangeList = response.data.map((o) => {
        return o.exchangeName;
      });
      exchangeList.sort();
      this.setState({ exchangeList });
    }
    this.props.addData(key, data);
    this.setState({ data });
  };
  handleExchangeInput = async (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    const exchangeName = data[e.target.name];
    const key = this.props.formId;

    this.props.addData(key, data);
    this.setState({ data });

    const response = await API.get(`/stockExchange/list/${exchangeName}/`, {
      headers: {
        Authorization: GetAuthHeaderToken(),
      },
    });
    const companyList = response.data.map((o) => {
      return o.companyName;
    });
    companyList.sort();
    this.setState({ companyList });
  };

  handleResponse = (response) => {
    let messageUI = null;
    if (response.status == 201) {
      messageUI = RenderMessage(
        201,
        "Successfully Mapped!!",
        this.closeDisplayMessage
      );
    } else {
      messageUI = RenderMessage(
        response.status,
        response.data.message,
        this.closeDisplayMessage
      );
    }
    this.setState({ messageUI, displayMessage: true });
  };

  renderCompanyList = () => {
    return this.state.companyList.map((el) => {
      return <option>{el}</option>;
    });
  };
  renderExchangeList = () => {
    return this.state.exchangeList.map((el) => {
      return <option>{el}</option>;
    });
  };
  renderSectorList = () => {
    return this.state.sectorList.map((el) => {
      return <option>{el}</option>;
    });
  };

  handleRemove = () => {
    this.props.removeElement(this.props.formId);
  };

  render() {
    console.log(this.state);
    console.log(this.state.data.type != "");
    return (
      <div>
        <div class="input-group mb-3 container-fluid">
          <select
            class="form-select"
            onChange={this.handleTypeInput}
            aria-label="Default select example"
            name="type"
            value={this.state.data.type}
          >
            <option selected>Select Entity </option>
            <option value="sector">Sector</option>
            <option value="company">Company</option>
          </select>
          {this.state.data.type != "" && (
            <React.Fragment>
              {this.state.data.type == "sector" ? (
                <select
                  class="form-select"
                  name="sectorName"
                  value={this.state.data.sectorName}
                  aria-label="Default select example"
                  onChange={this.handleFormInput}
                >
                  <option selected disabled value="">
                    Open this Sector menu
                  </option>
                  {this.renderSectorList()}
                </select>
              ) : (
                <React.Fragment>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="exchangeName"
                    value={this.state.data.exchangeName}
                    onChange={this.handleExchangeInput}
                  >
                    <option selected value="">
                      Select Stock Exchange
                    </option>
                    {this.renderExchangeList()}
                  </select>
                  {(this.state.data.exchangeName != "") != 0 && (
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="companyName"
                      value={this.state.data.companyName}
                      onChange={this.handleFormInput}
                    >
                      <option selected disabled value="">
                        Select Company
                      </option>
                      {this.renderCompanyList()}
                    </select>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          <button
            class="btn btn-outline-danger"
            type="button"
            id="button-addon1"
            onClick={this.handleRemove}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default CompanyExchangeMap;
