import React, { Children } from "react";
import "./PageHeader.local.scss";

const HeaderApp = ({ icon, title, subTitle, children }) => {
  return (
    <div className="page_header">
      <div>
        <div className="icon">{icon}</div>
        <div className="details">
          <div className="title">{title}</div>
          <div className="sub_title">{subTitle}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HeaderApp;
