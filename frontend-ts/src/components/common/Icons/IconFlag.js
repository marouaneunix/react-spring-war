import React from "react";

export const FlagIcon = ({ size = 12, fill = "#6D7F92" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 7.5C2 7.5 2.5 7 4 7C5.5 7 6.5 8 8 8C9.5 8 10 7.5 10 7.5V1.5C10 1.5 9.5 2 8 2C6.5 2 5.5 1 4 1C2.5 1 2 1.5 2 1.5V7.5Z"
      stroke={fill}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 11V7.5"
      stroke={fill}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
