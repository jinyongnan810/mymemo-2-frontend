import axios from "axios";
const setAuthToken = (token) => {
  axios.defaults.baseURL = "https://kins-memo.herokuapp.com/";
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
export default setAuthToken;
