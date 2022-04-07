import React from "react";
export default (props) => (
  <svg
    style={props.style}
    width={props.width}
    height={props.height}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <path
      stroke={props.color}
      fill={props.fill}
      d="M 3.59375 12 L 5.28125 13.71875 L 15.28125 23.71875 L 16 24.40625 L 16.71875 23.71875 L 26.71875 13.71875 L 28.40625 12 Z M 8.4375 14 L 23.5625 14 L 16 21.5625 Z"
    />
  </svg>
);
