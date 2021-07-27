import React from "react";
import { Link } from "react-router-dom";
import { IPO_JSON_FIELD } from "../../../globals/configs";
import API from "../../../Api";
import { RenderMessage } from "../../../globals/helper";

class IPOExchange extends React.Component {
  state = {
    addExchange: "",
    exchangeList: [],
    ipoExchangeList: [],
    displayMessage: false,
    messageUI: null,
    company: "",
  };

  closeDisplayMessage = () => {
    this.setState({ displayMessage: false });
  };

  openDisplayMessage = () => {
    this.setState({ displayMessage: true });
  };

  componentDidMount = async () => {
    let pathSplit = window.location.pathname.split("/");
    const companyName = pathSplit[pathSplit.length - 1];
    console.log(companyName);

    const exchangeResponse = await API.get("/stockExchange/list");
    const exchangeList = exchangeResponse.data.map((o) => {
      return o.exchangeName;
    });
    exchangeList.sort();

    const response = await API.get(`/ipo/${companyName}`);
    console.log(response.data);
    // const data = {};
    // Object.keys(this.state.data).forEach((o) => (data[o] = response.data[o]));

    this.setState({
      exchangeList,
      company: companyName,
      ipoExchangeList: response.data.stockExchanges,
    });
  };

  handleResponse = async (response) => {
    let messageUI = null;
    if (response.status == 201) {
      messageUI = RenderMessage(
        201,
        "Successfully Mapped!!",
        this.closeDisplayMessage
      );
      // const response = await API.get(`/ipo/${this.state.company}`);
      // this.setState({ ipoExchangeList: response.data.stockExchanges });
    } else {
      messageUI = RenderMessage(
        response.status,
        response.data.message,
        this.closeDisplayMessage
      );
    }
    this.setState({ messageUI, displayMessage: true });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.addExchange == "") {
      this.setState({
        messageUI: RenderMessage(
          400,
          "Cannot be empty!",
          this.closeDisplayMessage
        ),
        displayMessage: true,
      });
    } else {
      let response;

      try {
        response = await API.get(
          `/ipo/map/${this.state.company}/${this.state.addExchange}`
        );

        this.handleResponse(response);
        this.setState({ ipoExchangeList: response.data.stockExchanges });
      } catch (e) {
        console.log("Error");
        console.log(e.response);
        if (e.response) this.handleResponse(e.response);
        else
          this.handleResponse({
            status: null,
            data: { message: "Unable to Connect to Server" },
          });
      }
    }
  };

  handleExchangeInput = (e) => {
    this.setState({ addExchange: e.target.value });
  };

  renderExchangeList = () => {
    return this.state.exchangeList.map((el) => {
      return <option>{el}</option>;
    });
  };

  renderIPOExchangeList = () => {
    return this.state.ipoExchangeList.map((el) => {
      return (
        <div class="container-fluid bg-light col p-1 pe-3 ps-3">
          {el.exchangeName}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            IPOs Stock Exchange List: {this.state.company}
          </h4>
          <div class="d-flex">
            <select
              class="form-select"
              id="exchange"
              required
              name={"addExchange"}
              onChange={this.handleExchangeInput}
              value={this.state.addExchange}
            >
              <option selected disabled value="">
                Select Exchange To Add
              </option>
              {this.renderExchangeList()}
            </select>
            <button
              class="btn btn-primary col-sm-3"
              type="button"
              id="button-addon1"
              onClick={this.handleFormSubmit}
            >
              Add
            </button>
            <Link
              to="/admin/ipo/list"
              type="button"
              class="btn btn-outline-secondary btn-sm ms-3 md-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              Back
            </Link>
          </div>
        </div>

        <div class="container mt-5">
          {this.state.displayMessage && this.state.messageUI}
          {this.renderIPOExchangeList()}
        </div>
      </div>
    );
  }
}

export default IPOExchange;
