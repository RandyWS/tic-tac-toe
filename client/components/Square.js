import React, { useState } from "react";

const style = {
  background: "#e9c46a",
  border: "2px solid #264653",
  fontSize: "80px",
  fontWeight: "800",
  cursor: "pointer",
  outline: "none",
};

const Square = ({ value, onClick }) => (
  <button style={style} onClick={onClick}>
    {value}
  </button>
);

export default Square;
