import React from "react";
import "./slideButton.sass";

const SlideButton = ({ clickFunction, btnText, id }) => {
  return (
    <button id={id} className="slidebutton-div" onClick={clickFunction}>
      {btnText}
    </button>
  );
};

export default SlideButton;
