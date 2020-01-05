import React from "react";
import "./RadioButton.module.css";

export default ({ children, value, currentValue, onChecked }) => (
  <>
    <input
      type="radio"
      value={value}
      checked={currentValue === value}
      onChange={() => onChecked(value)}
      id={value}
    />
    <label htmlFor={value}>{children}</label>
  </>
);
