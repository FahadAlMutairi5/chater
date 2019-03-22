import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});
const setLoading = () => ({
  type: actionTypes.SET_CHANELS_LOADING
});
export const fetchChannels = () => {
  return async dispatch => {
    try {
      dispatch(setLoading())
      const res = await instance.get("channels/");
      const channels = res.data;
      dispatch({ type: actionTypes.SET_CHANNELS, payload: channels });
    } catch (err) {
      console.error(err);
    }
  };
};
export const filterChannels = query => {
  return {
    type: actionTypes.FILTER_CHANNELS,
    payload: query
  };
};