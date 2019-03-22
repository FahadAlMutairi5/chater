import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const createChannel = (channel,history) => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", channel);
      const newChannel = res.data;
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: newChannel
      });
      history.push("/ListChannels");
    } catch (error) {
      console.error(error.response.data);
    }
  };
};