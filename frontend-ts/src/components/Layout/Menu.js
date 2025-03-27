import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ items }) => {
  let path = window.location.pathname;
  const [activated, setActivated] = useState(1);
  return (
    <div className="app_menu">
      {items.map((item) => (
        <Link to={item.url}>
          <div
            className={`menu_item ${path === item.url && "menu_item_active"}`}
            onClick={() => setActivated(item.id)}
            key={item.id}
          >
            <div className="icon">
              <i className={item.icon} />
            </div>

            <label>{item.label}</label>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
