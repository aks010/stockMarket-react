import React from "react";
import { Link } from "react-router-dom";
import { IPO_JSON_FIELD } from "../../../globals/configs";
import API from "../../../Api";
import { RenderMessage } from "../../../globals/helper";
import { GetAuthHeaderToken } from "../../../globals/configs";

class CompanyExchangeMap extends React.Component {
  state = {
    data: {
      companyCode: "",
      company: "",
      exchange: "",
    },
    companyList: [],
    exchangeList: [],
    displayMessage: false,
    messageUI: null,
  };

  clearForm = () => {
    console.log("CLICKED");
    this.setState({
      data: {
        companyCode: "",
        company: "",
        exchange: "",
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
    const companyResponse = await API.get("/company/list/", {
      headers: {
        Authorization: GetAuthHeaderToken(),
      },
    });
    const exchangeResponse = await API.get("/stockExchange/list/", {
      headers: {
        Authorization: GetAuthHeaderToken(),
      },
    });

    const companyList = companyResponse.data.map((o) => {
      return o.companyName;
    });
    const exchangeList = exchangeResponse.data.map((o) => {
      return o.exchangeName;
    });

    companyList.sort();

    this.setState({ companyList, exchangeList });
  };

  handleFormInput = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
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

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.data;

    if (this.state.data.company == "" || this.state.data.exchange == "") {
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
        response = await API.post(
          `/company/map/${this.state.data.company}/${this.state.data.exchange}/`,
          {
            companyCode: this.state.data.companyCode,
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

  getFieldWidth = (field) => {
    if (field == "sector" || field == "boardOfDirectors") return 6;
    if (field == "companyBrief") return 12;
    else return 4;
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

  render() {
    console.log("HELLO");
    // console.log(this.props);
    console.log(this.state.data);
    // console.log(Object.keys(this.state.data).map((el) => el));
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Map Company Exchange
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
            <div class={`col-md-6`}>
              <label for={"company"} class="form-label">
                Company
              </label>
              <select
                class="form-select"
                id="company"
                required
                name={"company"}
                onChange={this.handleFormInput}
                value={this.state.data.company}
              >
                <option selected disabled value="">
                  Choose...
                </option>
                {this.renderCompanyList()}
              </select>
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class={`col-md-6`}>
              <label for={"exchange"} class="form-label">
                Exchange
              </label>
              <select
                class="form-select"
                id="exchange"
                required
                name={"exchange"}
                onChange={this.handleFormInput}
                value={this.state.data.exchange}
              >
                <option selected disabled value="">
                  Choose...
                </option>
                {this.renderExchangeList()}
              </select>
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class={`col-md-4`}>
              <label for={"companyCode"} class="form-label">
                Company Code
              </label>
              <input
                type="text"
                class="form-control"
                id={"companyCode"}
                value={this.state.data["companyCode"]}
                name={"companyCode"}
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

export default CompanyExchangeMap;
