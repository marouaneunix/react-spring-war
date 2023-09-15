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
      url: "/setting",
    },
    {
      id: 3,
      label: "Calendrier",
      icon: "pi pi-fw pi-calendar",
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
