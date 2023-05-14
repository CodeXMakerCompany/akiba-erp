import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarModal from "../../common/components/modal"; // needed for dayClick
import { useDispatch, useSelector } from "react-redux";
import {
  feedDateSelection,
  updateModalStatus,
} from "../../redux/slices/modal/modal.slice";
import { useLoaderData } from "react-router-dom";
import apiInstance from "../../api/api";
import { RootState } from "../../redux/store";

const transformDataEvents = (array: Array<any>) =>
  array.map((event: any) => {
    return { title: event.name, start: event.created_at };
  });

const CalendarPage = () => {
  const dispatch = useDispatch();
  const data: any = useLoaderData();

  const events = transformDataEvents(data.eventsResponse);

  const {
    modal: { openModal },
    events: { events: eventsList },
  } = useSelector((state: RootState) => state);
  const handleDateClick = (arg: any) => {
    dispatch(feedDateSelection(arg.date));
    dispatch(updateModalStatus());
  };

  return (
    <div>
      <h1>Akiba Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={eventsList.length ? transformDataEvents(eventsList) : events}
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

export const EventsLoader = async () => {
  const api = apiInstance();
  const eventsData = await api.get("/event/all");

  return {
    eventsResponse: eventsData.data.events,
  };
};

export default CalendarPage;
