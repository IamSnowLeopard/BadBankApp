import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bankImage from "../assets/BadBankApp.png";

const Home = () => {
  const navigate = useNavigate();
  const [dynamicText1, setDynamicText1] = useState("");
  const [dynamicText2, setDynamicText2] = useState("");
  const [dynamicText3, setDynamicText3] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDynamicText1("BadBank");
    }, 0);
    setTimeout(() => {
      setDynamicText2("BadBank");
    }, 0);
    setTimeout(() => {
      setDynamicText3("Whatcha gonna do?");
    }, 500);
    setTimeout(() => {
      setShowButtons(true);
    }, 1000);
  }, []);

  return (
    <div
      className="card"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bankImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "0",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="card-img-overlay d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <div>
          <h3
            className={`card-title text-center text-white dissolve-in orbitron-font`}
          >
            {dynamicText1}
          </h3>
          <h3
            className={`card-title text-center text-white dissolve-in orbitron-font`}
          >
            {dynamicText2}
          </h3>
          <p
            className={`card-text text-center text-light dissolve-in josefin-sans`}
          >
            {dynamicText3}
          </p>
        </div>
        {showButtons && (
          <div style={{ marginTop: "20px" }}>
            <button
              className="btn btn-primary me-2 dissolve-in"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-secondary dissolve-in"
              onClick={() => navigate("/create-account")}
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
