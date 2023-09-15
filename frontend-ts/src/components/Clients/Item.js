import React from "react";
import { Link } from "react-router-dom";

import "./Item.local.scss";

const Item = ({ item, key }) => {
  return (
    <div key={key} className="item">
      <div className="item_infos">
        <div className="item_infos_header">{item.name}</div>
        <div className="item_infos_sub_header">
          {item.uen ? `${item.uen} - ` : ""} {item.group}{" "}
        </div>
        <div className="item_infos_sub_header">
          {"ID"} : {item.erp}
        </div>
      </div>
      <div className="item_state">
        <Link to={`/client/calendar/${item.id}`}>
          <i className="pi  pi-calendar" />
          <div className="item_state_label">{"calendar"}</div>
        </Link>
      </div>
      <div className="item_tags">
        <div className="tag tag-success">
          <span>{12}</span> {"Bon saisie"}
        </div>
      </div>
      <div className="item_tags">
        <div className="tag tag-danger">
          <span>{12}</span> {"Bon non-saisie"}
        </div>
      </div>
      <div className="item_tags">
        <div className="tag tag-warning">
          <span>{12}</span> {"Bon a ne pas saisir"}
        </div>
      </div>
      <div className="item_actions">
        <Link to={`/`}>
          <div className="action">
            <i className="pi pi-cog" />
          </div>
        </Link>
        <Link to={`/`}>
          <div className="action">
            <i className="pi pi-calculator" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Item;
