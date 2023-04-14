import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarModal from "../../common/components/modal"; // needed for dayClick
const events = [{ title: "Meeting", start: new Date() }];
const CalendarPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    setOpenModal(true);
  };
  return (
    <div>
      <h1>Akiba Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
      />
      <CalendarModal type={"Calendar"} mode={"Create"} isOpen={openModal} />
    </div>
  );
};

// a custom render function
const renderEventContent = (eventInfo: {
  timeText: string;
  event: {
    title: string;
  };
}) => {
  return (
    <div onClick={(e: any) => console.log(e)}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
};

export default CalendarPage;
