import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  <img src={spinner} alt="Loading.." style={spinnerStyle} />;
};

/* Styles */
const spinnerStyle = {
  display: "block",
  margin: "auto",
  width: "200px",
};

export default Spinner;
