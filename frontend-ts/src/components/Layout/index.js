import React from "react";
import { Outlet } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import Menu from "./Menu";
import "./Layout.local.scss";

const Layout = () => {
  const items = [
    {
      id: 1,
      label: "Clients",
      icon: "pi pi-fw pi-users",
      url: "/clients",
    },
    {
      id: 2,
      label: "Produits",
      icon: "pi pi-fw pi-cog",
      url: "/configuration",
    },
  ];

  return (
    <div className="body">
      <div className="">
        <HeaderApp />
        <Menu items={items} />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
