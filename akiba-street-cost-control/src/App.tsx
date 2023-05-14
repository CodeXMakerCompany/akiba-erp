import React from "react";
import AppRoutes from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
