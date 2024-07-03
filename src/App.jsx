import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserActivitiesProvider } from "./components/UserActivitiesContext";
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
    <UserActivitiesProvider>
      <Router>
        <div className="App">
          <NavBar />
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <ProtectedRoute path="/deposit" element={<Deposit />} />
              <ProtectedRoute path="/withdrawal" element={<Withdrawal />} />
              <ProtectedRoute path="/all-data" element={<AllData />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserActivitiesProvider>
  );
};

export default App;
