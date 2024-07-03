import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NavigationBar = () => {
  const { isLoggedIn, logout } = useAuth();

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link active-nav-link" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" end>
          BankApp
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={getNavLinkClass}
                to="/"
                data-description="Go to home page"
                end
              >
                Home
              </NavLink>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={getNavLinkClass}
                    to="/create-account"
                    data-description="Create an account"
                  >
                    Create Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={getNavLinkClass}
                    to="/login"
                    data-description="Login to account"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={getNavLinkClass}
                    to="/deposit"
                    data-description="Make a deposit"
                  >
                    Deposit
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={getNavLinkClass}
                    to="/withdrawal"
                    data-description="Make a withdrawal"
                  >
                    Withdrawal
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={getNavLinkClass}
                    to="/all-data"
                    data-description="View all activity"
                  >
                    All Activity
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
