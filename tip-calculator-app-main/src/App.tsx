import React from "react";
import logo from "./info/images/logo.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <div className="header__container">
        <img src={logo} alt="tes" />
      </div>
      <Card />
      <div style={{ textAlign: "center" }} className="attribution">
        Challenge by{" "}
        <a
          rel="noreferrer"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/bazybones">Bazy</a>.
      </div>
    </div>
  );
}

export default App;
