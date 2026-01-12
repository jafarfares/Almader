//react
import { createContext, useContext, useState } from "react";
import CustomizedSnackbars from "./CustomizedSnackbars";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <CustomizedSnackbars
        open={open}
        setOpen={setOpen}
        message={message}
      />
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => useContext(SnackbarContext);
