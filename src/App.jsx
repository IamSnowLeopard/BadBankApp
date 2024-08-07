import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserActivitiesProvider } from "./components/UserActivitiesContext";
import { AuthProvider } from "./components/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Deposit from "./components/Deposit";
import Withdrawal from "./components/Withdraw";
import AllData from "./components/AllData";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <UserActivitiesProvider>
        <Router>
          <div className="App">
            <NavBar />
            <div className="container mt-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/deposit"
                  element={<ProtectedRoute element={Deposit} />}
                />
                <Route
                  path="/withdrawal"
                  element={<ProtectedRoute element={Withdrawal} />}
                />
                <Route
                  path="/all-data"
                  element={<ProtectedRoute element={AllData} />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserActivitiesProvider>
    </AuthProvider>
  );
};

export default App;
