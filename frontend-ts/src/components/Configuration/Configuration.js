import React, { useState, Fragment } from "react";
import { useQuery } from "react-query";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { getProductLists, saveProduct, deleteProduct } from "../../api";

import PageHeader from "../common/PageHeader";
import "./Configuration.local.scss";

const Configuration = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [filter, setFilter] = useState({
    tab: "actives",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
  });

  let getProductsQuery = useQuery(["getProductLists"], async () => {
    try {
      const response = await getProductLists();
      setProducts(response.data);
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

  const reject = () => {};

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      // add new product to the list
    } catch (e) {
      return null;
    }
  };

  const handleSaveProduct = async () => {
    try {
      const response = await saveProduct(newProduct);
      // add new product to the list
    } catch (e) {
      return null;
    }
  };

  const handleActivateProduct = () => {};
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
      <div className="container content">
        <div className="form">
          <label>Ajouter un nouveau produit</label>
          <div className="add-form">
            <div className="inputgroup">
              <label>
                Nom du produit<span>*</span>
              </label>
              <input
                value={newProduct.name}
                placeholder="saisir le nom du client"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
            </div>
            <div className="inputgroup">
              <label>
                Prix du produit<span>*</span>
              </label>
              <input
                type="number"
                value={newProduct.price}
                placeholder="saisir le prix"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <button
              icon="pi pi-plus"
              onClick={() => handleSaveProduct(newProduct)}
            >
              ajouter
            </button>
          </div>
        </div>
        <div className="list">
          <div className="tabs">
            {!getProductsQuery.isFetching &&
              ["actives", "archives"].map((tab) => (
                <div
                  key={`tab-${tab}`}
                  className={`tab ${filter.tab === tab ? "active" : ""}`}
                  onClick={() => setFilter({ ...filter, tab })}
                >
                  {tab} |<span> {products[tab].length}</span>
                </div>
              ))}
          </div>
          <div className="medium-11 standard_list">
            {getProductsQuery.isFetching ? (
              renderFetchingLines()
            ) : getProductsQuery.isFetched ? (
              <Fragment>
                {products[filter.tab].map((item, i) => (
                  <div key={i} className="item">
                    {editedProduct && editedProduct.id === item.id ? (
                      <div className="horizental-form">
                        <div className="inputgroup">
                          <label>
                            Nom du produit<span>*</span>
                          </label>
                          <input
                            value={editedProduct.name}
                            placeholder="saisir le nom du client"
                            onChange={(e) => {
                              setEditedProduct({
                                ...editedProduct,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="inputgroup">
                          <label>
                            Prix du produit<span>*</span>
                          </label>
                          <input
                            value={editedProduct.price}
                            placeholder="saisir le nom du societé"
                            onChange={(e) => {
                              setEditedProduct({
                                ...editedProduct,
                                price: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <button
                            icon="pi pi-plus"
                            onClick={() => {
                              handleSaveProduct(editedProduct);
                              setEditedProduct(null);
                            }}
                          >
                            <i className="pi pi-check" />
                          </button>
                          <button
                            className="default"
                            onClick={() => setEditedProduct(null)}
                          >
                            <i className="pi pi-times" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="item_infos">
                          <div className="item_infos_header item_infos_only">
                            {item.name}
                          </div>
                        </div>
                        <div className="item_tags">
                          <div className="tag tag-success">
                            <span>{item.price}</span> {"DH"}
                          </div>
                        </div>
                        <div className="item_actions">
                          {item.archivedAt ? (
                            <div
                              className="action"
                              onClick={() => handleActivateProduct(item)}
                            >
                              <i className="pi pi-replay" />
                            </div>
                          ) : (
                            <Fragment>
                              <div
                                className="action"
                                onClick={() => setEditedProduct(item)}
                              >
                                <i className="pi pi-pencil" />
                              </div>
                              <div
                                className="action"
                                onClick={(event) => {
                                  confirmPopup({
                                    target: event.currentTarget,
                                    message: "Sure d'archiver ce produit?",
                                    icon: "pi pi-exclamation-triangle",
                                    accept: () => handleDeleteProduct(item.id),
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
                    )}
                    <ConfirmPopup />
                  </div>
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
    </div>
  );
};

export default Configuration;
