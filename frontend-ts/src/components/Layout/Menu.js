import React, { useState } from "react";

const Menu = ({ items }) => {
  const [activated, setActivated] = useState(1);
  return (
    <div className="app_menu">
      {items.map((item) => (
        <div
          className={`menu_item ${activated === item.id && "menu_item_active"}`}
          onClick={() => setActivated(item.id)}
        >
          <div className="icon">
            <i className={item.icon} />
          </div>

          <label>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Menu;
