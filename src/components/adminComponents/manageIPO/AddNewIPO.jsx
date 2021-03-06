import React from "react";
import { Link } from "react-router-dom";
import { IPO_JSON_FIELD } from "../../../globals/configs";
import API from "../../../Api";
import { RenderMessage } from "../../../globals/helper";
import { GetAuthHeaderToken } from "../../../globals/configs";

class AddNewIPO extends React.Component {
  state = {
    data: {
      pricePerShare: null,
      totalNumberOfShares: null,
      openDateTime: null,
      remarks: "",
      openDate: "",
      openTime: "",
    },
    company: "",
    companyList: [],
    displayMessage: false,
    messageUI: null,
  };

  clearForm = () => {
    console.log("CLICKED");
    this.setState({
      data: {
        pricePerShare: "",
        totalNumberOfShares: "",
        remarks: "",
        openDate: "",
        openTime: "",
      },
      company: "",
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
    const companyResponse = await API.get("/company/list/", {
      headers: {
        Authorization: GetAuthHeaderToken(),
      },
    });
    console.log("OKKK");
    console.log(companyResponse);
    const companyList = companyResponse.data.map((o) => {
      return o.companyName;
    });

    companyList.sort();

    this.setState({ companyList });
  };

  handleFormInput = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  handleCompanyInput = (e) => {
    this.setState({ company: e.target.value });
  };

  handleResponse = (response) => {
    let messageUI = null;
    if (response.status == 201) {
      messageUI = RenderMessage(
        201,
        "Successfully Created IPO!!",
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

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.data;
    data["openDateTime"] = new Date(data["openDate"] + " " + data["openTime"]);
    delete data["openDate"];
    delete data["openTime"];
    console.log("HELLO");
    console.log(data);
    if (this.state.company == "") {
      this.setState({
        messageUI: RenderMessage(
          400,
          "Company Cannot be empty!",
          this.closeDisplayMessage
        ),
        displayMessage: true,
      });
    } else {
      let response;
      try {
        response = await API.post(
          `/ipo/new/${this.state.company}/`,
          {
            ...data,
          },
          {
            headers: {
              Authorization: GetAuthHeaderToken(),
            },
          }
        );
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
    }
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

  renderCompanyList = () => {
    return this.state.companyList.map((el) => {
      return <option>{el}</option>;
    });
  };

  render() {
    console.log("HELLO");
    // console.log(this.props);
    console.log(this.state.data);
    // console.log(Object.keys(this.state.data).map((el) => el));
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>Add New IPO</h4>
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
              <label for={"company"} class="form-label">
                {IPO_JSON_FIELD["company"]}
              </label>
              <select
                class="form-select"
                id="company"
                required
                name={"company"}
                onChange={this.handleCompanyInput}
                value={this.state.company}
              >
                <option selected disabled value="">
                  Choose...
                </option>
                {this.renderCompanyList()}
              </select>
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-6`}>
              <label for={"openDate"} class="form-label">
                {IPO_JSON_FIELD["openDate"]}
              </label>
              <input
                type="date"
                class="form-control"
                id={"openDate"}
                value={this.state.data["openDate"]}
                name={"openDate"}
                // placeholder="DD/MM/YYYY HH:MM:SS"
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class={`col-md-6`}>
              <label for={"openTime"} class="form-label">
                {IPO_JSON_FIELD["openTime"]}
              </label>
              <input
                type="time"
                class="form-control"
                id={"openTime"}
                value={this.state.data["openTime"]}
                name={"openTime"}
                // placeholder="DD/MM/YYYY HH:MM:SS"
                onChange={this.handleFormInput}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-12`}>
              <label for={"remarks"} class="form-label">
                {IPO_JSON_FIELD["remarks"]}
              </label>
              <input
                type="textarea"
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

export default AddNewIPO;
