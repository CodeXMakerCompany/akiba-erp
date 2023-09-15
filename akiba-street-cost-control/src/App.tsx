import React from "react";
import AppRoutes from "./routes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </LocalizationProvider>
    </SnackbarProvider>
  );
}

export default App;
