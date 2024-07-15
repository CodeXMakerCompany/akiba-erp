import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
import { AkibaPulic, TCGEvent } from "../../../../constants/subcategories";

interface CalendarForm
  { title: string; start: Date, subject: string, public: string }


const CalendarModal = () => {
  const dispatch = useDispatch();
  const { dateSelection } = useSelector((state: RootState) => state.modal);

  const [event, setEvent] = useState<CalendarForm>({
    title: "",
    start: dateSelection,
    subject: "",
    public: ""
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

      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Event</InputLabel>
  <Select
  
    value={event.subject}
    label="Event"
    onChange={ selectorItem => setEvent({ ...event, subject: selectorItem.target.value })}
  >
    {
      TCGEvent.map( event => (<MenuItem value={event}>{event}</MenuItem>) )
    }
    
  
  </Select>
</FormControl>

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Public</InputLabel>
  <Select
  
    value={event.public}
    label="Public"
    onChange={ selectorItem => setEvent({ ...event, public: selectorItem.target.value })}
  >
    {
      AkibaPulic.map( apublic => (<MenuItem value={apublic}>{apublic}</MenuItem>) )
    }
    
  
  </Select>
</FormControl>

      <Button onClick={() => handleCreateEvent()}>Create new event</Button>
    </Container>
  );
};

export default CalendarModal;
