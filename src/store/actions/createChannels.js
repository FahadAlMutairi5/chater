import * as actionTypes from "./actionTypes";

import axios from "axios";
import { setErrors } from "./errors";

const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});
/*-- Creat channel from api --*/
export const createChannel = (channel,history) => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", channel);
      const newChannel = res.data;
      dispatch(setErrors());
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: newChannel
      });
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


