import React from "react";

import ComparisionChart from "./ComparisionChart";
import { Link } from "react-router-dom";
// import { Button } from "bootstrap";
import ComparisionForm from "./ComparisionForm";

class CompareCompany extends React.Component {
  state = {
    rawData: { type: "company" },
    formElements: [],
    formElementsData: [],
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  handleFormElementData = (key, data) => {
    const formElementsData = this.state.formElementsData;
    formElementsData[key] = { ...data };
    console.log("PRINTING ");
    console.log(data);
    console.log(key);
    this.setState({ formElementsData });
  };

  addFormElement = () => {
    const formElements = this.state.formElements;
    console.log("LENGTH");
    console.log(formElements.length);
    formElements.push(
      <ComparisionForm
        addData={this.handleFormElementData}
        formId={formElements.length}
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
          Compare Companies
        </div>
        <form
          class="mt-3 row g-3 needs-validation"
          noValidate
          onClick={this.handleFormSubmit}
        >
          <div class={`col-md-3`}>
            <label for={"openDateTime"} class="form-label">
              From
            </label>
            <input
              type="date"
              class="form-control"
              id={"openDateTime"}
              // value={this.state.data["openDateTime"]}
              name={"openDateTime"}
              placeholder="DD/MM/YYYY HH:MM:SS"
              // onChange={this.handleFormInput}
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class={`col-md-3`}>
            <label for={"openDateTime"} class="form-label">
              To
            </label>
            <input
              type="date"
              class="form-control"
              id={"openDateTime"}
              // value={this.state.data["openDateTime"]}
              name={"openDateTime"}
              placeholder="DD/MM/YYYY HH:MM:SS"
              // onChange={this.handleFormInput}
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <button
            type="button"
            class="col-md-2 btn btn-outline-primary btn-md justify-content-center text-center align-self-end ms-3 md-3 "
            style={{ display: "flex", alignItems: "center" }}
            onClick={this.addFormElement}
          >
            +
          </button>
        </form>

        <div class="container-fluid mt-3">{this.renderFormElements()}</div>

        {/* <ComparisionForm /> */}

        <div class="container mt-5"> {/* <ComparisionChart /> */}</div>
      </div>
    );
  }
}

export default CompareCompany;
