import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import dayjs from "dayjs";
import { createEvent } from "../../../../redux/slices/events/actions";
import { updateModalStatus } from "../../../../redux/slices/modal/modal.slice";

const CalendarModal = () => {
  const dispatch = useDispatch();
  const { dateSelection } = useSelector((state: RootState) => state.modal);

  const [event, setEvent] = useState<{ title: string; start: Date }>({
    title: "",
    start: dateSelection,
  });

  const handleCreateEvent = async () => {
    dispatch(createEvent(event) as any);
    dispatch(updateModalStatus());
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
        onChange={(e: any) => {
          const { value } = e.target;
          setEvent({ ...event, title: value });
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Basic date picker"
          onChange={(e: any) => {
            setEvent({ ...event, start: e.$d });
          }}
          defaultValue={dayjs(event.start)}
        />
      </LocalizationProvider>

      <Button onClick={() => handleCreateEvent()}>Create new event</Button>
    </Container>
  );
};

export default CalendarModal;
