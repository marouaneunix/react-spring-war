import React, { useState, Fragment } from "react";
import { useQuery } from "react-query";
import { usePDF } from "react-to-pdf";
import { ToWords } from "to-words";

import { getClientsList } from "../../api";

import PageHeader from "../common/PageHeader";
import "./InvoiceGenerator.local.scss";

const InvoiceGenerator = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const toWords = new ToWords({
    localeCode: "fr-FR",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: "Dihram",
        plural: "Dihrams",
        symbol: "DH",
      },
    },
  });

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

  // let invoiceCalculationsQuery = useQuery(["getInvoiceCalculations", filter], async () => {
  //   try {
  //     const response = await getInvoiceCalculations(filter);
  //     SetInvoiceData(response.data.data);
  //   } catch (e) {
  //     return null;
  //   }
  // });

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
        <div className="medium-11">
          {/* {clientsQuery.isFetching ? (
            renderFetchingLines()
          ) : productions.length ? ( */}
          <Fragment>
            <div className="globale_frame">
              <div className="frame_header">
                <label>Visualiser ma facture avant impression</label>
                <div className="actions">
                  <div className="action" onClick={() => toPDF()}>
                    <i className="pi pi-fw pi-print" />
                    imprimer
                  </div>
                  <div className="action">
                    <i className="pi pi-fw pi-pencil" />
                    modifier
                  </div>
                </div>
              </div>
              <div className="frame_body">
                <div className="matrix_viewer"></div>
                <div className="pdf_viewer" ref={targetRef}>
                  <img src={"/logo-only.png"} />
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
                          lavage & repassage nettoyage a sec <br /> teinture de
                          tous types de textile et de tapis
                          <br />
                          menarawash@gmail.com
                          <br /> +212 (0) 661 898 723
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pdf_body">
                    <div className="pdf_body_details">
                      <div>
                        <div className="title">Facture</div>
                        <div className="info_set">
                          <label>Numero:</label>
                          <span>009 / 2023</span>
                        </div>
                        <div className="info_set">
                          <label>Client:</label>
                          <span>
                            Riad Aliya MARRACHIC VIP SARL - ICE :
                            003037387000074
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="info_set">
                          <label>Période facturation:</label>
                          <span>DU : 01-07 - A : 31-07</span>
                        </div>
                        <div className="info_set">
                          <label>Date:</label>
                          <span>31-07-2023</span>
                        </div>
                      </div>
                    </div>
                    <div className="pdf_body_content">
                      <table className="custumed_table">
                        <tr>
                          <th>Désignation</th>
                          <th>Quantité</th>
                          <th>Prix.U (DH)</th>
                          <th>Total (DH)</th>
                        </tr>
                        <tr>
                          <td>drap housse 1prs</td>
                          <td>29</td>
                          <td>6</td>
                          <td>174,00</td>
                        </tr>
                        <tr>
                          <td>drap housse 1prs</td>
                          <td>29</td>
                          <td>6</td>
                          <td>174,00</td>
                        </tr>
                        <tr>
                          <td>drap housse 1prs</td>
                          <td>29</td>
                          <td>6</td>
                          <td>174,00</td>
                        </tr>
                        <tr>
                          <td>drap housse 2prs</td>
                          <td>11</td>
                          <td>08,00</td>
                          <td>88,00</td>
                        </tr>
                        <tr>
                          <td>housse couette 2prs</td>
                          <td>14</td>
                          <td>12,00</td>
                          <td>168,00</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>Total (DH)</td>
                          <td>168,00</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>TVA (20%)</td>
                          <td>168,00</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>Total TTC (DH)</td>
                          <td>168,00</td>
                        </tr>
                      </table>
                      <div className="remark">
                        <div>
                          <span>
                            Arrêter la présente facture à la somme de :
                          </span>
                          <span> {toWords.convert(273)}</span>
                        </div>
                      </div>
                      <div className="signe">
                        <div>signature :</div>
                      </div>
                    </div>
                  </div>
                  <div className="pdf_footer">
                    <span>IF</span> : 53846856{"  "}– <span>RC</span> : 137965
                    {"  "}– <span>TP</span> : 64602536{"  "}– <span>CNSS</span>{" "}
                    : 4840825{"  "}– <span>ICE</span> : 003326398000039
                  </div>
                </div>
              </div>
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

export default InvoiceGenerator;
