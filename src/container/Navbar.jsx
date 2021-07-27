import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ADMIN, USER, GetUserRole } from "../globals/configs";

class Navbar extends React.Component {
  renderUI = () => {
    console.log(this.props.userRole);
    if (this.props.userRole == ADMIN) {
      return <div>ADMIN NAVBAR</div>;
    } else if (this.props.userRole == USER) {
      return <div>USER NAVBAR</div>;
    }
  };

  renderOptionsList = () => {
    if (this.props.userRole == ADMIN) {
      return (
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 container-fluid d-flex"
          style={{ justifyContent: "space-evenly" }}
        >
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/admin/importdata"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Import Data
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/admin/company/list"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Manage Company
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/admin/exchange/list"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Manage Exchange
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/admin/sector/list"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Manage Sectors
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/admin/ipo/list"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              IPO Details
            </NavLink>
          </li>
        </ul>
      );
    } else if (this.props.userRole == USER) {
      return (
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 container-fluid d-flex"
          style={{ justifyContent: "space-evenly" }}
        >
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/user/ipos"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              IPOs
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/user/companies"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Companies
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/user/exchanges"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Stock Exchanges
            </NavLink>
          </li>

          <li class="nav-item">
            <NavLink
              class="nav-link"
              aria-current="page"
              to="/user/compare/company"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
              }}
            >
              Analyze
            </NavLink>
          </li>
        </ul>
      );
    }
  };

  render() {
    console.log(this.props.userRole);
    console.log(this.props.userRole == null);

    return (
      <div>
        {/* {this.renderUI()} */}
        <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 ps-4 pd-4">
          <div class="container-fluid">
            <a class="navbar-brand">
              <img
                src="/logo-tab.png"
                alt=""
                width="60"
                height="48"
                class="d-inline-block align-text-middle me-3"
              />
              STOCKMARKET
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-nav d-flex container-fluid">
                {this.renderOptionsList()}
              </div>
              <div class=" navbar-nav d-flex nav-item">
                {this.props.userRole == null && (
                  <Link
                    to="/signup"
                    class="btn btn-success me-3"
                    type="submit"
                    style={{ width: "max-content" }}
                  >
                    Create Account
                  </Link>
                )}

                {this.props.userRole == null ? (
                  <Link
                    to="/login"
                    class="btn btn-outline-success"
                    type="submit"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    class="btn btn-outline-primary"
                    type="submit"
                    onClick={this.props.handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
