import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";

const CalendarModal = () => {
  const [event, setEvent] = useState<{ title: string; start: Date }>({
    title: "new Event",
    start: new Date(),
  });
  const createEvent = async () => {
    const url = "http://localhost:3001/calendar/create";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(event),
    });

    console.log(response);
  };

  return (
    <Container>
      <TextField
        label="Event Name"
        id="field-total"
        defaultValue=""
        variant="filled"
        size="small"
        value={event.title}
        onChange={(event: any) => {
          const { value } = event.target;
          setEvent({ ...event, title: value });
        }}
      />
      <DatePicker label="Basic date picker" />
      <Button onClick={() => createEvent()}>Create new event</Button>
    </Container>
  );
};

export default CalendarModal;
