import React, { useState, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

import {
  getClient,
  getProductLists,
  getVouchersList,
  saveClientVoucher,
} from "../../api";

import PageHeader from "../common/PageHeader";
import "./ClientCalendar.local.scss";

const ClientCalendar = () => {
  let { id } = useParams();
  const calendarRef = useRef();
  const [client, setClient] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [events, setEvents] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [saving, setSaving] = useState(false);
  const [nbrVoucher, setNbrVoucher] = useState(0);
  const [visible, setVisible] = useState(false);
  const [monthCalendar, setMonthCalendar] = useState(moment().month() + 1);

  let productsQuery = useQuery(["getProductLists"], async () => {
    try {
      const response = await getProductLists();
      setProducts(response.data ? response.data.actives : []);
    } catch (e) {
      return null;
    }
  });

  let clientQuery = useQuery(["getClient"], async () => {
    try {
      const response = await getClient(id);
      setClient(response.data ? response.data : []);
    } catch (e) {
      return null;
    }
  });

  let vouchersQuery = useQuery(["getVouchersList", monthCalendar], async () => {
    try {
      if (monthCalendar) {
        const response = await getVouchersList(id, monthCalendar);
        let voucherResponse = response.data.map((item) => {
          let day = item.day.split("T")[0];
          return {
            id: item.id,
            backgroundColor: "#258fc8",
            title: "Bon: " + day,
            start: day,
          };
        });
        setVouchers(response.data);
        setEvents(voucherResponse);
      }
    } catch (e) {
      return null;
    }
  });

  const renderFetchingGrid = () => {
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

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    setVisible(true);
  };

  const handleSaveVoucher = async () => {
    setSaving(true);
    try {
      const response = await saveClientVoucher({
        month: monthCalendar,
        day: selectedDay,
        client: client.id,
        id: selectedVoucher.id,
        total: selectedVoucher.total,
        details: JSON.stringify(selectedVoucher.details),
      });
      let newVouchers = [];
      if (selectedVoucher.id) {
        newVouchers = vouchers.map((voucher) => {
          if (voucher.id === selectedVoucher.id) {
            return selectedVoucher;
          } else {
            return voucher;
          }
        });
      } else {
        let voucherResponse = response.data;
        let newEvents = [...events];
        newVouchers = [...vouchers];
        newVouchers.push(voucherResponse);
        newEvents.push({
          id: voucherResponse.id,
          backgroundColor: "#258fc8",
          title: "Bon: " + voucherResponse.day.split("T")[0],
          total: voucherResponse.total,
          start: voucherResponse.day.split("T")[0],
        });
        setEvents(newEvents);
      }
      setVisible(false);
      setSelectedVoucher(null);
      setVouchers(newVouchers);
      setSaving(false);
      setSelectedDay(null);
    } catch (e) {
      setSaving(false);
      return null;
    }
  };

  const calculateVoucherTotal = (configuration) => {
    let total = 0;
    Object.keys(configuration).forEach((index) => {
      let filtredProduct = products.filter(
        (product) => product.id === parseInt(index)
      );
      if (filtredProduct.length > 0) {
        total += configuration[index] * filtredProduct[0].price;
      }
    });
    return total;
  };

  return (
    <div className="page-content">
      <PageHeader
        title={"Calendrier du client"}
        subTitle={"Visualiser les dates de saisi des bon du client"}
        icon={
          <i
            className="pi pi-fw pi-calendar"
            style={{ fontSize: "2rem", color: "#2a8ec7" }}
          />
        }
      />
      <div className="container">
        {clientQuery.isFetching ? (
          renderFetchingGrid()
        ) : client ? (
          <Fragment>
            <div className="calendar_header">
              <div className="infos">
                <div className="infos_title">{client.name}</div>
                <div className="infos_sub_title">
                  Nombre de bons: {events.length}
                </div>
              </div>
              <div className="title">
                {moment()
                  .month(monthCalendar - 1)
                  .format("MMMM")}{" "}
                2023
              </div>
              <div className="actions">
                <div className="action">Aujourd'hui</div>
                <div className="set-actions">
                  <div
                    className={`action ${
                      monthCalendar === 1 ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (monthCalendar > 1) {
                        let calendarApi = calendarRef.current.getApi();
                        calendarApi.prev();
                        setMonthCalendar(monthCalendar - 1);
                      }
                    }}
                  >
                    <i className="pi pi-chevron-left"></i>
                  </div>
                  <div
                    className={`action ${
                      monthCalendar === 12 ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (monthCalendar < 12) {
                        let calendarApi = calendarRef.current.getApi();
                        calendarApi.next();
                        setMonthCalendar(monthCalendar + 1);
                      }
                    }}
                  >
                    <i className="pi pi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={false}
              locale={frLocale}
              dateClick={(date) => {
                let clickedMonth = date && date.dateStr.split("-")[1];
                if (parseInt(clickedMonth) === monthCalendar) {
                  let voucher =
                    vouchers.filter(
                      (item) => item.day.split("T")[0] === date.dateStr
                    ).length > 0
                      ? vouchers.filter(
                          (item) => item.day.split("T")[0] === date.dateStr
                        )[0]
                      : {
                          month: monthCalendar,
                          day: date.dateStr,
                          client: id,
                          details: {},
                          total: 0,
                        };
                  setSelectedVoucher({
                    ...voucher,
                    details: voucher.details.length
                      ? JSON.parse(voucher.details)
                      : {},
                    day: voucher.day.split("T")[0],
                  });
                  setSelectedDay(date.dateStr);
                  setVisible(true);
                }
              }}
              editable={true}
              selectMirror={true}
              dayMaxEvents={true}
              events={events}
              eventContent={(infos) => {
                return (
                  <>
                    <b>{infos.timeText}</b>
                    <i>{infos.event.title}</i>
                  </>
                );
              }}
              eventClick={(selectInfo) => handleEventClick(selectInfo)}
            />
          </Fragment>
        ) : (
          <div className="no_data">
            <div className="title">{"noDataFound"}</div>
            <div className="subTitle">{"noClientFound"}</div>
          </div>
        )}
      </div>
      <Dialog
        header={`Inserer un bon pour la date: ${selectedDay}`}
        visible={visible}
        position={"right"}
        style={{ width: "40vw" }}
        onHide={() => setVisible(false)}
        footer={
          <Fragment>
            <div className="total">
              <span>TOTAL</span> {selectedVoucher && selectedVoucher.total} DH
            </div>
            <div>
              <Button
                label="Annuler"
                onClick={() => {
                  setSelectedVoucher(null);
                  setVisible(false);
                  setSelectedDay(null);
                }}
                className="p-button-text p-button-only-text"
              />
              <Button
                label="Enregistrer"
                className="p-button-text"
                onClick={() => handleSaveVoucher()}
                autoFocus
                loading={saving}
              />
            </div>
          </Fragment>
        }
        draggable={false}
        resizable={false}
      >
        {selectedDay && (
          <div className="sidebar-form">
            <div className="element td-header">
              <div className="title">{"Designation"}</div>
              <div className="tag">{"Prix.U"}</div>
              <div className="input-tag">{"Quantité"}</div>
              <div className="tag last-tag">{"Total"}</div>
            </div>
            <div>
              {products.map((product, i) => {
                return (
                  <Fragment>
                    <div className="element" key={i}>
                      <div className="title">{product.name}</div>
                      <div className="tag">
                        <span>{product.price} dh</span>
                      </div>
                      <div className="input-tag">
                        <input
                          min="0"
                          type="number"
                          value={selectedVoucher.details[product.id]}
                          onChange={(e) => {
                            let newConfiguration = selectedVoucher.details;
                            newConfiguration[product.id] = e.target.value;
                            let total = calculateVoucherTotal(newConfiguration);
                            setSelectedVoucher({
                              ...selectedVoucher,
                              total,
                              details: newConfiguration,
                            });
                          }}
                        />
                      </div>
                      <div className="tag last-tag">
                        <span>
                          {selectedVoucher.details[product.id]
                            ? parseFloat(selectedVoucher.details[product.id]) *
                              parseFloat(product.price)
                            : 0}{" "}
                          dh
                        </span>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ClientCalendar;
