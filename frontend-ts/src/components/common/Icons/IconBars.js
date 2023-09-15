import React from "react";

export const BarsIcon = ({ size = 14, level = 0, fill = "#29394D" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="5"
      width="2"
      height="4"
      fill={level > 0 ? fill : "#D8DDE2"}
    />
    <rect
      x="6"
      y="3"
      width="2"
      height="8"
      fill={level > 1 ? fill : "#D8DDE2"}
    />
    <rect
      x="10"
      y="1"
      width="2"
      height="12"
      fill={level > 2 ? fill : "#D8DDE2"}
    />
  </svg>
);
