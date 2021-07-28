import React from "react";
import API from "../Api";
import { RenderMessage } from "../globals/helper";
import { USER_JSON_FIELD } from "../globals/configs";
import { Link } from "react-router-dom";

class LoginComponent extends React.Component {
  state = {
    data: {
      username: "",
      password: "",
      role: "",
      email: "",
      mobile: "",
    },
    displayMessage: false,
    messageUI: null,
    spinner: false,
  };

  clearForm = () => {
    this.setState({
      data: {
        username: "",
        password: "",
        role: "",
        email: "",
        mobile: "",
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
  handleFormInput = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };
  handleResponse = (response) => {
    if (response.status == 201) {
      const messageUI = RenderMessage(
        201,
        "Successfully Registered! Verification link sent to your email! Redirecting to Login...",
        this.closeDisplayMessage
      );
      this.setState({ messageUI, displayMessage: true });
      window.setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
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
    let response;
    this.setState({ spinner: true });
    try {
      response = await API.post(`/register`, {
        ...this.state.data,
      });
      this.handleResponse(response);
      this.setState({ spinner: false });
    } catch (e) {
      console.log("Error");
      console.log(e);
      if (e.response) this.handleResponse(e.response);
      else
        this.handleResponse({
          status: null,
          data: { message: "Unable to Connect to Server" },
        });
      this.setState({ spinner: false });
    }
  };
  render() {
    return (
      <div class="d-flex container mt-3  justify-content-center">
        <div class="container m-5 bg-light rounded border border-1 col-6 ">
          <form class="container ps-5 pe-5 mt-5 mb-5">
            <div class="mb-3 container-fluid">
              <div class="mt-3">
                {this.state.displayMessage && this.state.messageUI}
              </div>
              <label for="username" class="form-label">
                {USER_JSON_FIELD["username"]}
              </label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                onChange={this.handleFormInput}
                value={this.state.data.username}
              />
            </div>
            <div class="mb-3 container-fluid">
              <label for="email" class="form-label">
                {USER_JSON_FIELD["email"]}
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                onChange={this.handleFormInput}
                value={this.state.data.email}
              />
            </div>
            <div class="mb-3 container-fluid">
              <label for="password" class="form-label">
                {USER_JSON_FIELD["password"]}
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                onChange={this.handleFormInput}
                value={this.state.data.password}
              />
            </div>
            <div class={`container-fluid mb-3`}>
              <label for={"role"} class="form-label">
                {USER_JSON_FIELD["role"]}
              </label>
              <select
                class="form-select"
                id="role"
                required
                name={"role"}
                onChange={this.handleFormInput}
                value={this.state.data.role}
              >
                <option selected disabled value="">
                  Choose...
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class="mb-3 container-fluid">
              <label for="mobile" class="form-label">
                {USER_JSON_FIELD["mobile"]}
              </label>
              <input
                type="text"
                class="form-control"
                id="mobile"
                name="mobile"
                onChange={this.handleFormInput}
                value={this.state.data.mobile}
              />
            </div>
            <div class="d-flex container-fluid mt-3 flex-row-reverse justify-content-between">
              {!this.state.spinner ? (
                <button
                  type="submit"
                  class="btn btn-primary mt-3 col-md-3"
                  onClick={this.handleFormSubmit}
                >
                  Register
                </button>
              ) : (
                <button class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {"  "}
                  Signing Up ...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
