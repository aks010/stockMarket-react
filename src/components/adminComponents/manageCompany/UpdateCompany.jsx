import React from "react";

import { COMPANY_JSON_FIELD } from "../../../globals/configs";

import { Link } from "react-router-dom";
import API from "../../../Api";
import { RenderMessage } from "../../../globals/helper";

class UpdateCompany extends React.Component {
  state = {
    data: {
      companyName: "",
      ceo: "",
      turnover: null,
      boardOfDirectors: "",
      companyBrief: "",
    },
    sector: "",
    companyName: "",
    sectorList: [],
    displayMessage: false,
    messageUI: null,
  };

  clearForm = () => {
    this.setState({
      data: {
        companyName: "",
        ceo: "",
        turnover: null,
        boardOfDirectors: "",
        companyBrief: "",
      },
      sector: "",
      companyName: "",
      // sectorList: [],
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
    const companyName = pathSplit[pathSplit.length - 1];
    console.log(companyName);

    const response = await API.get(`/company/name/${companyName}`);
    console.log(response.data);
    const data = {};
    Object.keys(this.state.data).forEach((o) => (data[o] = response.data[o]));
    const sector = response.data.sector.sectorName;
    console.log(data);

    const sectorResponse = await API.get("/sectors/list");

    const sectorList = sectorResponse.data;
    sectorList.sort();

    this.setState({ data, sector, companyName, sectorList });
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

    if (this.state.sector == "") {
      this.setState({
        messageUI: RenderMessage(400, "Sector Cannot be empty!"),
        displayMessage: true,
      });
    } else {
      let response;
      try {
        response = await API.put(`/company/update/${this.state.companyName}`, {
          ...this.state.data,
          sector: { sectorName: this.state.sector },
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
    }
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

  getFieldWidth = (field) => {
    if (field == "sector" || field == "boardOfDirectors") return 6;
    if (field == "companyBrief") return 12;
    else return 4;
  };

  render() {
    console.log("printing state");
    console.log(this.state);
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Update Company
          </h4>
          <div class="d-flex">
            <Link
              to="/admin/company/list"
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
              <label for={"companyName"} class="form-label">
                {COMPANY_JSON_FIELD["companyName"]}
              </label>
              <input
                disabled
                type="text"
                class="form-control"
                id={"companyName"}
                value={this.state.data["companyName"]}
                name={"companyName"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"ceo"} class="form-label">
                {COMPANY_JSON_FIELD["ceo"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"ceo"}
                value={this.state.data["ceo"]}
                name={"ceo"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"turnover"} class="form-label">
                {COMPANY_JSON_FIELD["turnover"]}
              </label>
              <input
                type="number"
                class="form-control"
                id={"turnover"}
                value={this.state.data["turnover"]}
                name={"turnover"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-6`}>
              <label for={"sector"} class="form-label">
                {COMPANY_JSON_FIELD["sector"]}
              </label>
              <select
                class="form-select"
                disabled
                id="sector"
                required
                name={"sector"}
                onChange={this.handleSector}
                value={this.state.sector}
              >
                <option selected disabled value="">
                  Choose...
                </option>
                {this.renderSectorList()}
              </select>
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-6`}>
              <label for={"boardOfDirectors"} class="form-label">
                {COMPANY_JSON_FIELD["boardOfDirectors"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"boardOfDirectors"}
                value={this.state.data["boardOfDirectors"]}
                name={"boardOfDirectors"}
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-12`}>
              <label for={"companyBrief"} class="form-label">
                {COMPANY_JSON_FIELD["companyBrief"]}
              </label>
              <input
                type="text"
                class="form-control"
                id={"companyBrief"}
                value={this.state.data["companyBrief"]}
                name={"companyBrief"}
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCompany;
