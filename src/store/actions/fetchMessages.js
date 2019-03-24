import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});
/* -- get all message for one channel from api  -- */
export const fetchMessages = (channelId) => {
  
  return async dispatch => {
    dispatch(setLoading());
    try {
      const res = await instance.get(`channels/${channelId}/`);
      const messages = res.data;
      dispatch({ type: actionTypes.SET_MESSAGES, payload: messages });
    } catch (err) {
      console.error(err);
    }
  };
};
/* -- get notificatio for one channel from api  test not done -- */
export const fetchMessagesNoti = (channelId) => {
  
  return async dispatch => {
    dispatch(setLoading());
    try {
      const res = await instance.get(`channels/${channelId}/`);
      return res.data
    } catch (err) {
      console.error(err);
    }
  };
};
const setLoading = () => ({
  type: actionTypes.SET_MESSAGES_LOADING
});
export const resetNotification = () => ({
  type: actionTypes.RESET_MESSAGES_NOTIFICATION 
})
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