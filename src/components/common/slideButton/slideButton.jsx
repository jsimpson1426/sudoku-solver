import React from "react";
import "./slideButton.css";

const SlideButton = ({ clickFunction, btnText, id }) => {
  return (
    <button id={id} className="slidebutton-div" onClick={clickFunction}>
      {btnText}
    </button>
  );
};

export default SlideButton;
