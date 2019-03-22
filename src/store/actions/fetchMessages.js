import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchMessages = (channelId) => {
  
  return async dispatch => {
    dispatch(setLoading());
    try {
      const res = await instance.get(`channels/${channelId}/`);
      const messages = res.data;
      console.log(messages)
      dispatch({ type: actionTypes.SET_MESSAGES, payload: messages });
    } catch (err) {
      console.error(err);
    }
  };
};
const setLoading = () => ({
  type: actionTypes.SET_MESSAGES_LOADING
});
export const getMessagesTimeStamp = (channelId,timeStamp) => {
  return async dispatch => {
    try {
      const res = await instance.get(`channels/${channelId}/?latest=${timeStamp}`);
      const messages = res.data;
      dispatch({ type: actionTypes.SET_MESSAGES_TIME_STAMP, payload: messages });
    } catch (err) {
      console.error(err);
    }
  };
};