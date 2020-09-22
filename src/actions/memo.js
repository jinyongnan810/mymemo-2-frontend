import axios from "axios";

import { setAlert } from "./alert";
import * as types from "./types";

// load memos
export const loadMemos = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/memos?_sort=updatedAt:desc`);
    dispatch({ type: types.LOAD_MEMO, payload: res.data });
  } catch (error) {
    dispatch({ type: types.LOAD_MEMO_FAIL });
    if (error.message) {
      console.log(error.message);
      dispatch(setAlert("Fail to load memos.", "danger"));
    }
  }
};

// set current
export const setCurrentMemo = (id) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_MEMO, payload: id });
};

// update memos
export const updateMemo = (memo, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/memos/${id}`, JSON.stringify(memo), config);
    dispatch({ type: types.UPDATE_MEMO, payload: res.data });
    dispatch(setAlert("Memo successfully updated."));
  } catch (error) {
    if (error.message) {
      console.log(error.message);
      dispatch(setAlert("Fail to update memo.", "danger"));
    }
  }
};

// delete memos
export const deleteMemo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/memos/${id}`);
    dispatch({ type: types.DELETE_MEMO, payload: id });
    dispatch(setAlert("Memo successfully deleted."));
  } catch (error) {
    if (error.message) {
      console.log(error.message);
      dispatch(setAlert("Fail to delete memo.", "danger"));
    }
  }
};

// create memos
export const createMemo = (memo) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/memos`, JSON.stringify(memo), config);
    dispatch({ type: types.CREATE_MEMO, payload: res.data });
    dispatch(setAlert("Memo successfully created."));
  } catch (error) {
    if (error.message) {
      console.log(error.message);
      dispatch(setAlert("Fail to create memo.", "danger"));
    }
  }
};
