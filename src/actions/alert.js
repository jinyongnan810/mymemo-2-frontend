import * as types from "./types";
import uuid from "uuid";

export const setAlert = (msg, type = "success") => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: types.SET_ALERT,
    payload: {
      id,
      msg,
      type,
    },
  });
};
