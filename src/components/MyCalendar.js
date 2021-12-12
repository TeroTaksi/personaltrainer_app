import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { addMinutes } from "date-fns"; // https://date-fns.org/v2.26.0/docs/addMinutes
import { parseISO } from "date-fns"; // https://date-fns.org/v2.3.0/docs/parseISO
import FetchTraingsData from "./FetchTrainingsData";

function MyCalendar() {
  const { trainings, isLoading } = FetchTraingsData(); // FetchTraingsData.js

  return (
    <div style={{ paddingTop: "30px" }}>
      {isLoading && <p>Loading...</p>}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        timeZone="UTC"
        events={trainings.map((training) => {
          if (training == null || training.customer == null) {
            return { title: "", start: "", end: "" };
          }
          return {
            title: `${training.activity} (${training.duration}min) / ${training.customer.firstname} ${training.customer.lastname}`,
            start: training.date,
            end: addMinutes(parseISO(training.date), training.duration),
          };
        })}
      />
    </div>
  );
}

export default MyCalendar;
