import React from "react";

import { IPO_JSON_FIELD } from "../../../globals/configs";

import { Link } from "react-router-dom";
import API from "../../../Api";
import { RenderMessage } from "../../../globals/helper";

class UpdateIPO extends React.Component {
  state = {
    data: {
      pricePerShare: null,
      totalNumberOfShares: null,
      openDateTime: null,
      remarks: "",
    },
    company: "",
    displayMessage: false,
    messageUI: null,
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

    const response = await API.get(`/ipo/${companyName}`);
    console.log(response.data);
    const data = {};
    Object.keys(this.state.data).forEach((o) => (data[o] = response.data[o]));

    this.setState({ data, company: companyName });
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
        "Successfully Updated IPO!!",
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
      response = await API.put(`/ipo/update/${this.state.company}`, {
        ...this.state.data,
      });
      this.handleResponse(response);
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

    console.log(response);
  };

  renderSectorList = () => {
    return this.state.sectorList.map((el) => {
      return <option>{el.sectorName}</option>;
    });
  };

  handleSector = (e) => {
    this.setState({ sector: e.target.value });
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
            Update IPO Details
          </h4>
          <div class="d-flex">
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

          <form class="row g-3 needs-validation" noValidate>
            <div class={`col-md-4`}>
              <label for={"pricePerShare"} class="form-label">
                {IPO_JSON_FIELD["pricePerShare"]}
              </label>
              <input
                type="number"
                class="form-control"
                id={"pricePerShare"}
                value={this.state.data["pricePerShare"]}
                name={"pricePerShare"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"totalNumberOfShares"} class="form-label">
                {IPO_JSON_FIELD["totalNumberOfShares"]}
              </label>
              <input
                type="number"
                class="form-control"
                id={"totalNumberOfShares"}
                value={this.state.data["totalNumberOfShares"]}
                name={"totalNumberOfShares"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"openDateTime"} class="form-label">
                {IPO_JSON_FIELD["openDateTime"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"openDateTime"}
                value={this.state.data["openDateTime"]}
                name={"openDateTime"}
                placeholder="DD/MM/YYYY HH:MM:SS"
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-6`}>
              <label for={"company"} class="form-label">
                {IPO_JSON_FIELD["company"]}
              </label>
              <select
                class="form-select"
                disabled
                id="company"
                required
                name={"company"}
                onChange={this.handleCompanyInput}
                value={this.state.company}
              >
                <option>{this.state.company}</option>
              </select>
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-6`}>
              <label for={"remarks"} class="form-label">
                {IPO_JSON_FIELD["remarks"]}
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

export default UpdateIPO;
