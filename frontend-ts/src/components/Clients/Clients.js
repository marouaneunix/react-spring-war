import React, { useState, Fragment } from "react";
import { useQuery } from "react-query";

import { getClientsList } from "../../api";

import Item from "./Item";
import PageHeader from "../common/PageHeader";
import "./Clients.local.scss";

const Clients = () => {
  const [clients, setClients] = useState([
    { name: "client AA" },
    { name: "client BB" },
    { name: "client CC" },
  ]);
  const [filter, setFilter] = useState({
    keyWord: "",
    pageSize: 10,
    paginationPage: 1,
  });
  const [nbrClients, setNbrClients] = useState(0);

  let clientsQuery = useQuery(["getClientsList", filter], async () => {
    try {
      const response = await getClientsList(filter);
      setClients(response.data.data);
      setNbrClients(response.data.nbResult ? response.data.nbResult : 0);
    } catch (e) {
      return null;
    }
  });

  const renderFetchingLines = () => {
    let cardFetching = [];
    for (let i = 0; i < 10; i++) {
      cardFetching.push(
        <div key={i} className="line_fetching">
          <div className="infos">
            <div className="infos_header gradiant" />
            <div className="infos_sub_header gradiant" />
            <div className="infos_sub_header gradiant" />
          </div>
          <div className="state">
            <div className="state_icon gradiant" />
            <div className="state_label gradiant" />
          </div>
          <div className="progress">
            <div className="progress_info">
              <div className="gradiant" />
              <div className="gradiant" />
            </div>
            <div
              style={{
                height: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <div className="progress_container">
                <div className="progress_icon gradiant" />
                <div className="progress_index gradiant" />
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="progress_info">
              <div className="gradiant" />
              <div className="gradiant" />
            </div>
            <div
              style={{
                height: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <div className="progress_container">
                <div className="progress_icon gradiant" />
                <div className="progress_index gradiant" />
              </div>
            </div>
          </div>
          <div className="tags">
            <div className="tag gradiant" />
          </div>
          <div className="avatars">
            {[1, 2, 3, 4].map((index) => (
              <div className="avatar gradiant" key={index} />
            ))}
          </div>
        </div>
      );
    }
    return cardFetching;
  };

  return (
    <div className="page-content">
      <PageHeader
        title={"Liste des clients"}
        subTitle={"Visualiser tes clients"}
        icon={
          <i
            className="pi pi-fw pi-users"
            style={{ fontSize: "2rem", color: "#2a8ec7" }}
          />
        }
      />
      <div className="container">
        <div className="result_label">
          {"Nombre de client"} : {nbrClients}
        </div>
        <div className="medium-11">
          {clientsQuery.isFetching ? (
            renderFetchingLines()
          ) : clients.length ? (
            <Fragment>
              {clients.map((item, i) => (
                <Item item={item} key={`client-${item.id}`} />
              ))}
            </Fragment>
          ) : (
            <div className="no_data">
              <div className="title">{"noDataFound"}</div>
              <div className="subTitle">{"noClientsFound"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
