import React from "react";

import ComparisionChart from "./ComparisionChart";
import { Link } from "react-router-dom";
import API from "../../Api";
import { RenderMessage } from "../../globals/helper";
// import { Button } from "bootstrap";
import ComparisionForm from "./ComparisionForm";

class CompareCompany extends React.Component {
  state = {
    rawData: { type: "company" },
    data: {
      from: "",
      to: "",
      companyList: [],
      sectorList: [],
    },
    formElements: [],
    formElementsData: [],
    chartData: [],
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

  handleFormInput = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    const companyList = this.state.formElementsData.filter(
      (o) => o.type == "company"
    );
    let sectorList = this.state.formElementsData.filter(
      (o) => o.type == "sector"
    );
    const data = this.state.data;
    console.log("ASKFNKAFSF AFLNASFLJASBFL AFAJLSFNAJSFb");
    console.log(sectorList);
    sectorList = sectorList.map((o) => o.sectorName);

    data.sectorList = sectorList;
    data.companyList = companyList;
    console.log("PRIENTNETENTETNETN");
    console.log(data);
    console.log(data.companyList);
    console.log(data.sectorList);

    let response;
    try {
      response = await API.post(`/stockPrices/compare`, data);
      this.handleResponse(response);
      this.setState({ chartData: response.data });
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
  };

  handleFormElementData = (key, data) => {
    const formElementsData = this.state.formElementsData;
    formElementsData[key] = { ...data };
    console.log("PRINTING ");
    console.log(data);
    console.log(key);
    this.setState({ formElementsData });
  };

  handleRemove = (key) => {
    const formElements = this.state.formElements;
    const formElementsData = this.state.formElementsData;
    delete formElements[key];
    delete formElementsData[key];
    this.setState({ formElements, formElementsData });
  };

  addFormElement = () => {
    const formElements = this.state.formElements;
    console.log("LENGTH");
    console.log(formElements.length);
    formElements.push(
      <ComparisionForm
        addData={this.handleFormElementData}
        formId={formElements.length}
        removeElement={this.handleRemove}
        data={this.state.rawData}
      />
    );
    this.setState({ formElements });
  };

  renderFormElements = () => {
    return this.state.formElements.map((o) => {
      return o;
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div class="h4" style={{ display: "flex", alignItems: "center" }}>
          Analyze Companies and Sectors
        </div>
        <form class=" mt-5 row needs-validation" noValidate>
          <div class={`col-md-3`}>
            <label for={"from"} class="form-label">
              From
            </label>
            <input
              type="date"
              class="form-control"
              id={"from"}
              // value={this.state.data["openDateTime"]}
              name={"from"}
              value={this.state.data.from}
              onChange={this.handleFormInput}
              // placeholder="DD/MM/YYYY HH:MM:SS"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class={`col-md-3`}>
            <label for={"to"} class="form-label">
              To
            </label>
            <input
              type="date"
              class="form-control"
              id={"to"}
              name={"to"}
              value={this.state.data.to}
              onChange={this.handleFormInput}
              // value={this.state.data["openDateTime"]}
              // placeholder="DD/MM/YYYY"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <button
            type="button"
            class="col-md-2  btn btn-success btn-md justify-content-center text-center align-self-end ms-3 md-3 "
            style={{ display: "flex", alignItems: "center" }}
            onClick={this.addFormElement}
          >
            +
          </button>
          <button
            type="button"
            class="col-md-2  btn btn-primary btn-md justify-content-center text-center align-self-end ms-3 md-3 "
            style={{ display: "flex", alignItems: "center" }}
            onClick={this.handleFormSubmit}
            disabled={this.state.formElementsData.length == 0}
          >
            Submit
          </button>
        </form>

        <div class="container mt-3">{this.renderFormElements()}</div>

        {/* <ComparisionForm /> */}

        <div class="container mt-5">
          {" "}
          <ComparisionChart data={this.state.chartData} />
        </div>
      </div>
    );
  }
}

export default CompareCompany;
