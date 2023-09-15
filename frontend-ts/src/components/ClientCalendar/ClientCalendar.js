import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

// import { getVoucherDates } from "../../api";

import PageHeader from "../common/PageHeader";
import "./ClientCalendar.local.scss";

const ClientCalendar = () => {
  const [checked, setChecked] = useState(false);
  const [nbrVoucher, setNbrVoucher] = useState(0);
  const [clickedDate, setClickedDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState(false);
  let { id } = useParams();
  let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

  const month =
    document.getElementsByClassName("fc-daygrid-day")[7] &&
    document
      .getElementsByClassName("fc-daygrid-day")[7]
      .getAttribute("data-date")
      .split("-")[1];

  let iElements = document.getElementsByClassName("fc-bg-event");
  for (let i = 0; i < iElements.length; i++) {
    if (iElements[i].getElementsByTagName("i").length > 0) {
      var span = document.createElement("span");
      let text = iElements[i].getElementsByTagName("i")[0].textContent;
      span.appendChild(document.createTextNode(text));
      iElements[i].removeChild(iElements[i].getElementsByTagName("i")[0]);
      iElements[i].appendChild(span);
    }
  }

  // let clientsQuery = useQuery(["getClientsList", filter], async () => {
  //   try {
  //     const response = await getVoucherDates(filter);
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

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: 3,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    setVisible(true);
  };

  const handleEvents = (events) => {
    setEvents({
      currentEvents: events,
    });
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
        {/* {clientsQuery.isFetching ? (
          renderFetchingLines()
        ) : clients.length ? ( */}
        <Fragment>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={frLocale}
            dateClick={(date) => {
              let clickedMonth = date && date.dateStr.split("-")[1];
              if (clickedMonth === month) {
                setClickedDate(date.dateStr);
                setVisible(true);
              }
            }}
            editable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={[
              {
                id: 1,
                title: "Pas de bon",
                start: "2023-09-16",
                backgroundColor: "#D87318",
                display: "background",
              },
              {
                id: 3,
                title: "Bon Absent",
                start: "2023-09-07",
                backgroundColor: "#EB5757",
                display: "background",
              },
              {
                id: 2,
                backgroundColor: "#258fc8",
                title: "Bon: " + todayStr,
                start: "2023-09-11",
              },
            ]}
            select={(selectInfo) => handleDateSelect(selectInfo)}
            eventContent={(infos) => {
              return (
                <>
                  <b>{infos.timeText}</b>
                  <i>{infos.event.title}</i>
                </>
              );
            }} // custom render function
            eventClick={(selectInfo) => handleEventClick(selectInfo)}
            eventsSet={(selectInfo) => handleEvents(selectInfo)} // called after events are initialized/added/changed/removed
          />
        </Fragment>
        {/* ) : (
          <div className="no_data">
            <div className="title">{"noDataFound"}</div>
            <div className="subTitle">{"noClientsFound"}</div>
          </div>
        )} */}
      </div>
      <Dialog
        header={`Inserer un bon pour la date: ${clickedDate}`}
        visible={visible}
        position={"bottom"}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={
          <div>
            <Button
              label="Annuler"
              onClick={() => setVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Enregistrer"
              className="p-button-text"
              onClick={() => setVisible(false)}
              autoFocus
            />
          </div>
        }
        draggable={false}
        resizable={false}
      >
        <div className="dialog-panel">
          <div className="line">
            <label>{"Pas de bon pour aujourd'hui "}</label>
            <InputSwitch
              checked={checked}
              onChange={(e) => setChecked(e.value)}
            />
          </div>
        </div>
        <div className="dialog-panel">
          <h2>{"Detail du bon : "}</h2>
          <div className="element td-header">
            <div className="title">{"item.label"}</div>
            <div className="tag">{"PU"}</div>
            <div className="input-tag">{"PU"}</div>
            <div className="tag last-tag">{"total"}</div>
          </div>
          <div>
            {[
              { label: "client AA", price: 10 },
              { label: "client BB", price: 12 },
              { label: "client CC", price: 13 },
              { label: "client AA", price: 10 },
              { label: "client BB", price: 12 },
              { label: "client CC", price: 13 },
              { label: "client AA", price: 10 },
              { label: "client BB", price: 12 },
              { label: "client CC", price: 13 },
            ].map((item, i) => (
              <Fragment>
                <Divider />
                <div className="element">
                  <div className="title">{item.label}</div>
                  <div className="tag">
                    <span>{item.price}DH</span>
                  </div>
                  <div className="input-tag">
                    <input />
                  </div>
                  <div className="tag last-tag">
                    <span>{item.price}DH</span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ClientCalendar;
