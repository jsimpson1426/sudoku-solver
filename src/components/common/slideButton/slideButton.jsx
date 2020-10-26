import React from "react";
import "./slideButton.sass";

const SlideButton = ({ btnLink, btnText }) => {
  return (
    <a className="slidebutton-a" href={btnLink}>
      {btnText}
    </a>
  );
};

export default SlideButton;
