import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
// import { setErrors } from "./errors";


const instance = axios.create({
            //https://api-chatr.herokuapp.com/
            //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});
        /* -- set Token to brow -- */
const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    //this line will put the token in the code format
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};
        /* -- check for expired token -- */
export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      console.log((user.exp - currentTime) / 60);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};
        /* -- login from api -- */
export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("login/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      dispatch({
       type: actionTypes.SET_ERRORS,
       payload: []
     });
      history.push("/ListChannels");

    } catch (error) {
      dispatch({
       type: actionTypes.SET_ERRORS,
       payload: error.response.data
     });
    }
  };
};
        /* -- signup from api -- */
export const signup = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("signup/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      dispatch({
       type: actionTypes.SET_ERRORS,
       payload: []
     });
      history.push("/ListChannels");
    } catch (error) {
      dispatch({
       type: actionTypes.SET_ERRORS,
       payload: error.response.data
     });
    }
  };
};

//will delete the whole user obj
export const logout = () => {
  
  setAuthToken();
  return setCurrentUser();
};
/* -- set current user to see -- */
const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
