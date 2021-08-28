import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = ({ children }) => {
  const [alert, dispatch] = useReducer(AlertReducer, null);

  // Display alert for empty searches
  const displayAlert = (message, type) => {
    dispatch({ type: SET_ALERT, payload: { message, type } });
    setTimeout(removeAlert, 5000);
  };

  const removeAlert = () => {
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <AlertContext.Provider value={{ alert, displayAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
