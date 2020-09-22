import * as types from "../actions/types";
const initialState = {};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_ALERT:
      return { ...payload };
    default:
      return state;
  }
};
