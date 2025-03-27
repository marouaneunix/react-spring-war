import React, { useState, Fragment } from "react";
import { useQuery } from "react-query";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import {
  saveClient,
  archiveClient,
  activateClient,
  getClientsList,
  getProductLists,
  saveClientSurplus,
  getClientConfiguration,
} from "../../api";

import Item from "./Item";
import PageHeader from "../common/PageHeader";
import "./Clients.local.scss";
import moment from "moment";

const Clients = () => {
  const [visible, setVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [configuration, setConfiguration] = useState([]);
  const [filter, setFilter] = useState({
    keyWord: "",
    tab: "actives",
  });
  const [newClient, setNewClient] = useState({
    name: "",
    society: "",
    ice: "",
  });

  let clientsQuery = useQuery(["getClientsList"], async () => {
    try {
      const response = await getClientsList(filter);
      setClients(response.data ? response.data : []);
    } catch (e) {
      return null;
    }
  });

  let getProducts = useQuery(["getProductLists"], async () => {
    try {
      const response = await getProductLists();
      setProducts(response.data);
    } catch (e) {
      return null;
    }
  });

  const handleConfigurateClient = async (client) => {
    try {
      const response = await getClientConfiguration(client.id);
      setConfiguration(response.data ? JSON.parse(response.data.details) : {});
      setVisible(true);
      setSelectedClient(client);
      // add new client to the list
    } catch (e) {
      return null;
    }
  };

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

  const handleSaveClient = async (client) => {
    try {
      const response = await saveClient(client);
      let newActivesClients = [];
      if (!client.id) {
        setNewClient({
          name: "",
          society: "",
          ice: "",
        });
        newActivesClients = [...clients.actives];
        newActivesClients.unshift(response.data);
      } else {
        newActivesClients = clients.actives.map((item) => {
          if (client.id === item.id) {
            return client;
          } else {
            return item;
          }
        });
      }
      setClients({ ...clients, actives: newActivesClients });
    } catch (e) {
      return null;
    }
  };

  const handleSaveClientConfiguration = async () => {
    try {
      await saveClientSurplus(selectedClient.id, configuration);
      setConfiguration(null);
      setVisible(false);
      setSelectedClient(null);
    } catch (e) {
      return null;
    }
  };

  const handleArchiveClient = async (id) => {
    try {
      const response = await archiveClient(id);
      let archivedClient = clients.actives.filter(
        (client) => client.id === response.data
      )[0];
      let newActivesClients = clients.actives.filter(
        (client) => client.id !== response.data
      );
      let newArchivesClients = [...clients.archives];
      newArchivesClients.unshift({ ...archivedClient, archivedAt: moment() });
      setClients({ archives: newArchivesClients, actives: newActivesClients });
    } catch (e) {
      return null;
    }
  };

  const handleActivateClient = async (id) => {
    try {
      const response = await activateClient(id);
      let activatedClient = clients.archives.filter(
        (client) => client.id === response.data
      )[0];
      let newArchivesClients = clients.archives.filter(
        (client) => client.id !== response.data
      );
      let newActivesClients = [...clients.actives];
      delete activatedClient.archivedAt;
      newActivesClients.unshift(activatedClient);
      setClients({ archives: newArchivesClients, actives: newActivesClients });
    } catch (e) {
      return null;
    }
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
      <div className="container content">
        <div className="form">
          <label>Ajouter un nouveau client</label>
          <div className="add-form">
            <div className="inputgroup">
              <label>
                Nom du client<span>*</span>
              </label>
              <input
                value={newClient.name}
                placeholder="saisir le nom du client"
                onChange={(e) => {
                  setNewClient({ ...newClient, name: e.target.value });
                }}
              />
            </div>
            <div className="inputgroup">
              <label>
                Nom du societé<span>*</span>
              </label>
              <input
                value={newClient.society}
                placeholder="saisir le nom du societé"
                onChange={(e) =>
                  setNewClient({ ...newClient, society: e.target.value })
                }
              />
            </div>
            <div className="inputgroup">
              <label>
                ICE du client<span>*</span>
              </label>
              <input
                value={newClient.ice}
                placeholder="saisir l'ICE du societé"
                onChange={(e) =>
                  setNewClient({ ...newClient, ice: e.target.value })
                }
              />
            </div>
            <button
              icon="pi pi-plus"
              onClick={() => handleSaveClient(newClient)}
            >
              ajouter
            </button>
          </div>
        </div>
        <div className="list">
          <div className="tabs">
            {!clientsQuery.isFetching &&
              ["actives", "archives"].map((tab) => (
                <div
                  key={`tab-${tab}`}
                  className={`tab ${filter.tab === tab ? "active" : ""}`}
                  onClick={() => setFilter({ ...filter, tab })}
                >
                  {tab} |<span> {clients[tab].length}</span>
                </div>
              ))}
          </div>
          <div className="medium-11 standard_list">
            {clientsQuery.isFetching ? (
              renderFetchingLines()
            ) : clientsQuery.isFetched ? (
              <Fragment>
                {clients[filter.tab].map((item, i) => (
                  <Item
                    item={item}
                    key={`client-${item.id}`}
                    onConfingurateClient={handleConfigurateClient}
                    onDeleteClient={handleArchiveClient}
                    onActivateClient={handleActivateClient}
                    onEditClient={handleSaveClient}
                  />
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
      <Dialog
        header={`Configurer le surplus par rapport au client: `}
        visible={visible}
        position={"right"}
        style={{ width: "40vw" }}
        onHide={() => setVisible(false)}
        footer={
          <div>
            <Button
              label="Annuler"
              onClick={() => {
                setConfiguration(null);
                setVisible(false);
                setSelectedClient(null);
              }}
              className="p-button-text p-button-only-text"
            />
            <Button
              label="Enregistrer"
              className="p-button-text"
              onClick={() => handleSaveClientConfiguration()}
              autoFocus
            />
          </div>
        }
        draggable={false}
        resizable={false}
      >
        {selectedClient && (
          <div className="sidebar-form">
            <div className="element td-header">
              <div className="title">{"Designation"}</div>
              <div className="tag">{"Prix.init"}</div>
              <div className="input-tag">{"Surplus"}</div>
              <div className="tag last-tag">{"Total"}</div>
            </div>
            <div>
              {products.actives.map((item, i) => (
                <Fragment>
                  <div className="element">
                    <div className="title">{item.name}</div>
                    <div className="tag">
                      <span>{item.price}dh</span>
                    </div>
                    <div className="input-tag">
                      <input
                        type="number"
                        value={configuration[item.id]}
                        onChange={(e) => {
                          let newConfiguration = configuration;
                          newConfiguration[item.id] = e.target.value;
                          setConfiguration(newConfiguration);
                        }}
                      />
                    </div>
                    <div className="tag last-tag">
                      <span>
                        {parseFloat(item.price ?? 0) +
                          parseFloat(configuration[item.id] ?? 0)}
                        dh
                      </span>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Clients;
