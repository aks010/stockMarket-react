import React from "react";
import API from "../Api";
import { RenderMessage } from "../globals/helper";
import { Link } from "react-router-dom";
import { AuthorizeUser } from "../globals/configs";

class LoginComponent extends React.Component {
  state = {
    data: {
      username: "",
      password: "",
    },
    displayMessage: false,
    messageUI: null,
  };

  clearForm = () => {
    this.setState({
      data: {
        username: "",
        password: "",
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
    if (response.status == 201 || response.status == 200) {
      const messageUI = RenderMessage(
        201,
        "Successfully Logged In!!",
        this.closeDisplayMessage
      );
      this.setState({ messageUI, displayMessage: true });
      AuthorizeUser(response.data);
      window.setTimeout(() => {
        window.location.href = `/${response.data.role}`;
      });
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
    try {
      response = await API.post(`/authenticate`, this.state.data);
      this.handleResponse(response);
    } catch (e) {
      console.log("Error");
      console.log(e);
      if (e.response) this.handleResponse(e.response);
      else
        this.handleResponse({
          status: null,
          data: { message: "Unable to Connect to Server" },
        });
    }
  };
  render() {
    return (
      <div class="d-flex container mt-5  justify-content-center">
        <div class="container m-5  bg-light rounded border border-1 col-6 ">
          <form class="container ps-5 pe-5 mt-5 mb-5">
            <div class="mt-3">
              {this.state.displayMessage && this.state.messageUI}
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">
                User Name
              </label>
              <input
                type="username"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
                name="username"
                onChange={this.handleFormInput}
                value={this.state.data.username}
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
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
            <div class="d-flex mt-3 justify-content-between">
              <Link
                to="/signup"
                type="submit"
                class="btn btn-outline-success mt-3"
              >
                Sign Up
              </Link>
              <button
                type="submit"
                class="btn btn-primary mt-3"
                onClick={this.handleFormSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
