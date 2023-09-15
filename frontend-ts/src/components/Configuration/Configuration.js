import React, { useState, Fragment } from "react";
import { useQuery } from "react-query";

import { getClientsList } from "../../api";

import PageHeader from "../common/PageHeader";
import "./Configuration.local.scss";

const Configuration = () => {
  const [productions, setProductions] = useState([
    { label: "client AA", price: 10 },
    { label: "client BB", price: 12 },
    { label: "client CC", price: 13 },
  ]);
  // const [filter, setFilter] = useState({
  //   keyWord: "",
  //   pageSize: 10,
  //   paginationPage: 1,
  // });

  // let clientsQuery = useQuery(["getClientsList", filter], async () => {
  //   try {
  //     const response = await getClientsList(filter);
  //     setClients(response.data.data);
  //     setNbrClients(response.data.nbResult ? response.data.nbResult : 0);
  //   } catch (e) {
  //     return null;
  //   }
  // });

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
        title={"Configuration des produits"}
        subTitle={"gerer mes produits"}
        icon={
          <i
            className="pi pi-fw pi-cog"
            style={{ fontSize: "2rem", color: "#2a8ec7" }}
          />
        }
      />
      <div className="container">
        <div className="medium-11">
          {/* {clientsQuery.isFetching ? (
            renderFetchingLines()
          ) : productions.length ? ( */}
          <Fragment>
            <div className="label">{"Gérer mes produits :"}</div>
            <div className="list_items">
              {productions.map((item, i) => (
                <div className="line">
                  <div className="title">{item.label}</div>
                  <div className="tag">{item.price}DH</div>
                  <div className="actions">
                    <div className="action action-trush">
                      <i className="pi pi-trash" />
                    </div>
                    <div className="action">
                      <i className="pi pi-pencil" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
          {/* ) : (
            <div className="no_data">
              <div className="title">{"noDataFound"}</div>
              <div className="subTitle">{"noClientsFound"}</div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
