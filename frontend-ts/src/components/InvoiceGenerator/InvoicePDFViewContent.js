import React, { Fragment, useState, useEffect } from "react";
import { usePDF } from "react-to-pdf";
import { Dialog } from "primereact/dialog";
import { toWords } from "../../utils";
import moment from "moment";

import "./InvoiceGenerator.local.scss";

const InvoicePDFViewContent = ({ invoice, products, visible, setVisible }) => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [total, setTotal] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (Object.keys(invoice.details).length > 0 && products.length > 0) {
      prepareInvoiceSumUp();
    }
  }, []);

  const prepareInvoiceSumUp = () => {
    let result = [];
    let tot = 0;
    let detailsLocal = JSON.parse(invoice.details, true);
    Object.keys(detailsLocal).forEach((key) => {
      let count = 0;
      let product = products.filter((item) => item.id === parseInt(key))[0];
      for (let i = 1; i < 32; i++) {
        count += detailsLocal[key][i] ? parseInt(detailsLocal[key][i]) : 0;
      }
      result.push({ name: product.name, value: count, price: product.price });
      tot += count * product.price;
    });
    setTotal(tot);
    setLines(result);
  };

  const renderInvoiceHeader = () => {
    return (
      <div className="pdf_header">
        <div>
          <div className="logo">
            <img src={"/logo-only.png"} />
          </div>
          <div className="infos">
            <div className="title">
              MENARA <span>WASH</span>.
            </div>
            <div className="details">
              <span>BLANCHISSERIE-PRESSING</span>
              <br />
              lavage & repassage nettoyage a sec <br /> teinture de tous types
              de textile et de tapis
              <br />
              menarawash@gmail.com
              <br />
              +212 (0) 661 898 723
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInvoiceDetails = () => {
    return (
      <div className="pdf_body_details">
        <div>
          <div className="title">Facture</div>
          <div className="info_set">
            <label>Numero:</label>
            <span>{invoice && invoice.id ? invoice.id : "----"}</span>
          </div>
          <div className="info_set">
            <label>Client:</label>
            <span>
              {`${invoice.client.name} ${invoice.client.society} - ICE :
                  ${invoice.client.ice}`}
            </span>
          </div>
        </div>
        <div>
          <div className="info_set">
            <label>Période facturation:</label>
            <span>
              DU: 01-
              {`${parseInt(invoice.month) < 10 ? "0" : ""}${invoice.month}`}
              {"  "}A: 31-
              {`${parseInt(invoice.month) < 10 ? "0" : ""}${invoice.month}`}
            </span>
          </div>
          <div className="info_set">
            <label>Date:</label>
            <span>{moment().format("DD-MM-YYYY")}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTotalLines = () => {
    return (
      <Fragment>
        <tr className="end-line">
          <td />
          <td />
          <td>Total (DH)</td>
          <td>{total}</td>
        </tr>
        <tr className="end-line">
          <td />
          <td />
          <td>TVA (20%)</td>
          <td>{parseFloat(parseFloat(total * 0.2).toFixed(2))}</td>
        </tr>
        <tr className="end-line">
          <td />
          <td />
          <td>Total TTC (DH)</td>
          <td>{parseFloat(parseFloat(total * 1.2).toFixed(2))}</td>
        </tr>
      </Fragment>
    );
  };

  const renderSingatureFrame = () => {
    return (
      <Fragment>
        <div className="remark">
          <div>
            <span>Arrêter la présente facture à la somme de :</span>
            <span> {toWords.convert(total * 1.2)}</span>
          </div>
        </div>
        <div className="signe">
          <div>signature :</div>
        </div>
      </Fragment>
    );
  };

  const renderInvoicePagination = (page) => {
    return (
      <div className="pagination">{`${page}/${
        lines.length > 20 ? 3 : lines.length > 8 ? 2 : 1
      }`}</div>
    );
  };

  return (
    <Dialog
      header="Visualiser ma facture"
      draggable={false}
      visible={visible}
      style={{ width: "70vw", maxHeight: "100%" }}
      onHide={() => setVisible(false)}
    >
      <div
        className="action"
        style={{ marginRight: "2px" }}
        onClick={() => toPDF()}
      >
        <i className="pi pi-fw pi-print" />
      </div>
      <div ref={targetRef}>
        <div className="pdf_viewer">
          <img src={"/logo-only.png"} />
          {renderInvoiceHeader()}
          <div className="pdf_body">
            {renderInvoiceDetails()}
            <div className="pdf_body_content">
              <table className="custumed_table">
                <tr className="start-line">
                  <th>Désignation</th>
                  <th>Quantité</th>
                  <th>Prix.U (DH)</th>
                  <th>Total (DH)</th>
                </tr>
                {lines.length > 8
                  ? lines.slice(0, 11).map((line) => (
                      <tr>
                        <td>{line.name}</td>
                        <td>{line.value}</td>
                        <td>{line.price}</td>
                        <td>{line.value * line.price}</td>
                      </tr>
                    ))
                  : ""}
                {lines.length <= 8 && renderTotalLines()}
              </table>
              {lines.length <= 8 && renderSingatureFrame()}
              {renderInvoicePagination(1)}
            </div>
          </div>
          <div className="pdf_footer">
            <span>IF</span> : 53846856{"  "}– <span>RC</span> : 137965
            {"  "}– <span>TP</span> : 64602536{"  "}– <span>CNSS</span> :
            4840825
            {"  "}– <span>ICE</span> : 003326398000039
          </div>
        </div>
        {lines.length > 8 && (
          <div className="pdf_viewer">
            <img src={"/logo-only.png"} />
            {renderInvoiceHeader()}
            <div className="pdf_body">
              {renderInvoiceDetails()}
              <div className="pdf_body_content">
                <table className="custumed_table">
                  {lines
                    .slice(11, lines.length >= 23 ? 23 : lines.length - 1)
                    .map((line) => (
                      <tr>
                        <td>{line.name}</td>
                        <td>{line.value}</td>
                        <td>{line.price}</td>
                        <td>{line.value * line.price}</td>
                      </tr>
                    ))}
                  {lines.length <= 20 && renderTotalLines()}
                </table>
                {lines.length <= 20 && renderSingatureFrame()}
                {renderInvoicePagination(2)}
              </div>
            </div>
            <div className="pdf_footer">
              <span>IF</span> : 53846856{"  "}– <span>RC</span> : 137965
              {"  "}– <span>TP</span> : 64602536{"  "}– <span>CNSS</span> :
              4840825
              {"  "}– <span>ICE</span> : 003326398000039
            </div>
          </div>
        )}
        {lines.length > 20 && (
          <div className="pdf_viewer">
            <img src={"/logo-only.png"} />
            {renderInvoiceHeader()}
            <div className="pdf_body">
              {renderInvoiceDetails()}
              <div className="pdf_body_content">
                <table className="custumed_table">
                  {lines.length > 23 &&
                    lines.slice(23, lines.length).map((line) => (
                      <tr>
                        <td>{line.name}</td>
                        <td>{line.value}</td>
                        <td>{line.price}</td>
                        <td>{line.value * line.price}</td>
                      </tr>
                    ))}
                  {renderTotalLines()}
                </table>
                {renderSingatureFrame()}
                {renderInvoicePagination(3)}
              </div>
            </div>
            <div className="pdf_footer">
              <span>IF</span> : 53846856{"  "}– <span>RC</span> : 137965
              {"  "}– <span>TP</span> : 64602536{"  "}– <span>CNSS</span> :
              4840825
              {"  "}– <span>ICE</span> : 003326398000039
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default InvoicePDFViewContent;
