import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload;

    case REMOVE_ALERT:
      return null;

    default:
      throw new Error("Action type not valid!");
  }
};

export default AlertReducer;
