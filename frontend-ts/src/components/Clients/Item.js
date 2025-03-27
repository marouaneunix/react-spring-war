import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import "./Item.local.scss";

const Item = ({
  item,
  key,
  onEditClient,
  onDeleteClient,
  onActivateClient,
  onConfingurateClient,
}) => {
  const [editedClient, setEditedClient] = useState(null);

  return (
    <div key={key} className="item">
      {!editedClient ? (
        <div>
          <div className="item_infos">
            <div className="item_infos_header">{item.name}</div>
            <div className="item_infos_sub_header">
              Nom du societé : {item.society}
            </div>
            <div className="item_infos_sub_header">
              {"ICE"} : {item.ice}
            </div>
          </div>
          <div className="item_tags">
            <div
              className={`tag ${
                item.nbrVoucher > 0 ? "tag-success" : "tag-danger"
              }`}
            >
              <span>{item.nbrVoucher}</span> {"Bon saisie"}
            </div>
          </div>
          <div className="item_actions">
            <Link to={`/calendar/${item.id}`}>
              <div className="action">
                <i className="pi pi-calendar" />
              </div>
            </Link>
            <Link to={`/invoice/${item.id}`}>
              <div className="action">
                <i className="pi pi-file" />
              </div>
            </Link>
            {item.archivedAt ? (
              <div className="action" onClick={() => onActivateClient(item.id)}>
                <i className="pi pi-replay" />
              </div>
            ) : (
              <Fragment>
                <div
                  className="action"
                  onClick={() => onConfingurateClient(item)}
                >
                  <i className="pi pi-cog" />
                </div>
                <div className="action" onClick={() => setEditedClient(item)}>
                  <i className="pi pi-pencil" />
                </div>
                <div
                  className="action"
                  onClick={(event) => {
                    confirmPopup({
                      target: event.currentTarget,
                      message: "Sure d'archiver ce produit?",
                      icon: "pi pi-exclamation-triangle",
                      accept: () => onDeleteClient(item.id),
                      reject: null,
                    });
                  }}
                >
                  <i className="pi pi-trash" />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      ) : (
        <div className="horizental-form">
          <div className="inputgroup">
            <label>
              Nom du client<span>*</span>
            </label>
            <input
              value={editedClient.name}
              placeholder="saisir le nom du client"
              onChange={(e) => {
                setEditedClient({ ...editedClient, name: e.target.value });
              }}
            />
          </div>
          <div className="inputgroup">
            <label>
              Nom du societé<span>*</span>
            </label>
            <input
              value={editedClient.society}
              placeholder="saisir le nom du societé"
              onChange={(e) => {
                setEditedClient({ ...editedClient, society: e.target.value });
              }}
            />
          </div>
          <div className="inputgroup">
            <label>
              ICE du client<span>*</span>
            </label>
            <input
              value={editedClient.ice}
              placeholder="saisir l'ICE du societé"
              onChange={(e) => {
                setEditedClient({ ...editedClient, ice: e.target.value });
              }}
            />
          </div>
          <div>
            <button
              icon="pi pi-plus"
              onClick={() => {
                onEditClient(editedClient);
                setEditedClient(null);
              }}
            >
              <i className="pi pi-check" />
            </button>
            <button className="default" onClick={() => setEditedClient(null)}>
              <i className="pi pi-times" />
            </button>
          </div>
        </div>
      )}

      <ConfirmPopup />
    </div>
  );
};

export default Item;
