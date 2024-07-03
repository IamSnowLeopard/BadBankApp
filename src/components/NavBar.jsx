import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email"); // Get the user's email from localStorage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login");
  };

  // Define a function to determine the NavLink's class based on its active state
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
          </ul>
          <ul className="navbar-nav ms-auto">
            {email && (
              <>
                <li className="nav-item">
                  <span className="navbar-text">{email}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
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
