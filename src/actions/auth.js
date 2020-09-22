import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import {setAlert} from './alert';
import * as types from './types';

// auth and load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/users/me');
    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

// register
export const register = ({username, email, password}) => async (dispatch) => {
  const newUser = {username, email, password};
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
        '/auth/local/register', JSON.stringify(newUser), config);
    dispatch({type: types.REGISTER_SUCCESS, payload: res.data});
    dispatch(loadUser());
  } catch (error) {
    dispatch({type: types.REGISTER_FAIL});
    if (error.message) {
      dispatch(setAlert(error.message, 'danger'));
    }
  }
};

// login
export const login = ({identifier, password}) => async (dispatch) => {
  const user = {identifier, password};
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/auth/local', JSON.stringify(user), config);
    dispatch({type: types.LOGIN_SUCCESS, payload: res.data});
    dispatch(loadUser());
  } catch (error) {
    dispatch({type: types.LOGIN_ERROR});
    if (error.message) {
      dispatch(setAlert(error.message, 'danger'));
    }
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: types.LOGOUT,
  });
  setAuthToken(null);
};
