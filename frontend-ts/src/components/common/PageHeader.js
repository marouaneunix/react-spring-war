import React from "react";
import "./PageHeader.local.scss";

const HeaderApp = ({ icon, title, subTitle }) => {
  return (
    <div className="page_header">
      <div className="icon">{icon}</div>
      <div className="details">
        <div className="title">{title}</div>
        <div className="sub_title">{subTitle}</div>
      </div>
    </div>
  );
};

export default HeaderApp;
