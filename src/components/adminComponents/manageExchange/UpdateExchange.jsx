import React from "react";

import { EXCHANGE_JSON_FIELD } from "../../../globals/configs";

import { Link } from "react-router-dom";
import API from "../../../Api";
import { RenderMessage } from "../../../globals/helper";

class UpdateCompany extends React.Component {
  state = {
    data: {
      exchangeName: "",
      contactAddress: "",
      remarks: "",
      brief: "",
    },
    currExchange: "",
    displayMessage: false,
    messageUI: null,
  };

  clearForm = () => {
    this.setState({
      data: {
        exchangeName: "",
        contactAddress: "",
        remarks: "",
        brief: "",
      },
      displayMessage: false,
      messageUI: null,
    });
  };

  closeDisplayMessage = () => {
    this.setState({ displayMessage: false });
  };

  openDisplayMessage = () => {
    this.setState({ displayMessage: true });
  };

  componentDidMount = async () => {
    let pathSplit = window.location.pathname.split("/");
    const currExchange = pathSplit[pathSplit.length - 1];
    console.log(currExchange);

    const response = await API.get(`/stockExchange/${currExchange}`);
    console.log(response.data);
    const data = {};
    Object.keys(this.state.data).forEach((o) => (data[o] = response.data[o]));
    console.log(data);

    this.setState({ data, currExchange });
  };

  handleFormInput = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  handleResponse = (response) => {
    if (response.status == 201 || response.status == 200) {
      const messageUI = RenderMessage(
        201,
        "Successfully Updated Company!!",
        this.closeDisplayMessage
      );
      this.setState({ messageUI, displayMessage: true });
    } else {
      const messageUI = RenderMessage(
        response.status,
        response.data.message,
        this.closeDisplayMessage
      );
      this.setState({ messageUI, displayMessage: true });
    }
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.data;
    delete data["sector"];
    console.log("CALLES");

    let response;
    try {
      response = await API.put(
        `/stockExchange/update/${this.state.currExchange}`,
        this.state.data
      );
      this.handleResponse(response);
    } catch (e) {
      console.log("Error");
      console.log(e.response);
      this.handleResponse(e.response);
    }

    console.log(response);
  };

  validateFormInput = () => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  render() {
    console.log("printing state");
    console.log(this.state);
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Update Exchange
          </h4>
          <div class="d-flex">
            <Link
              to="/admin/exchange/list"
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

          <form class="row g-3 needs-validation" noValidate>
            <div class={`col-md-4`}>
              <label for={"exchangeName"} class="form-label">
                {EXCHANGE_JSON_FIELD["exchangeName"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"exchangeName"}
                value={this.state.data["exchangeName"]}
                name={"exchangeName"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"contactAddress"} class="form-label">
                {EXCHANGE_JSON_FIELD["contactAddress"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"contactAddress"}
                value={this.state.data["contactAddress"]}
                name={"contactAddress"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"remarks"} class="form-label">
                {EXCHANGE_JSON_FIELD["remarks"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"remarks"}
                value={this.state.data["remarks"]}
                name={"remarks"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-12`}>
              <label for={"brief"} class="form-label">
                {EXCHANGE_JSON_FIELD["brief"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"brief"}
                value={this.state.data["brief"]}
                name={"brief"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class="col-12 d-flex flex-row-reverse">
              <button
                class="btn btn-primary col-3 mt-3 "
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary col-2 me-3 mt-3"
                onClick={this.clearForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCompany;
