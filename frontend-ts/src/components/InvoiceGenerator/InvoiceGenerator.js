import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Dropdown } from "primereact/dropdown";
import moment from "moment";

import {
  getInvoice,
  getProductLists,
  saveClientInvoice,
  getClientConfiguration,
} from "../../api";

import InvoicePDFViewContent from "./InvoicePDFViewContent";
import PageHeader from "../common/PageHeader";
import "./InvoiceGenerator.local.scss";

const InvoiceGenerator = () => {
  let { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [products, setProducts] = useState([]);
  const [surplus, setSurplus] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addedLine, setAddedLine] = useState({ details: {} });
  const [editedMatrix, setEditedMatrix] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState({
    month: moment().month() + 1,
    year: moment().year(),
  });

  let productsQuery = useQuery(["getProductLists"], async () => {
    try {
      const response = await getProductLists();
      setProducts(response.data ? response.data.actives : []);
    } catch (e) {
      return null;
    }
  });

  let invoiceQuery = useQuery(["getVouchersList", filter.month], async () => {
    try {
      if (filter.month) {
        const response = await getInvoice(id, filter.month, filter.year);
        setInvoice(response.data);
      }
    } catch (e) {
      return null;
    }
  });

  let getProductsSurplus = useQuery(["getProductSurplus"], async () => {
    try {
      const response = await getClientConfiguration(id);
      setSurplus(response.data ? JSON.parse(response.data.details) : {});
    } catch (e) {
      return null;
    }
  });

  let ths = [];
  for (let i = 1; i < 32; i++) {
    ths.push(<th>{i}</th>);
  }

  const handleSaveClientInvoice = async () => {
    let productDetailsList = [];
    Object.keys(editedMatrix).forEach((key) => {
      let quantityByDays = [];
      Object.keys(editedMatrix[key]).forEach((day) =>
        quantityByDays.push({ day, quantity: editedMatrix[key][day] })
      );
      productDetailsList.push({
        productId: key,
        quantityByDays,
      });
    });
    setSaving(true);
    try {
      const response = await saveClientInvoice({
        ...invoice,
        details: JSON.stringify(editedMatrix),
        productDetailsList,
      });
      setInvoice(response.data);
      setEditedMatrix(null);
      setSaving(false);
    } catch (e) {
      return null;
    }
  };

  const renderTDsMatrix = (data, key) => {
    let tds = [];
    let total = 0;
    let product = products.filter((item) => item.id === parseInt(key))[0];
    tds.push(<td class="first-sticky">{product.name}</td>);
    for (let i = 1; i < 32; i++) {
      total += data[i] ? parseInt(data[i]) : 0;
      tds.push(
        <td
          style={{
            padding: editedMatrix ? "4px" : "10px 0px",
          }}
        >
          {editedMatrix ? (
            <input
              value={
                editedMatrix[key] && editedMatrix[key][i]
                  ? editedMatrix[key][i]
                  : ""
              }
              onChange={(e) => changeMatrixValue(i, key, e.target.value)}
            />
          ) : data[i] ? (
            data[i]
          ) : (
            ""
          )}
        </td>
      );
    }
    tds.push(
      <td class="last-sticky" style={{ padding: "10px 0px" }}>
        {total}
      </td>
    );
    return tds;
  };

  const renderAddTDsMatrix = () => {
    let tds = [];
    let total = 0;
    let leftProducts = products
      .filter((item) => !Object.keys(editedMatrix).includes(item.id + ""))
      .map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    tds.push(
      <td class="first-sticky" style={{ padding: "4px 0px" }}>
        <Dropdown
          value={addedLine.product}
          onChange={(e) => {
            setAddedLine({
              ...addedLine,
              product: e.value,
            });
          }}
          options={leftProducts}
          optionLabel="name"
          placeholder="Choisir le produit"
          className="w-full md:w-14rem"
        />
      </td>
    );
    for (let i = 1; i < 32; i++) {
      total += addedLine.details[i] ? parseInt(addedLine.details[i]) : 0;
      tds.push(
        <td style={{ padding: "4px" }}>
          <input
            value={addedLine.details[i] ? addedLine.details[i] : ""}
            onChange={(e) => {
              let details = addedLine.details;
              details[i] = e.target.value;
              setAddedLine({ ...addedLine, details });
            }}
          />
        </td>
      );
    }
    tds.push(
      <td class="last-sticky action-hover" style={{ padding: "10px 0px" }}>
        <span>{total}</span>
        <div className="item_actions">
          <div className="action" onClick={() => setAddedLine({ details: {} })}>
            <i className="pi pi-sync" />
          </div>
          <div
            className={`action ${
              addedLine.product &&
              Object.keys(addedLine.details).find(
                (element) => addedLine.details[element] > 0
              )
                ? "active"
                : "disabled"
            }`}
            onClick={() => {
              let newEditedMatrix = { ...editedMatrix };
              newEditedMatrix[addedLine.product.id] = addedLine.details;
              setEditedMatrix(newEditedMatrix);
              setAddedLine({ details: {} });
            }}
          >
            <i className="pi pi-plus" />
          </div>
        </div>
      </td>
    );
    return tds;
  };

  const changeMatrixValue = (day, id, value) => {
    let newMatrix = { ...editedMatrix };
    newMatrix[id][day] = value;
    setEditedMatrix(newMatrix);
  };

  const renderFetchingFrame = () => {
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

  const renderGlobalFrame = (data) => {
    let details = JSON.parse(data, true);
    return (
      <div className="globale_frame">
        <div className="calendar_header">
          <div className="infos">
            <div className="infos_title">{invoice.client.name}</div>
            <div className="infos_sub_title">Total: {0}</div>
          </div>
          <div className="title">
            {moment()
              .month(filter.month - 1)
              .format("MMMM")}{" "}
            {filter.year}
          </div>
          <div className="actions">
            <div
              className="action"
              onClick={() => {
                setFilter({ ...filter, month: moment().month() + 1 });
              }}
            >
              Ce mois-ci
            </div>
            <div className="set-actions">
              <div
                className={`action ${
                  filter.year === 2022 && filter.month === 1 ? "disabled" : ""
                }`}
                onClick={() => {
                  if (filter.month > 1) {
                    setFilter({ ...filter, month: filter.month - 1 });
                  } else if (filter.year > 2022) {
                    console.log("ok");
                    setFilter({ ...filter, month: 12, year: filter.year - 1 });
                  }
                }}
              >
                <i className="pi pi-chevron-left"></i>
              </div>
              <div
                className={`action ${
                  filter.year === moment().year() && filter.month === 12
                    ? "disabled"
                    : ""
                }`}
                onClick={() => {
                  if (filter.month < 12) {
                    setFilter({ ...filter, month: filter.month + 1 });
                  } else if (filter.year < moment().year()) {
                    setFilter({ ...filter, month: 1, year: filter.year + 1 });
                  }
                }}
              >
                <i className="pi pi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="frame_header_sub">
          {editedMatrix ? (
            <Fragment>
              <div
                className="action"
                style={{ marginRight: "2px" }}
                onClick={() => handleSaveClientInvoice()}
              >
                <i className="pi pi-fw pi-check" />
              </div>
              <div className="action" onClick={() => setEditedMatrix(null)}>
                <i className="pi pi-fw pi-times" />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div
                className="action"
                style={{ marginRight: "2px" }}
                onClick={() => setVisible(true)}
              >
                <i className="pi pi-fw pi-file" />
              </div>
              <div className="action" onClick={() => setEditedMatrix(details)}>
                <i className="pi pi-fw pi-pencil" />
              </div>
            </Fragment>
          )}
        </div>
        <div className="frame_body">
          <div className="table-wrapper">
            <table>
              <tr class="sticky">
                <th class="first-sticky">Désignation</th>
                {ths}
                <th class="last-sticky">Total</th>
              </tr>
              {Object.keys(editedMatrix ? editedMatrix : details).map((key) => {
                return (
                  <tr>
                    {renderTDsMatrix(
                      editedMatrix ? editedMatrix[key] : details[key],
                      key
                    )}
                  </tr>
                );
              })}
              {editedMatrix && renderAddTDsMatrix()}
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-content">
      <PageHeader
        title={"Facturation"}
        subTitle={"Visualiser votre facture"}
        icon={
          <i
            className="pi pi-fw pi-cog"
            style={{ fontSize: "2rem", color: "#2a8ec7" }}
          />
        }
      />
      <div className="container">
        <div className="medium-11 invoice_generator">
          {invoiceQuery.isFetching || productsQuery.isFetching ? (
            renderFetchingFrame()
          ) : invoice ? (
            <Fragment>
              {renderGlobalFrame(invoice.details)}
              <InvoicePDFViewContent
                invoice={invoice}
                visible={visible}
                products={products}
                setVisible={(value) => setVisible(value)}
              />
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

export default InvoiceGenerator;
