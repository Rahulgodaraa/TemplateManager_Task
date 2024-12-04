import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Import the main App component
import "./index.css"; // Import your global styles

ReactDOM.render(
  <BrowserRouter> {/* Wrap the App in BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
